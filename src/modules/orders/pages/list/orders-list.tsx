import { Page, PageCard, PageHeader, PageTitle } from '@shared/components';

import { OrderListProvider } from '../../contexts';
import { OrdersListFilters } from './components/orders-list-filters';
import { OrdersListTable } from './components/orders-list-table';

export function OrdersList() {
  return (
    <Page>
      <PageHeader>
        <PageTitle home>Pedidos</PageTitle>
      </PageHeader>

      <PageCard>
        <OrderListProvider>
          <OrdersListFilters />

          <OrdersListTable />
        </OrderListProvider>
      </PageCard>
    </Page>
  );
}
