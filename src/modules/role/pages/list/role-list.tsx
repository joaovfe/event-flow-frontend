import {
  LinkButton,
  Page,
  PageButtons,
  PageCard,
  PageHeader,
  PageTitle,
} from '@shared/components';

import { EAuthenticatedPath } from '@/core/router';

import { RoleListProvider } from '../../contexts';
import { RoleListFilters, RoleListTable } from './components';

export function RoleList() {
  return (
    <RoleListProvider>
      <Page>
        <PageHeader>
          <PageTitle home>Perfis de Usuário</PageTitle>

          <PageButtons>
            <LinkButton
              to={`${EAuthenticatedPath.ROLES}/novo`}
              variant="contained"
              color="success"
              size="large"
            >
              Novo Perfil de Usuário
            </LinkButton>
          </PageButtons>
        </PageHeader>

        <PageCard>
          <RoleListFilters />

          <RoleListTable />
        </PageCard>
      </Page>
    </RoleListProvider>
  );
}
