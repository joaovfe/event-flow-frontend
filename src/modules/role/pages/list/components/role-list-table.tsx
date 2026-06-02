import { useMemo, useState } from 'react';
import { MenuItem, Chip, Typography, Stack } from '@mui/material';
import { MRT_Row, type MRT_ColumnDef } from 'material-react-table';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { toast } from 'react-toastify';

import { EAuthenticatedPath } from '@/core/router';

import {
  ERoleReference,
  ERoleReferenceTranslate,
  Role,
} from '@/modules/role/domain';
import {
  EStatus,
  ID,
  IHttpError,
  Pagination,
  ToggleColumns,
} from '@/shared/domain';
import { DataTable, useConfirmDialog } from '@/shared/components';
import { formatErrorForNotification } from '@/shared/utils';

import { RoleRepository } from '@/modules/role/repositories';
import { useRoleList } from '@/modules/role/contexts';

export function RoleListTable() {
  const { params, onChangePagination } = useRoleList();

  const { openConfirmDialog } = useConfirmDialog();

  const navigate = useNavigate();

  const repository = new RoleRepository();

  const {
    data: roles,
    isLoading,
    isRefetching,
    refetch,
  } = useQuery<Pagination<Role>, IHttpError>({
    queryKey: ['roles', params],
    queryFn: () => repository.list(params),
    refetchOnMount: true,
    refetchOnReconnect: true,
    retryOnMount: true,
    retry: 1,
  });

  function handleEdit(id: number) {
    navigate(`${EAuthenticatedPath.ROLES}/${id}`);
  }

  async function handleRemove(id: ID) {
    const confirm = await openConfirmDialog({
      title: 'Deseja excluir o perfil de usuário?',
      description:
        'Você tem certeza que deseja excluir este perfil de usuário? Essa é uma ação irreversível.',
    });

    if (confirm) remove(id);
  }

  async function remove(id: ID) {
    try {
      await repository.delete(id);

      toast.success('Perfil de usuário excluido com sucesso!');

      refetch();
    } catch (error) {
      toast.error(formatErrorForNotification(error));
    }
  }

  const renderRowActionMenuItems = ({ row }: { row: MRT_Row<Role> }) => [
    <MenuItem key="edit-role" onClick={() => handleEdit(row.original.id)}>
      Editar Perfil de Usuário
    </MenuItem>,
    <MenuItem key="remove-role" onClick={() => handleRemove(row.original.id)}>
      Excluir Perfil de Usuário
    </MenuItem>,
  ];

  const [toggleColumns] = useState<ToggleColumns<Role>>({
    name: { label: 'Nome', value: true },
    status: { label: 'Status', value: true },
    reference: { label: 'Permissões', value: true },
  });

  const roleListTableColumns = useMemo<MRT_ColumnDef<Role>[]>(
    () => [
      {
        accessorKey: 'name',
        header: toggleColumns['name']?.label ?? '',
        accessorFn: (role) => role,
        Cell: ({ cell }) => {
          const { name } = cell.getValue() as Role;
          return (
            <Stack flexDirection={'row'} gap={'12px'}>
              <Typography variant="body1">{name}</Typography>
            </Stack>
          );
        },
      },

      {
        accessorKey: 'reference',
        header: toggleColumns['reference']?.label ?? '',
        accessorFn: ({ reference }) => reference,
        Cell: ({ cell }) => {
          const reference = cell.getValue() as ERoleReference;
          return (
            <Typography variant="body1">
              {ERoleReferenceTranslate[reference]}
            </Typography>
          );
        },
      },
      {
        accessorKey: 'status',
        header: toggleColumns['status']?.label ?? '',
        accessorFn: ({ status }) => status,
        Cell: ({ cell }) => {
          const status = cell.getValue() as EStatus;
          return (
            <Chip
              label={status === EStatus.ACTIVE ? 'Ativo' : 'Inativo'}
              variant="outlined"
              color={status === EStatus.ACTIVE ? 'success' : 'error'}
              size="small"
            />
          );
        },
      },
    ],

    [],
  );

  return (
    <DataTable
      data={roles?.data ?? []}
      columns={roleListTableColumns}
      isLoading={isLoading}
      isRefetching={isRefetching}
      renderRowActionMenuItems={renderRowActionMenuItems}
      total={roles?.total}
      pagination={params.pagination}
      onChangePagination={onChangePagination}
    />
  );
}
