import { z } from "zod";

import { IdSchema, IsoDateTimeSchema, LatLonSchema } from "./common";

export const RouteSchema = z.object({
  deliveryId: IdSchema,
  geometry: z.string().min(1),
  distanceMeters: z.number().nonnegative(),
  durationSeconds: z.number().nonnegative(),
  updatedAt: IsoDateTimeSchema,
});

export const RouteRequestSchema = z.union([
  z.object({
    deliveryId: IdSchema,
  }),
  z.object({
    origin: LatLonSchema,
    destination: LatLonSchema,
  }),
]);

export const EtaResponseSchema = z.object({
  deliveryId: IdSchema,
  etaSeconds: z.number().nonnegative(),
  updatedAt: IsoDateTimeSchema,
});

export type Route = z.infer<typeof RouteSchema>;
export type RouteRequest = z.infer<typeof RouteRequestSchema>;
export type EtaResponse = z.infer<typeof EtaResponseSchema>;
