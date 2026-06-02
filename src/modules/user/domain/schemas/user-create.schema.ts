import { Role } from '@/modules/role/domain';
import { EStatus, passwordSchema } from '@/shared/domain';
import { z } from 'zod';

export const userCreateSchema = z.object({
  id: z.number(),
  name: z
    .string({ required_error: 'Campo Obrigatório!' })
    .min(2, 'O "Nome" deve ter ao menos 2 caracteres!'),
  email: z
    .string({
      required_error: 'Campo Obrigatório!',
      message:
        'É necessário informar um e-mail válido no formato email@dominio.com',
    })
    .email()
    .trim(),
  role: z.instanceof(Role, {
    message: 'É Obrigatório selecionar o Tipo de Usuário.',
  }),

  password: passwordSchema,
  resetPassword: z.boolean(),
  status: z.nativeEnum(EStatus, {
    message: 'Obrigatório informar o Status do Usuário.',
  }),
});

export type UserCreateData = z.infer<typeof userCreateSchema>;
