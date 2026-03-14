import Link from "next/link";

import { deactivateSiteAction } from "@/features/sites/lib/actions";
import type { Site } from "@/types/domain";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Notice } from "@/components/ui/notice";
import { PageHeader } from "@/components/ui/page-header";
import { formatCompactNumber, formatCurrency, formatPercent } from "@/lib/utils/format";

export function SiteDetailView({
  site,
  success,
  error
}: {
  site: Site;
  success?: string;
  error?: string;
}) {
  const deactivate = deactivateSiteAction.bind(null, site.id);

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Site detail"
        title={site.name}
        description="Review site health, subscriber footprint, and lifecycle status."
        action={
          <div className="flex flex-wrap gap-3">
            <Link
              href={`/sites/${site.id}/edit`}
              className="inline-flex items-center rounded-full bg-accent px-5 py-3 text-sm font-medium text-accent-foreground"
            >
              Edit Site
            </Link>
            <Link
              href="/sites"
              className="inline-flex items-center rounded-full border border-ink/10 bg-white px-5 py-3 text-sm font-medium text-ink"
            >
              Back to Sites
            </Link>
          </div>
        }
      />
      {success ? <Notice tone="success">{success}</Notice> : null}
      {error ? <Notice tone="error">{error}</Notice> : null}
      <div className="grid gap-4 lg:grid-cols-[1fr_320px]">
        <Card>
          <CardHeader>
            <CardTitle>Operational snapshot</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4 md:grid-cols-2">
            <div className="rounded-2xl bg-surface px-4 py-4">
              <p className="text-xs uppercase tracking-[0.2em] text-ink/45">Code</p>
              <p className="mt-2 text-lg font-medium">{site.code}</p>
            </div>
            <div className="rounded-2xl bg-surface px-4 py-4">
              <p className="text-xs uppercase tracking-[0.2em] text-ink/45">Region</p>
              <p className="mt-2 text-lg font-medium">{site.region}</p>
            </div>
            <div className="rounded-2xl bg-surface px-4 py-4">
              <p className="text-xs uppercase tracking-[0.2em] text-ink/45">Subscribers</p>
              <p className="mt-2 text-lg font-medium">{formatCompactNumber(site.subscribers)}</p>
            </div>
            <div className="rounded-2xl bg-surface px-4 py-4">
              <p className="text-xs uppercase tracking-[0.2em] text-ink/45">Uptime</p>
              <p className="mt-2 text-lg font-medium">{formatPercent(site.uptime)}</p>
            </div>
            <div className="rounded-2xl bg-surface px-4 py-4">
              <p className="text-xs uppercase tracking-[0.2em] text-ink/45">Coverage</p>
              <p className="mt-2 text-lg font-medium">{site.coveragePercent}%</p>
            </div>
            <div className="rounded-2xl bg-surface px-4 py-4">
              <p className="text-xs uppercase tracking-[0.2em] text-ink/45">Monthly energy</p>
              <p className="mt-2 text-lg font-medium">{formatCurrency(site.monthlyEnergyCost)}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Status and lifecycle</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-ink/60">Service status</span>
              <Badge tone={site.status === "online" ? "success" : site.status === "degraded" ? "warning" : "danger"}>
                {site.status}
              </Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-ink/60">Record status</span>
              <Badge tone={site.isActive ? "info" : "neutral"}>{site.isActive ? "active" : "inactive"}</Badge>
            </div>
            <div className="rounded-2xl bg-surface px-4 py-4 text-sm text-ink/65">
              Technology stack: <span className="font-medium text-ink">{site.technology}</span>
            </div>
            {site.isActive ? (
              <form action={deactivate}>
                <button
                  type="submit"
                  className="inline-flex w-full items-center justify-center rounded-full border border-red-200 bg-red-50 px-5 py-3 text-sm font-medium text-red-700"
                >
                  Deactivate Site
                </button>
              </form>
            ) : (
              <Notice tone="info">This site has been deactivated and is no longer available for new base-station assignments.</Notice>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
