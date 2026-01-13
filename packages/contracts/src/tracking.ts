import { z } from "zod";

import { IdSchema, IsoDateTimeSchema, LatSchema, LonSchema } from "./common";

export const TrackingEventSchema = z.object({
  driverId: IdSchema,
  deliveryId: IdSchema.optional(),
  lat: LatSchema,
  lon: LonSchema,
  timestamp: IsoDateTimeSchema,
});

export const DeliveryStatusChangedEventSchema = z.object({
  deliveryId: IdSchema,
  status: z.string().min(1),
  at: IsoDateTimeSchema,
});

export const DeliveryEtaUpdatedEventSchema = z.object({
  deliveryId: IdSchema,
  etaSeconds: z.number().nonnegative(),
  at: IsoDateTimeSchema,
});

export type TrackingEvent = z.infer<typeof TrackingEventSchema>;
export type DeliveryStatusChangedEvent = z.infer<
  typeof DeliveryStatusChangedEventSchema
>;
export type DeliveryEtaUpdatedEvent = z.infer<typeof DeliveryEtaUpdatedEventSchema>;
