import { SitesPageView } from "@/features/sites/components/sites-page-view";

export default async function SitesPage({
  searchParams
}: {
  searchParams: Promise<{ success?: string; error?: string }>;
}) {
  const params = await searchParams;
  return <SitesPageView success={params.success} error={params.error} />;
}
