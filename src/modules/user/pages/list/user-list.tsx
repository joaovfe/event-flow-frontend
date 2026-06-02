import {
  LinkButton,
  Page,
  PageButtons,
  PageCard,
  PageHeader,
  PageTitle,
} from '@shared/components';

import { EAuthenticatedPath } from '@/core/router';

import { UserListProvider } from '../../contexts';
import { UserListFilters, UsersListTable } from './components';

export function UserList() {
  return (
    <Page>
      <PageHeader>
        <PageTitle home>Usuários</PageTitle>

        <PageButtons>
          <LinkButton
            to={`${EAuthenticatedPath.USERS}/novo`}
            variant="contained"
            color="success"
            size="large"
          >
            Novo Usuário
          </LinkButton>
        </PageButtons>
      </PageHeader>

      <PageCard>
        <UserListProvider>
          <UserListFilters />

          <UsersListTable />
        </UserListProvider>
      </PageCard>
    </Page>
  );
}
