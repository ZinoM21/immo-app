import * as z from "zod"

export const exposeCreateSchema = z.object({
  title: z.string().min(3).max(50),
  type: z
    .string()
    .min(1, { message: "Mindestens 1 Buchstabe" })
    .max(32, { message: "Maximal 32 Buchstaben" }),
  size: z.number().min(1).max(1000),
  rooms: z.number().min(1).max(10),
  floor: z.number().min(0).max(100),
  price: z.number().min(1).max(100_000_000),
  rent: z.number().min(1).max(100_000),
  address_line: z.string().min(3).max(255).optional(),
  postal_code: z.string().min(3).max(5).optional(),
  city: z.string().min(3).max(32).optional(),
  country: z.string().min(3).max(32).optional(),
  theme: z.string().min(3).max(32).optional(),
  logo: z.string().min(3).max(255).optional(),
})
