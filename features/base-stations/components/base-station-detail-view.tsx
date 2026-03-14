import Link from "next/link";

import { deactivateBaseStationAction } from "@/features/base-stations/lib/actions";
import type { BaseStation } from "@/types/domain";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Notice } from "@/components/ui/notice";
import { PageHeader } from "@/components/ui/page-header";

export function BaseStationDetailView({
  station,
  success,
  error
}: {
  station: BaseStation;
  success?: string;
  error?: string;
}) {
  const deactivate = deactivateBaseStationAction.bind(null, station.id);

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Base station detail"
        title={station.code}
        description="Inspect radio node assignment, vendor data, and operational state."
        action={
          <div className="flex flex-wrap gap-3">
            <Link
              href={`/base-stations/${station.id}/edit`}
              className="inline-flex items-center rounded-full bg-accent px-5 py-3 text-sm font-medium text-accent-foreground"
            >
              Edit Base Station
            </Link>
            <Link
              href="/base-stations"
              className="inline-flex items-center rounded-full border border-ink/10 bg-white px-5 py-3 text-sm font-medium text-ink"
            >
              Back to Base Stations
            </Link>
          </div>
        }
      />
      {success ? <Notice tone="success">{success}</Notice> : null}
      {error ? <Notice tone="error">{error}</Notice> : null}
      <div className="grid gap-4 lg:grid-cols-[1fr_320px]">
        <Card>
          <CardHeader>
            <CardTitle>Node attributes</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4 md:grid-cols-2">
            <div className="rounded-2xl bg-surface px-4 py-4">
              <p className="text-xs uppercase tracking-[0.2em] text-ink/45">Assigned site</p>
              <p className="mt-2 text-lg font-medium">{station.siteName}</p>
              <p className="text-sm text-ink/55">{station.siteCode}</p>
            </div>
            <div className="rounded-2xl bg-surface px-4 py-4">
              <p className="text-xs uppercase tracking-[0.2em] text-ink/45">Vendor</p>
              <p className="mt-2 text-lg font-medium">{station.vendor}</p>
            </div>
            <div className="rounded-2xl bg-surface px-4 py-4">
              <p className="text-xs uppercase tracking-[0.2em] text-ink/45">Power level</p>
              <p className="mt-2 text-lg font-medium">{station.powerLevel}%</p>
            </div>
            <div className="rounded-2xl bg-surface px-4 py-4">
              <p className="text-xs uppercase tracking-[0.2em] text-ink/45">Backhaul usage</p>
              <p className="mt-2 text-lg font-medium">{station.backhaulUsage}%</p>
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
              <Badge tone={station.status === "online" ? "success" : station.status === "degraded" ? "warning" : "danger"}>
                {station.status}
              </Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-ink/60">Record status</span>
              <Badge tone={station.isActive ? "info" : "neutral"}>{station.isActive ? "active" : "inactive"}</Badge>
            </div>
            {station.isActive ? (
              <form action={deactivate}>
                <button
                  type="submit"
                  className="inline-flex w-full items-center justify-center rounded-full border border-red-200 bg-red-50 px-5 py-3 text-sm font-medium text-red-700"
                >
                  Deactivate Base Station
                </button>
              </form>
            ) : (
              <Notice tone="info">This base station is inactive and hidden from active operational planning.</Notice>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
