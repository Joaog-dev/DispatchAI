import { z } from "zod";

import { IdSchema, IsoDateTimeSchema, LatSchema, LonSchema } from "./common";

export const DeliveryStatusSchema = z.enum([
  "created",
  "assigned",
  "in_route",
  "picked_up",
  "delivered",
  "failed",
  "cancelled",
]);

export const DeliveryWindowSchema = z.object({
  startAt: IsoDateTimeSchema,
  endAt: IsoDateTimeSchema,
});

export const DeliverySchema = z.object({
  id: IdSchema,
  code: z.string().min(1),
  originAddress: z.string().min(1),
  originLat: LatSchema,
  originLon: LonSchema,
  destinationAddress: z.string().min(1),
  destinationLat: LatSchema,
  destinationLon: LonSchema,
  status: DeliveryStatusSchema,
  scheduledWindow: DeliveryWindowSchema,
  driverId: IdSchema.nullable(),
  createdAt: IsoDateTimeSchema,
  updatedAt: IsoDateTimeSchema,
});

export const DeliveryCreateRequestSchema = z.object({
  code: z.string().min(1),
  originAddress: z.string().min(1),
  originLat: LatSchema.optional(),
  originLon: LonSchema.optional(),
  destinationAddress: z.string().min(1),
  destinationLat: LatSchema.optional(),
  destinationLon: LonSchema.optional(),
  scheduledWindow: DeliveryWindowSchema.optional(),
});

export const DeliveryUpdateRequestSchema = z.object({
  status: DeliveryStatusSchema.optional(),
  scheduledWindow: DeliveryWindowSchema.optional(),
});

export const DeliveryAssignRequestSchema = z.object({
  driverId: IdSchema,
});

export const DeliveryEventTypeSchema = z.enum([
  "created",
  "assigned",
  "in_route",
  "picked_up",
  "delivered",
  "failed",
  "incident",
]);

export const DeliveryEventSchema = z.object({
  id: IdSchema,
  deliveryId: IdSchema,
  type: DeliveryEventTypeSchema,
  notes: z.string().min(1).optional(),
  createdAt: IsoDateTimeSchema,
});

export const DeliveryEventCreateRequestSchema = z.object({
  type: DeliveryEventTypeSchema,
  notes: z.string().min(1).optional(),
});

export type DeliveryStatus = z.infer<typeof DeliveryStatusSchema>;
export type Delivery = z.infer<typeof DeliverySchema>;
export type DeliveryCreateRequest = z.infer<typeof DeliveryCreateRequestSchema>;
export type DeliveryUpdateRequest = z.infer<typeof DeliveryUpdateRequestSchema>;
export type DeliveryAssignRequest = z.infer<typeof DeliveryAssignRequestSchema>;
export type DeliveryEvent = z.infer<typeof DeliveryEventSchema>;
export type DeliveryEventCreateRequest = z.infer<
  typeof DeliveryEventCreateRequestSchema
>;
