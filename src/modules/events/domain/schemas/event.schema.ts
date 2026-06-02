import { z } from 'zod';

export const eventSchema = z.object({
  id: z.number().optional(),
  title: z
    .string({ required_error: 'Campo Obrigatório!' })
    .min(2, 'O título deve ter ao menos 2 caracteres!'),
  description: z
    .string({ required_error: 'Campo Obrigatório!' })
    .min(2, 'A descrição deve ter ao menos 2 caracteres!'),
  image: z.string().optional().or(z.literal('')),
  location: z
    .string({ required_error: 'Campo Obrigatório!' })
    .min(2, 'O local deve ter ao menos 2 caracteres!'),
  startDate: z.coerce.date({
    required_error: 'Campo Obrigatório!',
    invalid_type_error: 'Data inválida!',
  }),
  endDate: z.coerce.date({
    required_error: 'Campo Obrigatório!',
    invalid_type_error: 'Data inválida!',
  }),
  status: z.enum(['ACTIVE', 'INACTIVE']).optional(),
});

export type EventFormData = z.infer<typeof eventSchema>;
