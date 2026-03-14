import { z } from "zod";

export const baseStationFormSchema = z.object({
  code: z.string().trim().min(3, "Station code is required."),
  siteId: z.string().uuid("A valid site is required."),
  vendor: z.string().trim().min(2, "Vendor is required."),
  powerLevel: z.coerce.number().int().min(0, "Power must be between 0 and 100.").max(100, "Power must be between 0 and 100."),
  backhaulUsage: z.coerce
    .number()
    .int()
    .min(0, "Backhaul must be between 0 and 100.")
    .max(100, "Backhaul must be between 0 and 100."),
  status: z.enum(["online", "degraded", "offline"]),
  isActive: z.coerce.boolean().default(true)
});

export type BaseStationFormValues = z.infer<typeof baseStationFormSchema>;

export type BaseStationFormState = {
  status: "idle" | "error";
  message?: string;
  fieldErrors?: Partial<Record<keyof BaseStationFormValues, string>>;
};
