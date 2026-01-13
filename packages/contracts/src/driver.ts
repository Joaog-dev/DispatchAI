import { z } from "zod";

import { IdSchema, IsoDateTimeSchema, LatSchema, LonSchema } from "./common";

export const DriverSchema = z.object({
  id: IdSchema,
  name: z.string().min(1),
  phone: z.string().min(1).optional(),
  active: z.boolean(),
  createdAt: IsoDateTimeSchema,
});

export const DriverCreateRequestSchema = z.object({
  name: z.string().min(1),
  phone: z.string().min(1).optional(),
});

export const DriverLocationSchema = z.object({
  driverId: IdSchema,
  deliveryId: IdSchema.optional(),
  lat: LatSchema,
  lon: LonSchema,
  timestamp: IsoDateTimeSchema,
});

export const DriverLocationUpdateRequestSchema = z.object({
  driverId: IdSchema,
  deliveryId: IdSchema.optional(),
  lat: LatSchema,
  lon: LonSchema,
  timestamp: IsoDateTimeSchema,
});

export type Driver = z.infer<typeof DriverSchema>;
export type DriverCreateRequest = z.infer<typeof DriverCreateRequestSchema>;
export type DriverLocation = z.infer<typeof DriverLocationSchema>;
export type DriverLocationUpdateRequest = z.infer<
  typeof DriverLocationUpdateRequestSchema
>;
