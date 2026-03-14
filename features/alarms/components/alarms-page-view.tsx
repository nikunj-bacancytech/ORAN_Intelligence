import { DataTable } from "@/components/tables/data-table";
import { Badge } from "@/components/ui/badge";
import { PageHeader } from "@/components/ui/page-header";
import { getAlarms } from "@/features/alarms/lib/get-alarms";
import { formatRelativeTime } from "@/lib/utils/dates";

export async function AlarmsPageView() {
  const alarms = await getAlarms();

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Incidents"
        title="Alarms"
        description="Acknowledge critical events, understand fault domains, and prioritize field intervention."
      />
      <DataTable title="Alarm queue" columns={["Alarm", "Site", "Category", "Created", "Ack", "Severity"]}>
        {alarms.map((alarm) => (
          <tr key={alarm.id} className="bg-white">
            <td className="rounded-l-2xl px-4 py-4 font-medium">{alarm.title}</td>
            <td className="px-4 py-4 text-sm text-ink/65">{alarm.siteName}</td>
            <td className="px-4 py-4 text-sm text-ink/65">{alarm.category}</td>
            <td className="px-4 py-4 text-sm text-ink/65">{formatRelativeTime(alarm.createdAt)}</td>
            <td className="px-4 py-4 text-sm text-ink/65">{alarm.acknowledged ? "Acknowledged" : "Open"}</td>
            <td className="rounded-r-2xl px-4 py-4">
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
            </td>
          </tr>
        ))}
      </DataTable>
    </div>
  );
}
