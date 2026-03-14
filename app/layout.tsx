import type { Metadata } from "next";
import { ReactNode } from "react";

import { appConfig } from "@/lib/config/app";
import "@/app/globals.css";

export const metadata: Metadata = {
  title: {
    default: appConfig.name,
    template: `%s | ${appConfig.name}`
  },
  description: appConfig.description
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
