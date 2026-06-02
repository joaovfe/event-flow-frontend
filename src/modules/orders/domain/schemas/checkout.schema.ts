import { z } from 'zod';

export const checkoutSchema = z.object({
  customerName: z
    .string({ required_error: 'Campo Obrigatório!' })
    .min(2, 'Informe seu nome completo!'),
  customerEmail: z
    .string({ required_error: 'Campo Obrigatório!' })
    .email('E-mail inválido!'),
  customerDocument: z.string().optional().or(z.literal('')),
});

export type CheckoutFormData = z.infer<typeof checkoutSchema>;
