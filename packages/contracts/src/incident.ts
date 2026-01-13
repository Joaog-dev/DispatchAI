import { z } from "zod";

import { IdSchema, IsoDateTimeSchema } from "./common";

export const IncidentTypeSchema = z.enum([
  "delay_weather",
  "delay_traffic",
  "accident",
  "vehicle_issue",
  "other",
]);

export const IncidentSchema = z.object({
  id: IdSchema,
  deliveryId: IdSchema,
  type: IncidentTypeSchema,
  description: z.string().min(1),
  createdAt: IsoDateTimeSchema,
});

export const IncidentCreateRequestSchema = z.object({
  deliveryId: IdSchema,
  type: IncidentTypeSchema,
  description: z.string().min(1),
});

export type IncidentType = z.infer<typeof IncidentTypeSchema>;
export type Incident = z.infer<typeof IncidentSchema>;
export type IncidentCreateRequest = z.infer<
  typeof IncidentCreateRequestSchema
>;
