import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Chip, MenuItem, Typography } from '@mui/material';
import { MRT_ColumnDef, MRT_Row } from 'material-react-table';

import { EAuthenticatedPath } from '@/core/router';

import { IHttpError, Pagination } from '@/shared/domain';
import { DataTable } from '@/shared/components';
import { formatCurrency, formatDate } from '@/shared/utils';

import { OrderRepository } from '@/modules/orders/repositories';
import { useOrderList } from '@/modules/orders/contexts';
import { EOrderStatus, Order, ORDER_STATUS_COLOR, ORDER_STATUS_LABEL } from '@/modules/orders/domain';

export function OrdersListTable() {
  const { params, onChangePagination } = useOrderList();
  const navigate = useNavigate();

  const repository = new OrderRepository();

  const {
    data: orders,
    isLoading,
    isRefetching,
  } = useQuery<Pagination<Order>, IHttpError>({
    queryKey: ['orders', params],
    queryFn: () => repository.list(params),
    refetchOnMount: true,
    retry: 1,
  });

  function handleOpen(id: number) {
    navigate(`${EAuthenticatedPath.ORDERS}/${id}`);
  }

  const renderRowActionMenuItems = ({ row }: { row: MRT_Row<Order> }) => [
    <MenuItem key="open" onClick={() => handleOpen(row.original.id)}>
      Ver Pedido
    </MenuItem>,
  ];

  const columns = useMemo<MRT_ColumnDef<Order>[]>(
    () => [
      {
        accessorKey: 'customerName',
        header: 'Cliente',
        grow: 1,
        Cell: ({ cell }) => <Typography variant="body1">{cell.getValue<string>()}</Typography>,
      },
      {
        accessorKey: 'customerEmail',
        header: 'E-mail',
        grow: 1,
      },
      {
        accessorKey: 'total',
        header: 'Total',
        Cell: ({ cell }) => formatCurrency(cell.getValue<number>()),
      },
      {
        accessorKey: 'status',
        header: 'Status',
        Cell: ({ cell }) => {
          const value = cell.getValue<EOrderStatus>();
          return (
            <Chip size="small" label={ORDER_STATUS_LABEL[value]} color={ORDER_STATUS_COLOR[value]} />
          );
        },
      },
      {
        accessorKey: 'createdAt',
        header: 'Data',
        Cell: ({ cell }) => formatDate(cell.getValue<string>(), true),
      },
    ],
    [],
  );

  return (
    <DataTable
      data={orders?.data ?? []}
      columns={columns}
      isLoading={isLoading}
      isRefetching={isRefetching}
      renderRowActionMenuItems={renderRowActionMenuItems}
      total={orders?.total}
      pagination={params.pagination}
      onChangePagination={onChangePagination}
    />
  );
}
