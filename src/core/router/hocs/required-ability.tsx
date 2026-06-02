import { PropsWithChildren } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

import { EAbilityReference, RoleAbility } from '@/modules/role/domain';
import { useAuth } from '@/modules/auth/hooks';

import { EAuthenticatedPath } from '../domain/enums/authenticated-path.enum';

type RequiredAbilityProps = PropsWithChildren & {
  reference: keyof typeof EAbilityReference;
  action?: keyof Pick<
    RoleAbility,
    'canRead' | 'canCreate' | 'canUpdate' | 'canDelete'
  >;
};

export function checkRoleAbilitiesAction(
  roleAbilities?: Array<RoleAbility>,
  reference?: keyof typeof EAbilityReference,
  action: keyof Pick<
    RoleAbility,
    'canRead' | 'canCreate' | 'canUpdate' | 'canDelete'
  > = 'canRead',
): boolean {
  if (!reference) return true;

  return (
    roleAbilities?.some(
      (roleAbility) =>
        roleAbility.ability?.reference === reference && roleAbility[action],
    ) ?? false
  );
}

export function RequiredAbility({
  children,
  reference,
  action = 'canRead',
}: RequiredAbilityProps) {
  const { user } = useAuth();

  return checkRoleAbilitiesAction(
    user?.role?.roleAbilities,
    reference,
    action,
  ) ? (
    (children ?? <Outlet />)
  ) : (
    <Navigate to={EAuthenticatedPath.DASHBOARD} />
  );
}
