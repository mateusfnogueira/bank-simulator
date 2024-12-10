import { z } from 'zod'

export const Schema = z
  .object({
    type: z.enum(['pix', 'ted', 'doc'], { message: 'Tipo inválido' }),
    pixKey: z.string().optional(),
    bank: z
      .string()
      .min(1, { message: 'Banco é obrigatório' })
      .optional(),
    account: z
      .string()
      .min(1, { message: 'Conta é obrigatório' })
      .optional(),
    amount: z.string().min(1, { message: 'Valor é obrigatório' })
  })
  .refine(
    (data) =>
      data.type !== 'pix' || (data.type === 'pix' && data.pixKey),
    {
      message: 'Chave Pix é obrigatória para Pix',
      path: ['pixKey']
    }
  )
  .refine(
    (data) =>
      data.type !== 'ted' || (data.type === 'ted' && data.bank),
    {
      message: 'Banco é obrigatório para TED',
      path: ['bank']
    }
  )
  .refine(
    (data) =>
      data.type !== 'ted' || (data.type === 'ted' && data.account),
    {
      message: 'Conta é obrigatória para TED',
      path: ['account']
    }
  )
  .refine(
    (data) =>
      data.type !== 'doc' || (data.type === 'doc' && data.bank),
    {
      message: 'Banco é obrigatório para DOC',
      path: ['bank']
    }
  )
  .refine(
    (data) =>
      data.type !== 'doc' || (data.type === 'doc' && data.account),
    {
      message: 'Conta é obrigatória para DOC',
      path: ['account']
    }
  )

export type FormType = z.infer<typeof Schema>
