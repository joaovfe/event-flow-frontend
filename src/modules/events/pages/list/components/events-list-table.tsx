import { useMemo } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Chip, MenuItem, Typography } from '@mui/material';
import { MRT_ColumnDef, MRT_Row } from 'material-react-table';

import { EAuthenticatedPath } from '@/core/router';

import { IHttpError, Pagination } from '@/shared/domain';
import { DataTable, useConfirmDialog } from '@/shared/components';
import { formatDate, formatErrorForNotification } from '@/shared/utils';

import { EventRepository } from '@/modules/events/repositories';
import { useEventList } from '@/modules/events/contexts';
import { Event } from '@/modules/events/domain';

export function EventsListTable() {
  const { params, onChangePagination } = useEventList();
  const { openConfirmDialog } = useConfirmDialog();
  const navigate = useNavigate();

  const repository = new EventRepository();

  const {
    data: events,
    isLoading,
    isRefetching,
    refetch,
  } = useQuery<Pagination<Event>, IHttpError>({
    queryKey: ['events', params],
    queryFn: () => repository.list(params),
    refetchOnMount: true,
    retry: 1,
  });

  function handleEdit(id: number) {
    navigate(`${EAuthenticatedPath.EVENTS}/${id}`);
  }

  async function toggleStatus(id: number) {
    try {
      await repository.toggleStatus(id);
      toast.success('Status atualizado com sucesso!');
      refetch();
    } catch (error) {
      toast.error(formatErrorForNotification(error));
    }
  }

  async function remove(id: number) {
    try {
      await repository.delete(id);
      toast.success('Evento excluído com sucesso!');
      refetch();
    } catch (error) {
      toast.error(formatErrorForNotification(error));
    }
  }

  async function handleRemove(id: number) {
    const confirm = await openConfirmDialog({
      title: 'Deseja excluir o evento?',
      description:
        'Você tem certeza que deseja excluir este evento? Essa é uma ação irreversível.',
    });

    if (confirm) remove(id);
  }

  const renderRowActionMenuItems = ({ row }: { row: MRT_Row<Event> }) => [
    <MenuItem key="edit" onClick={() => handleEdit(row.original.id)}>
      Editar Evento
    </MenuItem>,
    <MenuItem key="toggle" onClick={() => toggleStatus(row.original.id)}>
      {row.original.status === 'ACTIVE' ? 'Desativar' : 'Ativar'}
    </MenuItem>,
    <MenuItem key="delete" onClick={() => handleRemove(row.original.id)}>
      Excluir Evento
    </MenuItem>,
  ];

  const columns = useMemo<MRT_ColumnDef<Event>[]>(
    () => [
      {
        accessorKey: 'title',
        header: 'Título',
        grow: 1,
        Cell: ({ cell }) => <Typography variant="body1">{cell.getValue<string>()}</Typography>,
      },
      {
        accessorKey: 'location',
        header: 'Local',
        grow: 1,
      },
      {
        accessorKey: 'startDate',
        header: 'Início',
        Cell: ({ cell }) => formatDate(cell.getValue<string>(), true),
      },
      {
        accessorKey: 'status',
        header: 'Status',
        Cell: ({ cell }) => {
          const value = cell.getValue<string>();
          return (
            <Chip
              size="small"
              label={value === 'ACTIVE' ? 'Ativo' : 'Inativo'}
              color={value === 'ACTIVE' ? 'success' : 'default'}
            />
          );
        },
      },
    ],
    [],
  );

  return (
    <DataTable
      data={events?.data ?? []}
      columns={columns}
      isLoading={isLoading}
      isRefetching={isRefetching}
      renderRowActionMenuItems={renderRowActionMenuItems}
      total={events?.total}
      pagination={params.pagination}
      onChangePagination={onChangePagination}
    />
  );
}
