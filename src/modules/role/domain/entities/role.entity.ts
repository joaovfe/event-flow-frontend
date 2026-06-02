import { isArray } from '@/shared/utils';
import { EStatus } from '@/shared/domain';
import { ERoleReference } from '../enums';
import { RoleAbility } from './role-ability.entity';

export class Role {
  id: number = 0;
  name: string = '';
  status: EStatus = EStatus.INACTIVE;
  reference: ERoleReference = ERoleReference.USER;
  roleAbilities: Array<RoleAbility> = [];

  createdAt?: string;
  updatedAt?: string;
  deletedAt?: string;

  public constructor(data: Partial<Role>) {
    const roleAbilities = isArray(data.roleAbilities)
      ? data.roleAbilities.map((roleAbility) => new RoleAbility(roleAbility))
      : [];

    Object.assign(this, { ...data, roleAbilities });
  }
}
