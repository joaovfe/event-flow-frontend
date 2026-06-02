import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { EAuthenticatedPath } from '@/core/router';

import { LoadingButton, Page, PageButtons, PageCard, PageHeader, PageTitle } from '@/shared/components';
import { callbackOnInvalidZod, formatErrorForNotification } from '@/shared/utils';
import { Loading } from '@/shared/domain';

import { EventFormData, eventSchema } from '../../domain';
import { EventRepository } from '../../repositories';
import { EventForm } from '../../components/event-form';

export function EventCreate() {
  const navigate = useNavigate();

  const repository = new EventRepository();

  const [loading, setLoading] = useState<Loading>(false);

  const methods = useForm<EventFormData>({
    resolver: zodResolver(eventSchema),
  });

  async function submit(data: EventFormData) {
    if (loading) return;

    try {
      setLoading('POST');

      await repository.create({
        title: data.title,
        description: data.description,
        image: data.image || undefined,
        location: data.location,
        startDate: new Date(data.startDate).toISOString(),
        endDate: new Date(data.endDate).toISOString(),
      });

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
      </PageCard>
    </Page>
  );
}
