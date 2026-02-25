import { z } from 'zod'

export const contactSchema = z.object({
  name: z.string().min(1, 'Nome é obrigatório'),
  email: z.string().email('E-mail inválido'),
  phone: z.string().regex(/^\d+$/, 'Telefone deve conter apenas números').min(8, 'Telefone muito curto'),
})