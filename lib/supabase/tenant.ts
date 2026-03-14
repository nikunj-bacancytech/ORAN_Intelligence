import type { Database } from "@/types/database";

import { createSupabaseAdminClient } from "@/lib/supabase/admin";

export type TenantRecord = Database["public"]["Tables"]["tenants"]["Row"];

export async function getDefaultTenant(): Promise<TenantRecord> {
  const supabase = createSupabaseAdminClient();
  const slug = process.env.DEFAULT_TENANT_SLUG ?? "oran-demo";

  const { data, error } = await supabase
    .from("tenants")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error || !data) {
    throw new Error(`Default tenant '${slug}' not found in Supabase.`);
  }

  return data;
}
