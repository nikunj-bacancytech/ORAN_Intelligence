import { ReactNode } from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function DataTable({
  title,
  columns,
  children
}: {
  title: string;
  columns: string[];
  children: ReactNode;
}) {
  return (
    <Card>
      <CardHeader className="pb-0">
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="min-w-full border-separate border-spacing-y-3">
            <thead>
              <tr>
                {columns.map((column) => (
                  <th key={column} className="px-4 text-left text-xs font-semibold uppercase tracking-[0.2em] text-ink/45">
                    {column}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>{children}</tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}
