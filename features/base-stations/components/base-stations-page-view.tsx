import Link from "next/link";

import { DataTable } from "@/components/tables/data-table";
import { Badge } from "@/components/ui/badge";
import { ButtonLink } from "@/components/ui/button-link";
import { Notice } from "@/components/ui/notice";
import { PageHeader } from "@/components/ui/page-header";
import { getBaseStations } from "@/features/base-stations/lib/get-base-stations";

export async function BaseStationsPageView({
  success,
  error
}: {
  success?: string;
  error?: string;
}) {
  const stations = await getBaseStations();

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Radio access"
        title="Base Stations"
        description="Monitor radio nodes, power levels, and backhaul pressure across the network edge."
        action={<ButtonLink href="/base-stations/new">Create Base Station</ButtonLink>}
      />
      {success ? <Notice tone="success">{success}</Notice> : null}
      {error ? <Notice tone="error">{error}</Notice> : null}
      {stations.length === 0 ? (
        <Notice tone="info">No base stations exist for this tenant yet. Create one from an active site.</Notice>
      ) : null}
      <DataTable
        title="Station inventory"
        columns={["Code", "Site", "Vendor", "Power", "Backhaul", "Status", "Actions"]}
      >
        {stations.map((station) => (
          <tr key={station.id} className="bg-white">
            <td className="rounded-l-2xl px-4 py-4 font-medium">{station.code}</td>
            <td className="px-4 py-4 text-sm text-ink/65">
              <p>{station.siteName}</p>
              <p className="text-xs text-ink/45">{station.siteCode}</p>
            </td>
            <td className="px-4 py-4 text-sm text-ink/65">{station.vendor}</td>
            <td className="px-4 py-4 text-sm text-ink/65">{station.powerLevel}%</td>
            <td className="px-4 py-4 text-sm text-ink/65">{station.backhaulUsage}%</td>
            <td className="px-4 py-4">
              <Badge
                tone={
                  station.isActive
                    ? station.status === "online"
                      ? "success"
                      : station.status === "degraded"
                        ? "warning"
                        : "danger"
                    : "neutral"
                }
              >
                {station.isActive ? station.status : "inactive"}
              </Badge>
            </td>
            <td className="rounded-r-2xl px-4 py-4 text-sm">
              <div className="flex flex-wrap gap-3">
                <Link href={`/base-stations/${station.id}`} className="font-medium text-accent">
                  View
                </Link>
                <Link href={`/base-stations/${station.id}/edit`} className="font-medium text-ink/70">
                  Edit
                </Link>
              </div>
            </td>
          </tr>
        ))}
      </DataTable>
    </div>
  );
}
