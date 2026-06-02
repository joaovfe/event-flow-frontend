import { createContext, PropsWithChildren, useContext, useState } from 'react';

import { PaginationParams } from '@/shared/domain';

import { UserListDTO, UserListFiltersDTO } from '../domain/dtos/user-list.dto';

interface IUserListParams {
  params: UserListDTO;
  onChangeFilter: (filter: UserListFiltersDTO) => void;
  onChangePagination: (pagination: PaginationParams) => void;
}

const UserListContext = createContext<IUserListParams | undefined>(undefined);
UserListContext.displayName = 'UserListContext';

export function UserListProvider({ children }: PropsWithChildren) {
  const [params, setParams] = useState<UserListDTO>({
    filters: {},
    pagination: {
      take: 10,
      skip: 0,
    },
  });

  function onChangeFilter(filters: UserListFiltersDTO) {
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
    <UserListContext.Provider
      value={{
        params,
        onChangeFilter,
        onChangePagination,
      }}
    >
      {children}
    </UserListContext.Provider>
  );
}

export function useUserList() {
  const context = useContext(UserListContext);

  if (!context)
    throw new Error('useUserList deve ser usado dentro de um UserListProvider');

  return context;
}
