import { z } from 'zod'

export const financeSchema = z.object({
  description: z.string().min(1, 'Descrição é obrigatória'),
  value: z.number().refine(v => v !== 0, 'O valor não pode ser zero'),
})