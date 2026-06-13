import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Divider } from '@mui/material';

import { EAuthenticatedPath } from '@/core/router';

import { LoadingButton, Page, PageButtons, PageCard, PageHeader, PageTitle } from '@/shared/components';
import { callbackOnInvalidZod, formatErrorForNotification } from '@/shared/utils';
import { Loading } from '@/shared/domain';

import { EventFormData, eventSchema, TicketTypeFormData } from '../../domain';
import { EventRepository, TicketTypeRepository } from '../../repositories';
import { EventForm } from '../../components/event-form';
import { PendingTicketTypesSection } from '../../components/ticket-types/pending-ticket-types-section';

export function EventCreate() {
  const navigate = useNavigate();

  const repository = new EventRepository();
  const ticketTypeRepository = new TicketTypeRepository();

  const [loading, setLoading] = useState<Loading>(false);
  const [ticketTypes, setTicketTypes] = useState<TicketTypeFormData[]>([]);

  const methods = useForm<EventFormData>({
    resolver: zodResolver(eventSchema),
  });

  async function submit(data: EventFormData) {
    if (loading) return;

    try {
      setLoading('POST');

      const created = await repository.create({
        title: data.title,
        description: data.description,
        image: data.image || undefined,
        location: data.location,
        startDate: new Date(data.startDate).toISOString(),
        endDate: new Date(data.endDate).toISOString(),
      });

      if (ticketTypes.length) {
        const results = await Promise.allSettled(
          ticketTypes.map((ticketType) =>
            ticketTypeRepository.create({
              eventId: created.id,
              name: ticketType.name,
              description: ticketType.description || undefined,
              price: ticketType.price,
              quantity: ticketType.quantity,
              active: ticketType.active ?? true,
            }),
          ),
        );

        if (results.some((result) => result.status === 'rejected')) {
          toast.warning(
            'O evento foi criado, mas alguns tipos de ingresso não puderam ser vinculados. Adicione-os na edição do evento.',
          );
        }
      }

      toast.success('Evento cadastrado com sucesso!');

      navigate(EAuthenticatedPath.EVENTS);
    } catch (error) {
      toast.error(formatErrorForNotification(error));
    } finally {
      setLoading(false);
    }
  }

  return (
    <Page>
      <PageHeader>
        <PageTitle>Novo Evento</PageTitle>

        <PageButtons>
          <LoadingButton
            type="submit"
            color="success"
            variant="contained"
            loading={loading === 'POST'}
            loadingIndicator="Criando..."
            onClick={methods.handleSubmit(submit, callbackOnInvalidZod)}
          >
            Salvar Evento
          </LoadingButton>
        </PageButtons>
      </PageHeader>

      <PageCard>
        <FormProvider {...methods}>
          <EventForm disabled={loading === 'POST'} />
        </FormProvider>

        <Divider flexItem />
        <PendingTicketTypesSection value={ticketTypes} onChange={setTicketTypes} />
      </PageCard>
    </Page>
  );
}
