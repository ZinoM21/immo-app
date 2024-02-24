import * as z from "zod"

export const exposeSchema = z.object({
  type: z.string().min(1).max(32),
  size: z.number().min(1).max(1000),
  rooms: z.number().min(1).max(10),
  floor: z.number().min(0).max(100),
  price: z.number().min(1).max(100_000_000),
  rent: z.number().min(1).max(100_000),
  address_line: z.string().min(3).max(255),
  postal_code: z.string().min(3).max(5),
  city: z.string().min(3).max(32),
  country: z.string().min(3).max(32),
  theme: z.string().min(3).max(32),
  logo: z.string().min(3).max(255),
})
