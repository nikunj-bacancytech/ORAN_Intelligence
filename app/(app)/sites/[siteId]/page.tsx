import { SiteDetailView } from "@/features/sites/components/site-detail-view";
import { getSiteById } from "@/features/sites/lib/get-site-by-id";

export default async function SiteDetailPage({
  params,
  searchParams
}: {
  params: Promise<{ siteId: string }>;
  searchParams: Promise<{ success?: string; error?: string }>;
}) {
  const { siteId } = await params;
  const query = await searchParams;
  const site = await getSiteById(siteId);

  return <SiteDetailView site={site} success={query.success} error={query.error} />;
}
