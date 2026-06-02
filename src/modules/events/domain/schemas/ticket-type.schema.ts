import { z } from 'zod';

export const ticketTypeSchema = z.object({
  id: z.number().optional(),
  name: z
    .string({ required_error: 'Campo Obrigatório!' })
    .min(2, 'O nome deve ter ao menos 2 caracteres!'),
  description: z.string().optional().or(z.literal('')),
  price: z.coerce
    .number({ required_error: 'Campo Obrigatório!', invalid_type_error: 'Valor inválido!' })
    .min(0, 'O preço não pode ser negativo!'),
  quantity: z.coerce
    .number({ required_error: 'Campo Obrigatório!', invalid_type_error: 'Valor inválido!' })
    .int('A quantidade deve ser um número inteiro!')
    .min(1, 'A quantidade deve ser ao menos 1!'),
  active: z.boolean().optional(),
});

export type TicketTypeFormData = z.infer<typeof ticketTypeSchema>;
