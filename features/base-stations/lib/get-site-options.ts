import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { getTenantContext } from "@/lib/auth/access";
import type { Database } from "@/types/database";

type SiteRow = Pick<Database["public"]["Tables"]["sites"]["Row"], "id" | "name" | "code" | "is_active">;

export async function getSiteOptions(options?: { includeSiteId?: string }) {
  const supabase = createSupabaseAdminClient();
  const { tenant } = await getTenantContext();
  const includeSiteId = options?.includeSiteId;
  const { data, error } = await supabase
    .from("sites")
    .select("id, name, code, is_active")
    .eq("tenant_id", tenant.id)
    .order("name", { ascending: true });

  if (error) {
    throw error;
  }

  return ((data ?? []) as SiteRow[])
    .filter((site) => site.is_active || site.id === includeSiteId)
    .map((site) => ({
      label: `${site.name} (${site.code})${site.is_active ? "" : " • inactive"}`,
      value: site.id
    }));
}
