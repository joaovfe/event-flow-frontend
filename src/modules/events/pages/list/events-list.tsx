import { LinkButton, Page, PageButtons, PageCard, PageHeader, PageTitle } from '@shared/components';

import { EAuthenticatedPath } from '@/core/router';

import { EventListProvider } from '../../contexts';
import { EventsListFilters } from './components/events-list-filters';
import { EventsListTable } from './components/events-list-table';

export function EventsList() {
  return (
    <Page>
      <PageHeader>
        <PageTitle home>Eventos</PageTitle>

        <PageButtons>
          <LinkButton
            to={`${EAuthenticatedPath.EVENTS}/novo`}
            variant="contained"
            color="success"
            size="large"
          >
            Novo Evento
          </LinkButton>
        </PageButtons>
      </PageHeader>

      <PageCard>
        <EventListProvider>
          <EventsListFilters />

          <EventsListTable />
        </EventListProvider>
      </PageCard>
    </Page>
  );
}
