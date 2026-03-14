export type DemoSeedResponse = {
  status: "ready";
  generatedAt: string;
  totals: {
    metrics: number;
    sites: number;
    baseStations: number;
    alarms: number;
    invoices: number;
    analyticsSnapshots: number;
  };
};
