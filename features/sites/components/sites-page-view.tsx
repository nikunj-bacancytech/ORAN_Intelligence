import { DataTable } from "@/components/tables/data-table";
import { Badge } from "@/components/ui/badge";
import { PageHeader } from "@/components/ui/page-header";
import { getSites } from "@/features/sites/lib/get-sites";
import { formatCompactNumber, formatPercent } from "@/lib/utils/format";

export async function SitesPageView() {
  const sites = await getSites();

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Infrastructure"
        title="Sites"
        description="Track distributed tower and relay locations, subscriber coverage, and network health by region."
      />
      <DataTable title="All sites" columns={["Site", "Region", "Subscribers", "Uptime", "Technology", "Status"]}>
        {sites.map((site) => (
          <tr key={site.id} className="rounded-2xl bg-white">
            <td className="rounded-l-2xl px-4 py-4 font-medium">{site.name}</td>
            <td className="px-4 py-4 text-sm text-ink/65">{site.region}</td>
            <td className="px-4 py-4 text-sm text-ink/65">{formatCompactNumber(site.subscribers)}</td>
            <td className="px-4 py-4 text-sm text-ink/65">{formatPercent(site.uptime)}</td>
            <td className="px-4 py-4 text-sm text-ink/65">{site.technology}</td>
            <td className="rounded-r-2xl px-4 py-4">
              <Badge tone={site.status === "online" ? "success" : site.status === "degraded" ? "warning" : "danger"}>
                {site.status}
              </Badge>
            </td>
          </tr>
        ))}
      </DataTable>
    </div>
  );
}
