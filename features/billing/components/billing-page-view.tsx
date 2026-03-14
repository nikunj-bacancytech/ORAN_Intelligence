import { DataTable } from "@/components/tables/data-table";
import { Badge } from "@/components/ui/badge";
import { PageHeader } from "@/components/ui/page-header";
import { getInvoices } from "@/features/billing/lib/get-invoices";
import { formatCurrency } from "@/lib/utils/format";
import { formatDateLabel } from "@/lib/utils/dates";

export async function BillingPageView() {
  const invoices = await getInvoices();

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Revenue"
        title="Billing"
        description="Review invoicing health, collections status, and tenant billing exposure."
      />
      <DataTable title="Recent invoices" columns={["Account", "Amount", "Due", "Status"]}>
        {invoices.map((invoice) => (
          <tr key={invoice.id} className="bg-white">
            <td className="rounded-l-2xl px-4 py-4 font-medium">{invoice.accountName}</td>
            <td className="px-4 py-4 text-sm text-ink/65">{formatCurrency(invoice.amount)}</td>
            <td className="px-4 py-4 text-sm text-ink/65">{formatDateLabel(invoice.dueDate)}</td>
            <td className="rounded-r-2xl px-4 py-4">
              <Badge
                tone={invoice.status === "paid" ? "success" : invoice.status === "pending" ? "warning" : "danger"}
              >
                {invoice.status}
              </Badge>
            </td>
          </tr>
        ))}
      </DataTable>
    </div>
  );
}
