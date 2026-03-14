import Link from "next/link";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PageHeader } from "@/components/ui/page-header";
import { SiteForm } from "@/features/sites/components/site-form";
import { createSiteAction } from "@/features/sites/lib/actions";

export default function NewSitePage() {
  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Infrastructure"
        title="Create Site"
        description="Add a new tenant-scoped site record to the operations inventory."
        action={
          <Link
            href="/sites"
            className="inline-flex items-center rounded-full border border-ink/10 bg-white px-5 py-3 text-sm font-medium text-ink"
          >
            Back to Sites
          </Link>
        }
      />
      <Card>
        <CardHeader>
          <CardTitle>Site details</CardTitle>
        </CardHeader>
        <CardContent>
          <SiteForm action={createSiteAction} submitLabel="Create Site" />
        </CardContent>
      </Card>
    </div>
  );
}
