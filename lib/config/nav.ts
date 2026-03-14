import type { LucideIcon } from "lucide-react";
import {
  AlarmClockCheck,
  BarChart3,
  CreditCard,
  LayoutDashboard,
  RadioTower,
  Settings,
  Waypoints
} from "lucide-react";

export type NavigationItem = {
  href: string;
  label: string;
  icon: LucideIcon;
  description: string;
};

export const navigationItems: NavigationItem[] = [
  {
    href: "/dashboard",
    label: "Dashboard",
    icon: LayoutDashboard,
    description: "Network health summary"
  },
  {
    href: "/sites",
    label: "Sites",
    icon: Waypoints,
    description: "Tower and field locations"
  },
  {
    href: "/base-stations",
    label: "Base Stations",
    icon: RadioTower,
    description: "Radio and power status"
  },
  {
    href: "/alarms",
    label: "Alarms",
    icon: AlarmClockCheck,
    description: "Incident queue and severity"
  },
  {
    href: "/billing",
    label: "Billing",
    icon: CreditCard,
    description: "Revenue and collections"
  },
  {
    href: "/analytics",
    label: "Analytics",
    icon: BarChart3,
    description: "Coverage and utilization trends"
  },
  {
    href: "/settings",
    label: "Settings",
    icon: Settings,
    description: "Tenant and platform controls"
  }
];
