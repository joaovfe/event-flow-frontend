import { createContext, PropsWithChildren, useContext, useState } from 'react';

import { PaginationParams } from '@/shared/domain';

import { RoleListFilterDTO, RoleListDTO } from '../domain';

type RoleListProviderProps = PropsWithChildren & {};

interface IRoleListParams {
  params: RoleListDTO;
  onChangeFilter: (filter: RoleListFilterDTO) => void;
  onChangePagination: (pagination: PaginationParams) => void;
}

const RoleListContext = createContext<IRoleListParams | undefined>(undefined);
RoleListContext.displayName = 'RoleListContext';

export function RoleListProvider({ children }: RoleListProviderProps) {
  const [params, setParams] = useState<RoleListDTO>({
    filters: {},
    pagination: {
      take: 10,
      skip: 0,
    },
  });

  function onChangeFilter(filters: RoleListFilterDTO) {
    setParams((prev) => ({
      ...prev,
      filters: {
        ...prev.filters,
        ...filters,
      },
      pagination: {
        ...prev.pagination,
        skip: 0,
      },
    }));
  }

  function onChangePagination(pagination: PaginationParams) {
    setParams((prev) => ({
      ...prev,
      pagination,
    }));
  }

  return (
    <RoleListContext.Provider
      value={{
        params,
        onChangeFilter,
        onChangePagination,
      }}
    >
      {children}
    </RoleListContext.Provider>
  );
}

export function useRoleList() {
  const context = useContext(RoleListContext);

  if (!context) {
    throw new Error(
      'useRoleListContext deve ser usado dentro de um RoleListProvider',
    );
  }

  return context;
}
