import { EntityWithStatus } from '@/shared/domain';
import { ERoleReference } from '../enums/role-reference.enum';
import { RoleAbilityDTO } from './role-ability.dto';

export interface RoleCreateDTO extends EntityWithStatus {
  name: string;
  reference: ERoleReference;
  abilities: Array<RoleAbilityDTO>;
}
