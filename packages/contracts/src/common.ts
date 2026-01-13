import { z } from "zod";

export const IdSchema = z.string().min(1);
export const IsoDateTimeSchema = z.string().min(1);

export const LatSchema = z.number().min(-90).max(90);
export const LonSchema = z.number().min(-180).max(180);

export const LatLonSchema = z.object({
  lat: LatSchema,
  lon: LonSchema,
});

export type Id = z.infer<typeof IdSchema>;
export type IsoDateTime = z.infer<typeof IsoDateTimeSchema>;
export type LatLon = z.infer<typeof LatLonSchema>;
