import Link from "next/link";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Notice } from "@/components/ui/notice";
import { PageHeader } from "@/components/ui/page-header";
import { BaseStationForm } from "@/features/base-stations/components/base-station-form";
import { getBaseStationById } from "@/features/base-stations/lib/get-base-station-by-id";
import { getSiteOptions } from "@/features/base-stations/lib/get-site-options";
import { updateBaseStationAction } from "@/features/base-stations/lib/actions";

export default async function EditBaseStationPage({
  params
}: {
  params: Promise<{ baseStationId: string }>;
}) {
  const { baseStationId } = await params;
  const station = await getBaseStationById(baseStationId);
  const siteOptions = await getSiteOptions({ includeSiteId: station.siteId });
  const action = updateBaseStationAction.bind(null, baseStationId);

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Radio access"
        title={`Edit ${station.code}`}
        description="Update station metadata and enforce a same-tenant active site association."
        action={
          <Link
            href={`/base-stations/${baseStationId}`}
            className="inline-flex items-center rounded-full border border-ink/10 bg-white px-5 py-3 text-sm font-medium text-ink"
          >
            Back to Detail
          </Link>
        }
      />
      <Card>
        <CardHeader>
          <CardTitle>Base station details</CardTitle>
        </CardHeader>
        <CardContent>
          {siteOptions.length === 0 ? (
            <Notice tone="info" className="mb-4">
              No active sites are currently available. Reactivate or create a site before reassigning this base station.
            </Notice>
          ) : null}
          <BaseStationForm
            action={action}
            siteOptions={siteOptions}
            submitLabel="Save Changes"
            defaultValues={{
              code: station.code,
              siteId: station.siteId,
              vendor: station.vendor,
              powerLevel: station.powerLevel,
              backhaulUsage: station.backhaulUsage,
              status: station.status,
              isActive: station.isActive
            }}
          />
        </CardContent>
      </Card>
    </div>
  );
}
