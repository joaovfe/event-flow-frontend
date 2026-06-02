import { useEffect, useState } from 'react';

import {
  MRT_GlobalFilterTextField,
  MRT_TablePagination,
  useMaterialReactTable,
  type MRT_ColumnDef,
  MRT_TableContainer,
  type MRT_RowData,
  MaterialReactTableProps,
} from 'material-react-table';

import { DataTableTranslate } from '@/shared/components/datatable';
import { PaginationParams } from '@/shared/domain';
import { Stack } from '@mui/material';

type IDataTableProps<TData extends MRT_RowData> = Partial<
  MaterialReactTableProps<TData>
> & {
  data: TData[];
  columns: MRT_ColumnDef<TData, unknown>[];
  isLoading?: boolean;
  isRefetching?: boolean;
  isSaving?: boolean;
  size?: 'medium' | 'small';
  error?: any;
  total?: number;
  pagination?: PaginationParams;
  onChangePagination: (params: PaginationParams) => void;
};

export function DataTable<TData extends MRT_RowData>({
  data,
  columns,
  isLoading,
  isRefetching,
  isSaving,
  error,
  total,
  pagination: propsPagination,
  onChangePagination,
  ...props
}: IDataTableProps<TData>) {
  const [sorting, setSorting] = useState(
    propsPagination?.orderBy
      ? [
          {
            id: propsPagination?.orderBy,
            desc: propsPagination?.ordering === 'desc',
          },
        ]
      : [],
  );

  const [pagination, setPagination] = useState({
    pageIndex: propsPagination?.skip ?? 0,
    pageSize: propsPagination?.take ?? 10,
  });

  const table = useMaterialReactTable({
    columns,
    data,
    enableFilters: false,
    enableRowActions: true,
    enableTopToolbar: false,
    enableColumnActions: false,
    initialState: {
      columnPinning: {
        right: ['mrt-row-actions'],
      },
    },

    muiPaginationProps: {
      rowsPerPageOptions: [10, 25, 50],
    },

    localization: {
      ...DataTableTranslate,
      actions: '',
    },

    state: {
      isLoading: isLoading,
      showProgressBars: isRefetching,
      isSaving: isSaving,
      pagination,
      sorting,
    },

    manualSorting: true,
    manualPagination: true,

    rowCount: total,

    onPaginationChange: setPagination,

    onSortingChange: setSorting,

    ...props,
  });

  useEffect(() => {
    onChangePagination({
      skip: pagination.pageIndex,
      take: pagination.pageSize,
      orderBy: sorting.at(0)?.id,
      ordering: sorting.at(0)
        ? sorting.at(0)?.desc
          ? 'desc'
          : 'asc'
        : undefined,
    });
  }, [pagination, sorting]);

  return (
    <Stack gap={2} width="100%">
      <MRT_GlobalFilterTextField table={table} />

      <MRT_TableContainer table={table} />

      <MRT_TablePagination table={table} />
    </Stack>
  );
}
