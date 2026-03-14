import { Field } from "@/components/forms/field";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PageHeader } from "@/components/ui/page-header";
import { getSettingsData } from "@/features/settings/lib/get-settings-data";
import { formatDateLabel } from "@/lib/utils/dates";

export async function SettingsPageView() {
  const settings = await getSettingsData();

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Platform"
        title="Settings"
        description="Manage the tenant profile and default operational controls used by the MVP."
      />
      <Card>
        <CardHeader>
          <CardTitle>General settings</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-2">
          <Field label="Tenant name" defaultValue={settings.tenantName} readOnly />
          <Field label="Default region" defaultValue={settings.defaultRegion} readOnly />
          <Field label="Critical alarm threshold" defaultValue={settings.criticalAlarmThreshold} readOnly />
          <Field label="Subscription plan" defaultValue={settings.planName} readOnly />
          <Field label="Support tier" defaultValue={settings.supportTier} readOnly />
          <Field label="Subscription renews" defaultValue={formatDateLabel(settings.renewsAt)} readOnly />
        </CardContent>
      </Card>
    </div>
  );
}
