import { EAbilityReference } from '../enums/ability-reference.enum';

export interface RoleAbilityDTO {
  reference: EAbilityReference;
  canRead: boolean;
  canCreate: boolean;
  canUpdate: boolean;
  canDelete: boolean;
}
