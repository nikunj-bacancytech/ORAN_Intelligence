import { BaseStationDetailView } from "@/features/base-stations/components/base-station-detail-view";
import { getBaseStationById } from "@/features/base-stations/lib/get-base-station-by-id";

export default async function BaseStationDetailPage({
  params,
  searchParams
}: {
  params: Promise<{ baseStationId: string }>;
  searchParams: Promise<{ success?: string; error?: string }>;
}) {
  const { baseStationId } = await params;
  const query = await searchParams;
  const station = await getBaseStationById(baseStationId);

  return <BaseStationDetailView station={station} success={query.success} error={query.error} />;
}
