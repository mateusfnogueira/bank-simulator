import { z } from "zod";

export const Schema = z
  .object({
    type: z.enum(["pix", "ted", "doc"], { message: "Tipo inválido" }),
    pixKey: z.string().min(3).max(255).optional(),
    bank: z.string().min(3).max(255).optional(),
    account: z.string().min(3).max(255).optional(),
    amount: z.number().positive({ message: "Valor deve ser positivo" }),
  })
  .refine((data) => data.type === "pix" && !data.pixKey, {
    message: "Chave Pix é obrigatória para Pix",
    path: ["pixKey"],
  })
  .refine(
    (data) => (data.type === "ted" || data.type === "doc") && !data.bank,
    {
      message: "Banco é obrigatório para TED e DOC",
      path: ["bank"],
    }
  )
  .refine(
    (data) => (data.type === "ted" || data.type === "doc") && !data.account,
    {
      message: "Conta é obrigatória para TED e DOC",
      path: ["account"],
    }
  );

export type FormType = z.infer<typeof Schema>;
