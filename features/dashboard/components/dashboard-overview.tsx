import { ArrowRight } from "lucide-react";
import Link from "next/link";

import { MiniBarChart } from "@/components/charts/mini-bar-chart";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PageHeader } from "@/components/ui/page-header";
import { StatCard } from "@/components/ui/stat-card";
import { getDashboardData } from "@/features/dashboard/lib/get-dashboard-data";
import { formatRelativeTime } from "@/lib/utils/dates";
import { formatCompactNumber } from "@/lib/utils/format";

export async function DashboardOverview() {
  const { metrics, sites, alarms, stations, analytics } = await getDashboardData();

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Operations overview"
        title="Telecom network control plane"
        description="A production-ready MVP shell for monitoring infrastructure availability, incident pressure, subscriber demand, and revenue operations."
        action={
          <Link href="/analytics" className="inline-flex items-center gap-2 rounded-full border border-ink/10 bg-white px-5 py-3 text-sm font-medium text-ink">
            Explore analytics
            <ArrowRight className="h-4 w-4" />
          </Link>
        }
      />

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {metrics.map((metric) => (
          <StatCard key={metric.id} {...metric} />
        ))}
      </section>

      <section className="grid gap-4 xl:grid-cols-[1.2fr_0.8fr]">
        <Card>
          <CardHeader>
            <CardTitle>Coverage growth and utilization</CardTitle>
            <p className="text-sm text-ink/60">Weekly expansion across underserved service regions.</p>
          </CardHeader>
          <CardContent className="space-y-6">
            <MiniBarChart values={analytics.map((item) => item.coverage)} />
            <div className="grid gap-3 md:grid-cols-2">
              {analytics.map((snapshot) => (
                <div key={snapshot.id} className="rounded-2xl border border-ink/8 bg-surface px-4 py-3">
                  <div className="flex items-center justify-between">
                    <p className="font-medium">{snapshot.label}</p>
                    <Badge tone="info">{snapshot.coverage}% coverage</Badge>
                  </div>
                  <p className="mt-2 text-sm text-ink/60">{snapshot.utilization}% average utilization</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Open alarms</CardTitle>
            <p className="text-sm text-ink/60">Highest-priority incidents requiring field or NOC action.</p>
          </CardHeader>
          <CardContent className="space-y-3">
            {alarms.map((alarm) => (
              <div key={alarm.id} className="rounded-2xl border border-ink/8 bg-surface px-4 py-4">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="font-medium">{alarm.title}</p>
                    <p className="text-sm text-ink/55">{alarm.siteName}</p>
                  </div>
                  <Badge
                    tone={
                      alarm.severity === "critical"
                        ? "danger"
                        : alarm.severity === "high"
                          ? "warning"
                          : "neutral"
                    }
                  >
                    {alarm.severity}
                  </Badge>
                </div>
                <p className="mt-3 text-xs uppercase tracking-[0.2em] text-ink/40">
                  {alarm.category} • {formatRelativeTime(alarm.createdAt)}
                </p>
              </div>
            ))}
          </CardContent>
        </Card>
      </section>

      <section className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Site portfolio</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {sites.map((site) => (
              <div key={site.id} className="flex items-center justify-between rounded-2xl border border-ink/8 bg-surface px-4 py-4">
                <div>
                  <p className="font-medium">{site.name}</p>
                  <p className="text-sm text-ink/55">
                    {site.region} • {formatCompactNumber(site.subscribers)} subscribers
                  </p>
                </div>
                <Badge tone={site.status === "online" ? "success" : site.status === "degraded" ? "warning" : "danger"}>
                  {site.status}
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Base station load</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {stations.map((station) => (
              <div key={station.id} className="rounded-2xl border border-ink/8 bg-surface px-4 py-4">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="font-medium">{station.code}</p>
                    <p className="text-sm text-ink/55">{station.siteName}</p>
                  </div>
                  <Badge tone={station.status === "online" ? "success" : station.status === "degraded" ? "warning" : "danger"}>
                    {station.status}
                  </Badge>
                </div>
                <div className="mt-4 grid gap-2 sm:grid-cols-2">
                  <div className="rounded-2xl bg-white px-3 py-2 text-sm text-ink/60">Power {station.powerLevel}%</div>
                  <div className="rounded-2xl bg-white px-3 py-2 text-sm text-ink/60">
                    Backhaul {station.backhaulUsage}%
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
