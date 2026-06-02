import { useMemo, useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Chip, Link, MenuItem, Typography } from '@mui/material';
import { MRT_ColumnDef, MRT_Row } from 'material-react-table';

import { EAuthenticatedPath } from '@/core/router';

import {
  EStatus,
  EStatusTranslate,
  ID,
  IHttpError,
  Pagination,
  ToggleColumns,
} from '@/shared/domain';
import { DataTable, useConfirmDialog } from '@/shared/components';
import { formatErrorForNotification } from '@/shared/utils';

import { UserRepository } from '@/modules/user/repositories';
import { useUserList } from '@/modules/user/contexts';
import { Role } from '@/modules/role/domain';
import { User } from '@/modules/user/domain';

export function UsersListTable() {
  const { params, onChangePagination } = useUserList();

  const { openConfirmDialog } = useConfirmDialog();

  const navigate = useNavigate();

  const repository = new UserRepository();

  const {
    data: users,
    isLoading,
    isRefetching,
    refetch,
  } = useQuery<Pagination<User>, IHttpError>({
    queryKey: ['users', params],
    queryFn: () => repository.list(params),
    refetchOnMount: true,
    refetchOnReconnect: true,
    retryOnMount: true,
    retry: 1,
  });

  function handleEdit(id: ID) {
    navigate(`${EAuthenticatedPath.USERS}/${id}`);
  }

  async function remove(id: ID) {
    try {
      await repository.delete(id);

      toast.success('Usuário excluido com sucesso!');

      refetch();
    } catch (error) {
      toast.error(formatErrorForNotification(error));
    }
  }

  async function handleRemove(userId: ID) {
    const confirm = await openConfirmDialog({
      title: 'Deseja excluir o usuário?',
      description:
        'Você tem certeza que deseja excluir este usuário? Essa é uma ação irreversível.',
    });

    if (confirm) remove(userId);
  }

  const renderRowActionMenuItems = ({ row }: { row: MRT_Row<User> }) => [
    <MenuItem key="edit-user" onClick={() => handleEdit(row.original.id)}>
      Editar Usuário
    </MenuItem>,

    <MenuItem
      key="delete-user"
      onClick={() => {
        handleRemove(row.original.id);
      }}
    >
      Excluir Usuário
    </MenuItem>,
  ];

  const [toggleColumns] = useState<ToggleColumns<User>>({
    name: { label: 'Nome', value: true },
    email: { label: 'Email', value: true },
    role: { label: 'Perfil de Usuário', value: true },
    status: { label: 'Status', value: true },
  });

  const userListTableColumns = useMemo<MRT_ColumnDef<User>[]>(
    () => [
      {
        accessorKey: 'name',
        header: toggleColumns['name']?.label ?? '',
        grow: 1,
        Cell: ({ cell }) => (
          <Typography variant="body1">{cell.getValue<string>()}</Typography>
        ),
      },
      {
        accessorKey: 'email',
        header: toggleColumns['email']?.label ?? '',
        grow: 1,
        Cell: ({ cell }) => {
          const email = cell.getValue<string>();
          return email ? (
            <Link color="success.main" href={`mailto:${email}`}>
              {email}
            </Link>
          ) : (
            '-'
          );
        },
      },
      {
        accessorKey: 'role',
        header: toggleColumns['role']?.label ?? '',
        grow: 1,
        Cell: ({ cell }) => {
          const role = cell.getValue() as Role;
          return (
            <Typography variant="body1">{role ? role.name : '-'}</Typography>
          );
        },
      },
      {
        accessorKey: 'status',
        header: toggleColumns['status']?.label ?? '',
        grow: 5,
        Cell: ({ cell }) => {
          const status = cell.getValue() as EStatus;
          return (
            <Chip
              label={EStatusTranslate[status]}
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
      data={users?.data ?? []}
      columns={userListTableColumns}
      isLoading={isLoading}
      isRefetching={isRefetching}
      renderRowActionMenuItems={renderRowActionMenuItems}
      total={users?.total}
      pagination={params.pagination}
      onChangePagination={onChangePagination}
    />
  );
}
