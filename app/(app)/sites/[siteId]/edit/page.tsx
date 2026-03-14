import Link from "next/link";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PageHeader } from "@/components/ui/page-header";
import { SiteForm } from "@/features/sites/components/site-form";
import { updateSiteAction } from "@/features/sites/lib/actions";
import { getSiteById } from "@/features/sites/lib/get-site-by-id";

export default async function EditSitePage({
  params
}: {
  params: Promise<{ siteId: string }>;
}) {
  const { siteId } = await params;
  const site = await getSiteById(siteId);
  const action = updateSiteAction.bind(null, siteId);

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Infrastructure"
        title={`Edit ${site.name}`}
        description="Update this site while keeping the record within the current tenant boundary."
        action={
          <div className="flex flex-wrap gap-3">
            <Link
              href={`/sites/${siteId}`}
              className="inline-flex items-center rounded-full border border-ink/10 bg-white px-5 py-3 text-sm font-medium text-ink"
            >
              Back to Detail
            </Link>
          </div>
        }
      />
      <Card>
        <CardHeader>
          <CardTitle>Site details</CardTitle>
        </CardHeader>
        <CardContent>
          <SiteForm
            action={action}
            submitLabel="Save Changes"
            defaultValues={{
              name: site.name,
              code: site.code,
              region: site.region,
              uptime: site.uptime,
              subscribers: site.subscribers,
              status: site.status,
              technology: site.technology,
              coveragePercent: site.coveragePercent,
              monthlyEnergyCost: site.monthlyEnergyCost,
              isActive: site.isActive
            }}
          />
        </CardContent>
      </Card>
    </div>
  );
}
