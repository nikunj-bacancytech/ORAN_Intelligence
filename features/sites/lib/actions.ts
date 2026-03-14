"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { getTenantContext } from "@/lib/auth/access";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { siteFormSchema, type SiteFormState } from "@/features/sites/lib/site-schema";
import type { Database } from "@/types/database";

type SiteInsert = Database["public"]["Tables"]["sites"]["Insert"];
type SiteUpdate = Database["public"]["Tables"]["sites"]["Update"];

function parseSiteFormData(formData: FormData) {
  return siteFormSchema.safeParse({
    name: formData.get("name"),
    code: formData.get("code"),
    region: formData.get("region"),
    uptime: formData.get("uptime"),
    subscribers: formData.get("subscribers"),
    status: formData.get("status"),
    technology: formData.get("technology"),
    coveragePercent: formData.get("coveragePercent"),
    monthlyEnergyCost: formData.get("monthlyEnergyCost"),
    isActive: formData.get("isActive") === "true"
  });
}

function buildErrorState(message: string, fieldErrors?: SiteFormState["fieldErrors"]): SiteFormState {
  return {
    status: "error",
    message,
    fieldErrors
  };
}

export async function createSiteAction(
  _prevState: SiteFormState,
  formData: FormData
): Promise<SiteFormState> {
  const parsed = parseSiteFormData(formData);

  if (!parsed.success) {
    const flattened = parsed.error.flatten().fieldErrors;
    return buildErrorState("Please correct the highlighted fields.", {
      name: flattened.name?.[0],
      code: flattened.code?.[0],
      region: flattened.region?.[0],
      uptime: flattened.uptime?.[0],
      subscribers: flattened.subscribers?.[0],
      status: flattened.status?.[0],
      technology: flattened.technology?.[0],
      coveragePercent: flattened.coveragePercent?.[0],
      monthlyEnergyCost: flattened.monthlyEnergyCost?.[0]
    });
  }

  try {
    const supabase = createSupabaseAdminClient();
    const { tenant } = await getTenantContext();
    const values = parsed.data;
    const payload: SiteInsert = {
      tenant_id: tenant.id,
      name: values.name,
      code: values.code,
      region: values.region,
      uptime: values.uptime,
      subscribers: values.subscribers,
      status: values.status,
      technology: values.technology,
      coverage_percent: values.coveragePercent,
      monthly_energy_cost_cents: Math.round(values.monthlyEnergyCost * 100),
      is_active: values.isActive
    };

    const { error } = await supabase.from("sites").insert(payload as never);

    if (error) {
      return buildErrorState(
        error.message.includes("duplicate")
          ? "Site code must be unique within the tenant."
          : error.message
      );
    }
  } catch (error) {
    return buildErrorState(error instanceof Error ? error.message : "Unable to create site.");
  }

  revalidatePath("/sites");
  redirect("/sites?success=Site created");
}

export async function updateSiteAction(
  siteId: string,
  _prevState: SiteFormState,
  formData: FormData
): Promise<SiteFormState> {
  const parsed = parseSiteFormData(formData);

  if (!parsed.success) {
    const flattened = parsed.error.flatten().fieldErrors;
    return buildErrorState("Please correct the highlighted fields.", {
      name: flattened.name?.[0],
      code: flattened.code?.[0],
      region: flattened.region?.[0],
      uptime: flattened.uptime?.[0],
      subscribers: flattened.subscribers?.[0],
      status: flattened.status?.[0],
      technology: flattened.technology?.[0],
      coveragePercent: flattened.coveragePercent?.[0],
      monthlyEnergyCost: flattened.monthlyEnergyCost?.[0]
    });
  }

  try {
    const supabase = createSupabaseAdminClient();
    const { tenant } = await getTenantContext();
    const values = parsed.data;
    const payload: SiteUpdate = {
      name: values.name,
      code: values.code,
      region: values.region,
      uptime: values.uptime,
      subscribers: values.subscribers,
      status: values.status,
      technology: values.technology,
      coverage_percent: values.coveragePercent,
      monthly_energy_cost_cents: Math.round(values.monthlyEnergyCost * 100),
      is_active: values.isActive
    };

    const { data: existing, error: existingError } = await supabase
      .from("sites")
      .select("id")
      .eq("tenant_id", tenant.id)
      .eq("id", siteId)
      .maybeSingle();

    if (existingError) {
      return buildErrorState(existingError.message);
    }

    if (!existing) {
      return buildErrorState("Site not found for this tenant.");
    }

    const { error } = await supabase
      .from("sites")
      .update(payload as never)
      .eq("tenant_id", tenant.id)
      .eq("id", siteId);

    if (error) {
      return buildErrorState(
        error.message.includes("duplicate")
          ? "Site code must be unique within the tenant."
          : error.message
      );
    }
  } catch (error) {
    return buildErrorState(error instanceof Error ? error.message : "Unable to update site.");
  }

  revalidatePath("/sites");
  revalidatePath(`/sites/${siteId}`);
  redirect(`/sites/${siteId}?success=Site updated`);
}

export async function deactivateSiteAction(siteId: string) {
  const supabase = createSupabaseAdminClient();
  const { tenant } = await getTenantContext();

  const { error } = await supabase
    .from("sites")
    .update(({ is_active: false } as SiteUpdate) as never)
    .eq("tenant_id", tenant.id)
    .eq("id", siteId);

  if (error) {
    redirect(`/sites/${siteId}?error=${encodeURIComponent(error.message)}`);
  }

  revalidatePath("/sites");
  revalidatePath(`/sites/${siteId}`);
  redirect("/sites?success=Site deactivated");
}
