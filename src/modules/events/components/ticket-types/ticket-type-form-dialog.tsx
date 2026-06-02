import { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'react-toastify';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid2 as Grid,
} from '@mui/material';

import { ControlledText } from '@/shared/components';
import { ControlledNumber } from '@/shared/components/fields';
import { LoadingButton } from '@/shared/components';
import { callbackOnInvalidZod, formatErrorForNotification } from '@/shared/utils';
import { Loading } from '@/shared/domain';

import { TicketType, TicketTypeFormData, ticketTypeSchema } from '../../domain';
import { TicketTypeRepository } from '../../repositories';

type TicketTypeFormDialogProps = {
  open: boolean;
  eventId: number;
  ticketType?: TicketType;
  onClose: () => void;
  onSaved: () => void;
};

export function TicketTypeFormDialog({
  open,
  eventId,
  ticketType,
  onClose,
  onSaved,
}: TicketTypeFormDialogProps) {
  const repository = new TicketTypeRepository();
  const [loading, setLoading] = useState<Loading>(false);

  const methods = useForm<TicketTypeFormData>({
    resolver: zodResolver(ticketTypeSchema),
    defaultValues: { name: '', description: '', price: 0, quantity: 1, active: true },
  });

  useEffect(() => {
    if (ticketType) {
      methods.reset({
        name: ticketType.name,
        description: ticketType.description ?? '',
        price: ticketType.price,
        quantity: ticketType.quantity,
        active: ticketType.active,
      });
    } else {
      methods.reset({ name: '', description: '', price: 0, quantity: 1, active: true });
    }
  }, [ticketType, open]);

  async function submit(data: TicketTypeFormData) {
    if (loading) return;

    try {
      setLoading(ticketType ? 'PUT' : 'POST');

      if (ticketType) {
        await repository.update(ticketType.id, {
          name: data.name,
          description: data.description || undefined,
          price: data.price,
          quantity: data.quantity,
          active: data.active,
        });
        toast.success('Tipo de ingresso atualizado!');
      } else {
        await repository.create({
          eventId,
          name: data.name,
          description: data.description || undefined,
          price: data.price,
          quantity: data.quantity,
          active: data.active ?? true,
        });
        toast.success('Tipo de ingresso criado!');
      }

      onSaved();
      onClose();
    } catch (error) {
      toast.error(formatErrorForNotification(error));
    } finally {
      setLoading(false);
    }
  }

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>{ticketType ? 'Editar Tipo de Ingresso' : 'Novo Tipo de Ingresso'}</DialogTitle>

      <DialogContent>
        <FormProvider {...methods}>
          <Grid container spacing={2} mt={0}>
            <Grid size={{ xs: 12 }}>
              <ControlledText label="Nome*" name="name" size="small" control={methods.control} />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <ControlledText
                label="Descrição"
                name="description"
                size="small"
                control={methods.control}
                multiline
                minRows={2}
              />
            </Grid>
            <Grid size={{ xs: 6 }}>
              <ControlledNumber
                label="Preço (R$)*"
                name="price"
                control={methods.control}
                step={0.01}
                min={0}
              />
            </Grid>
            <Grid size={{ xs: 6 }}>
              <ControlledNumber
                label="Quantidade*"
                name="quantity"
                control={methods.control}
                min={1}
              />
            </Grid>
          </Grid>
        </FormProvider>
      </DialogContent>

      <DialogActions sx={{ p: 2 }}>
        <LoadingButton variant="outlined" color="inherit" onClick={onClose}>
          Cancelar
        </LoadingButton>
        <LoadingButton
          variant="contained"
          color="success"
          loading={loading === 'POST' || loading === 'PUT'}
          loadingIndicator="Salvando..."
          onClick={methods.handleSubmit(submit, callbackOnInvalidZod)}
        >
          Salvar
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
}
