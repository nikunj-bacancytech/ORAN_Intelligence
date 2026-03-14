import { ArrowDownRight, ArrowUpRight, Minus } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";

export function StatCard({
  label,
  value,
  trend,
  trendDirection
}: {
  label: string;
  value: string;
  trend: string;
  trendDirection: "up" | "down" | "neutral";
}) {
  const Icon = trendDirection === "up" ? ArrowUpRight : trendDirection === "down" ? ArrowDownRight : Minus;
  const tone =
    trendDirection === "up"
      ? "text-green-700 bg-green-100"
      : trendDirection === "down"
        ? "text-red-700 bg-red-100"
        : "text-slate-700 bg-slate-100";

  return (
    <Card>
      <CardContent className="pt-6">
        <p className="text-sm text-ink/60">{label}</p>
        <div className="mt-4 flex items-end justify-between gap-4">
          <p className="text-3xl font-semibold tracking-tight">{value}</p>
          <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold ${tone}`}>
            <Icon className="h-3.5 w-3.5" />
            {trend}
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
