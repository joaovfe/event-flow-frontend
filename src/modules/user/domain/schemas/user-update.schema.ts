import { Role } from '@/modules/role/domain';
import { EStatus } from '@/shared/domain';
import { z } from 'zod';

export const userUpdateSchema = z.object({
  id: z.number(),
  name: z
    .string({ required_error: 'Campo Obrigatório!' })
    .min(2, 'O "Nome" deve ter ao menos 2 caracteres!'),
  email: z
    .string({
      required_error: 'Campo Obrigatório!',
    })
    .min(1, 'Campo obrigatório!')
    .email({ message: 'E-mail inválido!' })
    .trim(),
  role: z.instanceof(Role, {
    message: 'É Obrigatório selecionar o Tipo de Usuário.',
  }),
  resetPassword: z.boolean(),
  status: z.nativeEnum(EStatus, {
    message: 'Obrigatório informar o Status do Usuário.',
  }),
});

export type UserUpdateData = z.infer<typeof userUpdateSchema>;
