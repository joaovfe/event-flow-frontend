import { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Divider } from '@mui/material';

import { EAuthenticatedPath } from '@/core/router';

import { Loading as LoadingSpinner, LoadingButton, Page, PageButtons, PageCard, PageHeader, PageTitle } from '@/shared/components';
import { callbackOnInvalidZod, formatErrorForNotification } from '@/shared/utils';
import { Loading } from '@/shared/domain';

import { EventFormData, eventSchema } from '../../domain';
import { EventRepository } from '../../repositories';
import { EventForm } from '../../components/event-form';
import { TicketTypesSection } from '../../components/ticket-types/ticket-types-section';

export function EventUpdate() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const eventId = Number(id);

  const repository = new EventRepository();

  const [loading, setLoading] = useState<Loading>(false);

  const methods = useForm<EventFormData>({
    resolver: zodResolver(eventSchema),
  });

  async function load() {
    if (!eventId) return;

    try {
      setLoading('GET');

      const response = await repository.get(eventId);

      methods.reset({
        id: response.id,
        title: response.title,
        description: response.description,
        image: response.image ?? '',
        location: response.location,
        startDate: response.startDate ? new Date(response.startDate) : undefined,
        endDate: response.endDate ? new Date(response.endDate) : undefined,
        status: response.status,
      });
    } catch (error) {
      toast.error(formatErrorForNotification(error));
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, [eventId]);

  async function submit(data: EventFormData) {
    if (loading || !eventId) return;

    try {
      setLoading('PUT');

      await repository.update(eventId, {
        title: data.title,
        description: data.description,
        image: data.image || undefined,
        location: data.location,
        startDate: new Date(data.startDate).toISOString(),
        endDate: new Date(data.endDate).toISOString(),
      });

      toast.success('Evento atualizado com sucesso!');

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
        <PageTitle>Editar Evento</PageTitle>

        <PageButtons>
          <LoadingButton
            type="submit"
            color="success"
            variant="contained"
            loading={loading === 'PUT'}
            loadingIndicator="Salvando..."
            onClick={methods.handleSubmit(submit, callbackOnInvalidZod)}
          >
            Salvar
          </LoadingButton>
        </PageButtons>
      </PageHeader>

      <PageCard>
        {loading === 'GET' && <LoadingSpinner />}

        {loading !== 'GET' && (
          <>
            <FormProvider {...methods}>
              <EventForm disabled={loading === 'PUT'} />
            </FormProvider>

            {!!eventId && (
              <>
                <Divider flexItem />
                <TicketTypesSection eventId={eventId} />
              </>
            )}
          </>
        )}
      </PageCard>
    </Page>
  );
}
