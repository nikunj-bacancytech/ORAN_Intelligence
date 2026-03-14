import { MiniBarChart } from "@/components/charts/mini-bar-chart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PageHeader } from "@/components/ui/page-header";
import { getAnalyticsSnapshots } from "@/features/analytics/lib/get-analytics-snapshots";
import { formatCurrency } from "@/lib/utils/format";

export async function AnalyticsPageView() {
  const snapshots = await getAnalyticsSnapshots();

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Insights"
        title="Analytics"
        description="Assess service reach, capacity utilization, and operating cost movement across time."
      />
      <div className="grid gap-4 xl:grid-cols-[1fr_1fr]">
        <Card>
          <CardHeader>
            <CardTitle>Coverage trend</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <MiniBarChart values={snapshots.map((snapshot) => snapshot.coverage)} />
            <div className="grid gap-3">
              {snapshots.map((snapshot) => (
                <div key={snapshot.id} className="flex items-center justify-between rounded-2xl border border-ink/8 bg-surface px-4 py-4">
                  <p className="font-medium">{snapshot.label}</p>
                  <p className="text-sm text-ink/65">{snapshot.coverage}% covered</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Utilization and energy cost</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {snapshots.map((snapshot) => (
              <div key={snapshot.id} className="rounded-2xl border border-ink/8 bg-surface px-4 py-4">
                <div className="flex items-center justify-between">
                  <p className="font-medium">{snapshot.label}</p>
                  <p className="text-sm text-ink/65">{snapshot.utilization}% utilization</p>
                </div>
                <p className="mt-2 text-sm text-ink/55">Energy cost {formatCurrency(snapshot.energyCost)}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
