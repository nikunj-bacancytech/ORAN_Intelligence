export type Severity = "critical" | "high" | "medium" | "low";
export type SiteStatus = "online" | "degraded" | "offline";
export type InvoiceStatus = "paid" | "pending" | "overdue";

export type DashboardMetric = {
  id: string;
  label: string;
  value: string;
  trend: string;
  trendDirection: "up" | "down" | "neutral";
};

export type Site = {
  id: string;
  code: string;
  name: string;
  region: string;
  uptime: number;
  subscribers: number;
  status: SiteStatus;
  technology: string;
  coveragePercent: number;
  monthlyEnergyCost: number;
  isActive: boolean;
};

export type BaseStation = {
  id: string;
  code: string;
  siteId: string;
  siteName: string;
  siteCode: string;
  vendor: string;
  powerLevel: number;
  backhaulUsage: number;
  status: SiteStatus;
  isActive: boolean;
};

export type Alarm = {
  id: string;
  title: string;
  siteName: string;
  severity: Severity;
  category: string;
  createdAt: string;
  acknowledged: boolean;
};

export type Invoice = {
  id: string;
  accountName: string;
  amount: number;
  dueDate: string;
  status: InvoiceStatus;
};

export type AnalyticsSnapshot = {
  id: string;
  label: string;
  coverage: number;
  utilization: number;
  energyCost: number;
};

export type SettingItem = {
  id: string;
  label: string;
  description: string;
  value: string;
};
