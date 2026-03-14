import { z } from "zod";

export const siteFormSchema = z.object({
  name: z.string().trim().min(2, "Site name is required."),
  code: z.string().trim().min(3, "Site code is required."),
  region: z.string().trim().min(2, "Region is required."),
  uptime: z.coerce.number().min(0, "Uptime must be at least 0.").max(100, "Uptime must be at most 100."),
  subscribers: z.coerce.number().int().min(0, "Subscribers cannot be negative."),
  status: z.enum(["online", "degraded", "offline"]),
  technology: z.string().trim().min(2, "Technology is required."),
  coveragePercent: z.coerce
    .number()
    .int()
    .min(0, "Coverage must be between 0 and 100.")
    .max(100, "Coverage must be between 0 and 100."),
  monthlyEnergyCost: z.coerce.number().min(0, "Energy cost cannot be negative."),
  isActive: z.coerce.boolean().default(true)
});

export type SiteFormValues = z.infer<typeof siteFormSchema>;

export type SiteFormState = {
  status: "idle" | "error";
  message?: string;
  fieldErrors?: Partial<Record<keyof SiteFormValues, string>>;
};
