"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { getTenantContext } from "@/lib/auth/access";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import {
  baseStationFormSchema,
  type BaseStationFormState
} from "@/features/base-stations/lib/base-station-schema";
import type { Database } from "@/types/database";

type BaseStationInsert = Database["public"]["Tables"]["base_stations"]["Insert"];
type BaseStationUpdate = Database["public"]["Tables"]["base_stations"]["Update"];

function parseBaseStationFormData(formData: FormData) {
  return baseStationFormSchema.safeParse({
    code: formData.get("code"),
    siteId: formData.get("siteId"),
    vendor: formData.get("vendor"),
    powerLevel: formData.get("powerLevel"),
    backhaulUsage: formData.get("backhaulUsage"),
    status: formData.get("status"),
    isActive: formData.get("isActive") === "true"
  });
}

function buildErrorState(message: string, fieldErrors?: BaseStationFormState["fieldErrors"]): BaseStationFormState {
  return {
    status: "error",
    message,
    fieldErrors
  };
}

async function ensureTenantSite(siteId: string, tenantId: string) {
  const supabase = createSupabaseAdminClient();
  const { data, error } = await supabase
    .from("sites")
    .select("id")
    .eq("tenant_id", tenantId)
    .eq("id", siteId)
    .eq("is_active", true)
    .maybeSingle();

  if (error) {
    throw error;
  }

  return data;
}

export async function createBaseStationAction(
  _prevState: BaseStationFormState,
  formData: FormData
): Promise<BaseStationFormState> {
  const parsed = parseBaseStationFormData(formData);

  if (!parsed.success) {
    const flattened = parsed.error.flatten().fieldErrors;
    return buildErrorState("Please correct the highlighted fields.", {
      code: flattened.code?.[0],
      siteId: flattened.siteId?.[0],
      vendor: flattened.vendor?.[0],
      powerLevel: flattened.powerLevel?.[0],
      backhaulUsage: flattened.backhaulUsage?.[0],
      status: flattened.status?.[0]
    });
  }

  try {
    const supabase = createSupabaseAdminClient();
    const { tenant } = await getTenantContext();
    const values = parsed.data;
    const payload: BaseStationInsert = {
      tenant_id: tenant.id,
      site_id: values.siteId,
      code: values.code,
      vendor: values.vendor,
      power_level: values.powerLevel,
      backhaul_usage: values.backhaulUsage,
      status: values.status,
      is_active: values.isActive
    };

    const site = await ensureTenantSite(values.siteId, tenant.id);
    if (!site) {
      return buildErrorState("Selected site is not available for this tenant.", {
        siteId: "Choose an active site from this tenant."
      });
    }

    const { error } = await supabase.from("base_stations").insert(payload as never);

    if (error) {
      return buildErrorState(
        error.message.includes("duplicate")
          ? "Base station code must be unique within the tenant."
          : error.message
      );
    }
  } catch (error) {
    return buildErrorState(
      error instanceof Error ? error.message : "Unable to create base station."
    );
  }

  revalidatePath("/base-stations");
  redirect("/base-stations?success=Base station created");
}

export async function updateBaseStationAction(
  baseStationId: string,
  _prevState: BaseStationFormState,
  formData: FormData
): Promise<BaseStationFormState> {
  const parsed = parseBaseStationFormData(formData);

  if (!parsed.success) {
    const flattened = parsed.error.flatten().fieldErrors;
    return buildErrorState("Please correct the highlighted fields.", {
      code: flattened.code?.[0],
      siteId: flattened.siteId?.[0],
      vendor: flattened.vendor?.[0],
      powerLevel: flattened.powerLevel?.[0],
      backhaulUsage: flattened.backhaulUsage?.[0],
      status: flattened.status?.[0]
    });
  }

  try {
    const supabase = createSupabaseAdminClient();
    const { tenant } = await getTenantContext();
    const values = parsed.data;
    const payload: BaseStationUpdate = {
      site_id: values.siteId,
      code: values.code,
      vendor: values.vendor,
      power_level: values.powerLevel,
      backhaul_usage: values.backhaulUsage,
      status: values.status,
      is_active: values.isActive
    };

    const [existing, site] = await Promise.all([
      supabase
        .from("base_stations")
        .select("id")
        .eq("tenant_id", tenant.id)
        .eq("id", baseStationId)
        .maybeSingle(),
      ensureTenantSite(values.siteId, tenant.id)
    ]);

    if (existing.error) {
      return buildErrorState(existing.error.message);
    }

    if (!existing.data) {
      return buildErrorState("Base station not found for this tenant.");
    }

    if (!site) {
      return buildErrorState("Selected site is not available for this tenant.", {
        siteId: "Choose an active site from this tenant."
      });
    }

    const { error } = await supabase
      .from("base_stations")
      .update(payload as never)
      .eq("tenant_id", tenant.id)
      .eq("id", baseStationId);

    if (error) {
      return buildErrorState(
        error.message.includes("duplicate")
          ? "Base station code must be unique within the tenant."
          : error.message
      );
    }
  } catch (error) {
    return buildErrorState(
      error instanceof Error ? error.message : "Unable to update base station."
    );
  }

  revalidatePath("/base-stations");
  revalidatePath(`/base-stations/${baseStationId}`);
  redirect(`/base-stations/${baseStationId}?success=Base station updated`);
}

export async function deactivateBaseStationAction(baseStationId: string) {
  const supabase = createSupabaseAdminClient();
  const { tenant } = await getTenantContext();
  const { error } = await supabase
    .from("base_stations")
    .update(({ is_active: false } as BaseStationUpdate) as never)
    .eq("tenant_id", tenant.id)
    .eq("id", baseStationId);

  if (error) {
    redirect(`/base-stations/${baseStationId}?error=${encodeURIComponent(error.message)}`);
  }

  revalidatePath("/base-stations");
  revalidatePath(`/base-stations/${baseStationId}`);
  redirect("/base-stations?success=Base station deactivated");
}
