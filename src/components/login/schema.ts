import { z } from "zod";

export const Schema = z.object({
  email: z.string().email(),
  password: z.string().min(6).max(255),
});

export type FormType = z.infer<typeof Schema>;
