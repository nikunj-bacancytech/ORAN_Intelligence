import { BaseStationsPageView } from "@/features/base-stations/components/base-stations-page-view";

export default async function BaseStationsPage({
  searchParams
}: {
  searchParams: Promise<{ success?: string; error?: string }>;
}) {
  const params = await searchParams;
  return <BaseStationsPageView success={params.success} error={params.error} />;
}
