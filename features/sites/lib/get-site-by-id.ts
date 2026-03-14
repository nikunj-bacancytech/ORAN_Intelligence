import { notFound } from "next/navigation";

import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { getTenantContext } from "@/lib/auth/access";
import type { Database } from "@/types/database";
import type { Site } from "@/types/domain";

type SiteRow = Database["public"]["Tables"]["sites"]["Row"];

function mapSite(site: SiteRow): Site {
  return {
    id: site.id,
    code: site.code,
    name: site.name,
    region: site.region,
    uptime: Number(site.uptime),
    subscribers: site.subscribers,
    status: site.status,
    technology: site.technology,
    coveragePercent: site.coverage_percent,
    monthlyEnergyCost: site.monthly_energy_cost_cents / 100,
    isActive: site.is_active
  };
}

export async function getSiteById(siteId: string): Promise<Site> {
  const supabase = createSupabaseAdminClient();
  const { tenant } = await getTenantContext();
  const { data, error } = await supabase
    .from("sites")
    .select("*")
    .eq("tenant_id", tenant.id)
    .eq("id", siteId)
    .maybeSingle();

  if (error) {
    throw error;
  }

  if (!data) {
    notFound();
  }

  return mapSite(data as SiteRow);
}

export function mapSiteRow(site: SiteRow): Site {
  return mapSite(site);
}
