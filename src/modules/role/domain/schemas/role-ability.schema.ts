import { z } from 'zod';

export const roleAbilitySchema = z.object({
  name: z.string().optional(),
  reference: z.string(),
  canRead: z.boolean().default(false),
  canUpdate: z.boolean().default(false),
  canCreate: z.boolean().default(false),
  canDelete: z.boolean().default(false),
});

export type RoleAbilityData = z.infer<typeof roleAbilitySchema>;
