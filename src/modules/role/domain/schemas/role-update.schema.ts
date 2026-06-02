import { z } from 'zod';
import { roleCreateSchema } from './role-create.schema';

export const roleUpdateSchema = z.object({}).and(roleCreateSchema);

export type RoleUpdateData = z.infer<typeof roleUpdateSchema>;
