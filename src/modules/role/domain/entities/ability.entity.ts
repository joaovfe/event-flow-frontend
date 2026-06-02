import { isArray } from '@/shared/utils/array';
import { RoleAbility } from './role-ability.entity';
import { EAbilityReference } from '../enums';

export class Ability {
  public id: number = 0;

  public name: string = '';
  public reference: EAbilityReference = EAbilityReference.USER;
  public roleAbilities: Array<RoleAbility> = [];

  public createdAt?: string;
  public updatedAt?: string;
  public deletedAt?: string;

  constructor(data: Partial<Ability>) {
    const roleAbilities = isArray(data.roleAbilities)
      ? data.roleAbilities.map((roleAbility) => new RoleAbility(roleAbility))
      : [];

    Object.assign(this, { ...data, roleAbilities });
  }
}
