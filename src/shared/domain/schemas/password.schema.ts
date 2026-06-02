import { z } from 'zod';

export const passwordSchema = z
  .string({
    invalid_type_error: 'Valor inválido!',
    required_error: 'Campo obrigatório!',
  })
  .min(1, 'Campo obrigatório!')
  .trim()
  .min(8, 'A senha deve conter no mínimo 8 caracteres.')
  .refine(
    (password) => /.*\d.*\d.*/.test(password),
    'A senha deve conter pelo menos dois números.',
  )
  .refine(
    (password) => /[a-z]/.test(password),
    'A senha deve conter pelo menos uma letras minúsculas.',
  )
  .refine(
    (password) => /[A-Z]/.test(password),
    'A senha deve conter pelo menos uma letras maiúsculas.',
  )
  .refine(
    (password) => /[!@#$%^&()_+.]/.test(password),
    'A senha deve conter pelo menos um caractere especial.',
  );
