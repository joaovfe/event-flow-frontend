import { z } from 'zod';
import { EStatus } from '@/shared/domain';
import { ERoleReference } from '../enums/role-reference.enum';
import { roleAbilitySchema } from './role-ability.schema';

export const roleCreateSchema = z.object({
  reference: z.nativeEnum(ERoleReference, {
    errorMap: ({ code }) => {
      if (code === 'invalid_enum_value') return { message: 'Valor inválido!' };

      return {
        message: 'Campo obrigatório!',
      };
    },
  }),

  name: z
    .string({
      invalid_type_error: 'Valor inválido!',
      required_error: 'Campo obrigatório!',
    })
    .min(1, 'Campo obrigatório!'),

  status: z.nativeEnum(EStatus, {
    errorMap: ({ code }) => {
      if (code === 'invalid_enum_value') return { message: 'Valor inválido!' };

      return {
        message: 'Campo obrigatório!',
      };
    },
  }),

  abilities: z.array(roleAbilitySchema).min(0).default([]),
});

export type RoleCreateData = z.infer<typeof roleCreateSchema>;
