import Link from "next/link";

import { DataTable } from "@/components/tables/data-table";
import { Badge } from "@/components/ui/badge";
import { ButtonLink } from "@/components/ui/button-link";
import { Notice } from "@/components/ui/notice";
import { PageHeader } from "@/components/ui/page-header";
import { getSites } from "@/features/sites/lib/get-sites";
import { formatCompactNumber, formatCurrency, formatPercent } from "@/lib/utils/format";

export async function SitesPageView({
  success,
  error
}: {
  success?: string;
  error?: string;
}) {
  const sites = await getSites();

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Infrastructure"
        title="Sites"
        description="Track distributed tower and relay locations, subscriber coverage, and network health by region."
        action={<ButtonLink href="/sites/new">Create Site</ButtonLink>}
      />
      {success ? <Notice tone="success">{success}</Notice> : null}
      {error ? <Notice tone="error">{error}</Notice> : null}
      {sites.length === 0 ? (
        <Notice tone="info">No sites are available for this tenant yet. Create the first site to get started.</Notice>
      ) : null}
      <DataTable
        title="All sites"
        columns={["Site", "Region", "Subscribers", "Uptime", "Energy", "Status", "Actions"]}
      >
        {sites.map((site) => (
          <tr key={site.id} className="rounded-2xl bg-white">
            <td className="rounded-l-2xl px-4 py-4">
              <p className="font-medium">{site.name}</p>
              <p className="text-xs text-ink/50">{site.code}</p>
            </td>
            <td className="px-4 py-4 text-sm text-ink/65">{site.region}</td>
            <td className="px-4 py-4 text-sm text-ink/65">{formatCompactNumber(site.subscribers)}</td>
            <td className="px-4 py-4 text-sm text-ink/65">{formatPercent(site.uptime)}</td>
            <td className="px-4 py-4 text-sm text-ink/65">{formatCurrency(site.monthlyEnergyCost)}</td>
            <td className="px-4 py-4">
              <Badge
                tone={
                  site.isActive
                    ? site.status === "online"
                      ? "success"
                      : site.status === "degraded"
                        ? "warning"
                        : "danger"
                    : "neutral"
                }
              >
                {site.isActive ? site.status : "inactive"}
              </Badge>
            </td>
            <td className="rounded-r-2xl px-4 py-4 text-sm">
              <div className="flex flex-wrap gap-3">
                <Link href={`/sites/${site.id}`} className="font-medium text-accent">
                  View
                </Link>
                <Link href={`/sites/${site.id}/edit`} className="font-medium text-ink/70">
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
