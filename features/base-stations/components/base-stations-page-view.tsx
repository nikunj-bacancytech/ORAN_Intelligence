import { DataTable } from "@/components/tables/data-table";
import { Badge } from "@/components/ui/badge";
import { PageHeader } from "@/components/ui/page-header";
import { getBaseStations } from "@/features/base-stations/lib/get-base-stations";

export async function BaseStationsPageView() {
  const stations = await getBaseStations();

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Radio access"
        title="Base Stations"
        description="Monitor radio nodes, power levels, and backhaul pressure across the network edge."
      />
      <DataTable title="Station inventory" columns={["Code", "Site", "Vendor", "Power", "Backhaul", "Status"]}>
        {stations.map((station) => (
          <tr key={station.id} className="bg-white">
            <td className="rounded-l-2xl px-4 py-4 font-medium">{station.code}</td>
            <td className="px-4 py-4 text-sm text-ink/65">{station.siteName}</td>
            <td className="px-4 py-4 text-sm text-ink/65">{station.vendor}</td>
            <td className="px-4 py-4 text-sm text-ink/65">{station.powerLevel}%</td>
            <td className="px-4 py-4 text-sm text-ink/65">{station.backhaulUsage}%</td>
            <td className="rounded-r-2xl px-4 py-4">
              <Badge tone={station.status === "online" ? "success" : station.status === "degraded" ? "warning" : "danger"}>
                {station.status}
              </Badge>
            </td>
          </tr>
        ))}
      </DataTable>
    </div>
  );
}
