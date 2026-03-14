import { Bell, Search, Wifi } from "lucide-react";

import { Card } from "@/components/ui/card";

export function Topbar() {
  return (
    <Card className="p-4">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-center gap-3 rounded-full border border-ink/10 bg-surface px-4 py-2">
          <Search className="h-4 w-4 text-ink/40" />
          <span className="text-sm text-ink/50">Search site, alarm, invoice, or subscriber</span>
        </div>
        <div className="flex items-center gap-3">
          <div className="inline-flex items-center gap-2 rounded-full bg-green-100 px-3 py-2 text-sm font-medium text-green-700">
            <Wifi className="h-4 w-4" />
            Live sync healthy
          </div>
          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-ink/10 bg-white text-ink/70 transition hover:border-ink/20"
          >
            <Bell className="h-4 w-4" />
          </button>
        </div>
      </div>
    </Card>
  );
}
