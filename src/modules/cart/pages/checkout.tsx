import { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
  Card,
  CardContent,
  Container,
  Divider,
  Grid2 as Grid,
  Stack,
  Typography,
} from '@mui/material';

import { EPublicPath } from '@/core/router/domain/enums/public-path.enum';
import { ControlledText, LoadingButton } from '@/shared/components';
import { callbackOnInvalidZod, formatCurrency, formatErrorForNotification } from '@/shared/utils';

import { CheckoutFormData, checkoutSchema } from '@/modules/orders/domain';
import { OrderRepository } from '@/modules/orders/repositories';

import { useCart } from '../contexts';

export function CheckoutPage() {
  const navigate = useNavigate();
  const { items, total, clear, applyValidatedCart } = useCart();

  const repository = new OrderRepository();
  const [loading, setLoading] = useState(false);

  const methods = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: { customerName: '', customerEmail: '', customerDocument: '' },
  });

  useEffect(() => {
    if (items.length === 0) navigate(EPublicPath.CART);
  }, [items.length]);

  async function submit(data: CheckoutFormData) {
    if (loading || items.length === 0) return;

    try {
      setLoading(true);

      const cartInput = items.map((item) => ({
        ticketTypeId: item.ticketTypeId,
        quantity: item.quantity,
      }));

      const validated = await repository.validateCart({ items: cartInput });

      const priceChanged = validated.items.some((line) => {
        const cartItem = items.find((i) => i.ticketTypeId === line.ticketTypeId);
        return cartItem && cartItem.price !== line.price;
      });

      if (!validated.valid || priceChanged) {
        applyValidatedCart(validated.items);

        if (!validated.valid) {
          const reasons = validated.items
            .filter((line) => !line.valid)
            .map((line) => line.reason ?? `${line.name}: indisponível`)
            .join(' · ');

          toast.warning(reasons || 'Carrinho inválido. Revise os itens.');
        } else {
          toast.warning('Os preços foram atualizados. Revise o resumo antes de continuar.');
        }

        return;
      }

      const order = await repository.checkout({
        customerName: data.customerName,
        customerEmail: data.customerEmail,
        customerDocument: data.customerDocument || undefined,
        items: cartInput,
      });

      toast.success('Pagamento aprovado!');
      clear();

      navigate(EPublicPath.ORDER_SUCCESS.replace(':uuid', order.uuid));
    } catch (error) {
      toast.error(formatErrorForNotification(error));
    } finally {
      setLoading(false);
    }
  }

  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h4" fontWeight={700} gutterBottom>
        Checkout
      </Typography>

      <Grid container spacing={4} mt={1}>
        <Grid size={{ xs: 12, md: 7 }}>
          <Card variant="outlined">
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Dados do comprador
              </Typography>

              <FormProvider {...methods}>
                <Grid container spacing={2} mt={0}>
                  <Grid size={{ xs: 12 }}>
                    <ControlledText label="Nome*" name="customerName" control={methods.control} />
                  </Grid>
                  <Grid size={{ xs: 12 }}>
                    <ControlledText
                      label="E-mail*"
                      name="customerEmail"
                      control={methods.control}
                    />
                  </Grid>
                  <Grid size={{ xs: 12 }}>
                    <ControlledText
                      label="CPF"
                      name="customerDocument"
                      control={methods.control}
                      mask="000.000.000-00"
                    />
                  </Grid>
                </Grid>
              </FormProvider>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, md: 5 }}>
          <Card variant="outlined">
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Resumo do pedido
              </Typography>

              <Stack spacing={1} divider={<Divider flexItem />}>
                {items.map((item) => (
                  <Stack key={item.ticketTypeId} direction="row" justifyContent="space-between">
                    <Typography variant="body2">
                      {item.quantity}x {item.ticketTypeName}
                    </Typography>
                    <Typography variant="body2">
                      {formatCurrency(item.price * item.quantity)}
                    </Typography>
                  </Stack>
                ))}
              </Stack>

              <Divider sx={{ my: 2 }} />

              <Stack direction="row" justifyContent="space-between" mb={2}>
                <Typography variant="h6">Total</Typography>
                <Typography variant="h6">{formatCurrency(total)}</Typography>
              </Stack>

              <LoadingButton
                fullWidth
                variant="contained"
                color="success"
                size="large"
                loading={loading}
                loadingIndicator="Processando..."
                onClick={methods.handleSubmit(submit, callbackOnInvalidZod)}
              >
                Finalizar compra
              </LoadingButton>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}
