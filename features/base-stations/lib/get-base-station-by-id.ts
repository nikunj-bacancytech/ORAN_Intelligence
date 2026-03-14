import { notFound } from "next/navigation";

import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { getTenantContext } from "@/lib/auth/access";
import type { Database } from "@/types/database";
import type { BaseStation } from "@/types/domain";

type BaseStationRow = Database["public"]["Tables"]["base_stations"]["Row"];
type SiteRow = Pick<Database["public"]["Tables"]["sites"]["Row"], "id" | "name" | "code">;

function mapBaseStation(station: BaseStationRow, site: SiteRow | undefined): BaseStation {
  return {
    id: station.id,
    code: station.code,
    siteId: station.site_id,
    siteName: site?.name ?? "Unknown site",
    siteCode: site?.code ?? "N/A",
    vendor: station.vendor,
    powerLevel: station.power_level,
    backhaulUsage: station.backhaul_usage,
    status: station.status,
    isActive: station.is_active
  };
}

export async function getBaseStationById(baseStationId: string): Promise<BaseStation> {
  const supabase = createSupabaseAdminClient();
  const { tenant } = await getTenantContext();

  const [stationResult, sitesResult] = await Promise.all([
    supabase.from("base_stations").select("*").eq("tenant_id", tenant.id).eq("id", baseStationId).maybeSingle(),
    supabase.from("sites").select("id, name, code").eq("tenant_id", tenant.id)
  ]);

  if (stationResult.error) {
    throw stationResult.error;
  }

  if (sitesResult.error) {
    throw sitesResult.error;
  }

  if (!stationResult.data) {
    notFound();
  }

  const station = stationResult.data as BaseStationRow;
  const sites = (sitesResult.data ?? []) as SiteRow[];
  return mapBaseStation(station, sites.find((site) => site.id === station.site_id));
}
