import Link from "next/link";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Notice } from "@/components/ui/notice";
import { PageHeader } from "@/components/ui/page-header";
import { BaseStationForm } from "@/features/base-stations/components/base-station-form";
import { createBaseStationAction } from "@/features/base-stations/lib/actions";
import { getSiteOptions } from "@/features/base-stations/lib/get-site-options";

export default async function NewBaseStationPage() {
  const siteOptions = await getSiteOptions();

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Radio access"
        title="Create Base Station"
        description="Add a new base station and attach it to an active site from the same tenant."
        action={
          <Link
            href="/base-stations"
            className="inline-flex items-center rounded-full border border-ink/10 bg-white px-5 py-3 text-sm font-medium text-ink"
          >
            Back to Base Stations
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
              Create and keep at least one site active before adding a base station.
            </Notice>
          ) : null}
          <BaseStationForm action={createBaseStationAction} siteOptions={siteOptions} submitLabel="Create Base Station" />
        </CardContent>
      </Card>
    </div>
  );
}
