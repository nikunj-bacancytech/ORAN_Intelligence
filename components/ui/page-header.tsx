import { ReactNode } from "react";

export function PageHeader({
  eyebrow,
  title,
  description,
  action
}: {
  eyebrow: string;
  title: string;
  description: string;
  action?: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
      <div className="space-y-2">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-telecom-700">{eyebrow}</p>
        <div className="space-y-1">
          <h1 className="text-3xl font-semibold tracking-tight text-ink md:text-4xl">{title}</h1>
          <p className="max-w-2xl text-sm leading-6 text-ink/65">{description}</p>
        </div>
      </div>
      {action ? <div>{action}</div> : null}
    </div>
  );
}
