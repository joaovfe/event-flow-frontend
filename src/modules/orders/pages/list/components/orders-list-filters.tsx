import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import Grid from '@mui/material/Grid2';

import { ControlledDebounce } from '@/shared/components';
import { ControlledEnum } from '@/shared/components/fields';

import { useOrderList } from '@/modules/orders/contexts';
import { EOrderStatus, OrderListFiltersDTO } from '@/modules/orders/domain';

const STATUS_OPTIONS = {
  Pendente: 'PENDING',
  Pago: 'PAID',
  Cancelado: 'CANCELLED',
};

export function OrdersListFilters() {
  const { onChangeFilter } = useOrderList();
  const { control, watch } = useForm<OrderListFiltersDTO>();

  const search = watch('search');
  const status = watch('status');

  useEffect(() => {
    onChangeFilter({ search, status: (status as EOrderStatus) || undefined });
  }, [search, status]);

  return (
    <Grid container width="100%" spacing={2}>
      <Grid size={{ sm: 6, xs: 12 }}>
        <ControlledDebounce label="Procurar" name="search" control={control} />
      </Grid>

      <Grid size={{ sm: 6, xs: 12 }}>
        <ControlledEnum label="Status" name="status" control={control} options={STATUS_OPTIONS} />
      </Grid>
    </Grid>
  );
}
