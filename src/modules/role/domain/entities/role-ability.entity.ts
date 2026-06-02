import { Ability } from './ability.entity';
import { Role } from './role.entity';

export class RoleAbility {
  public id: number = 0;

  public canCreate: boolean = false;
  public canRead: boolean = false;
  public canUpdate: boolean = false;
  public canDelete: boolean = false;

  public createdAt?: string;
  public updatedAt?: string;
  public deletedAt?: string;

  public role?: Role;
  public ability?: Ability;

  constructor(data: Partial<RoleAbility>) {
    const role = data.role && new Role(data.role);
    const ability = data.ability && new Ability(data.ability);

    Object.assign(this, { ...data, role, ability });
  }
}
