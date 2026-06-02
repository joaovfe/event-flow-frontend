import { createContext, PropsWithChildren, useContext, useState } from 'react';

import { PaginationParams } from '@/shared/domain';

import { OrderListDTO, OrderListFiltersDTO } from '../domain';

interface IOrderListParams {
  params: OrderListDTO;
  onChangeFilter: (filter: OrderListFiltersDTO) => void;
  onChangePagination: (pagination: PaginationParams) => void;
}

const OrderListContext = createContext<IOrderListParams | undefined>(undefined);
OrderListContext.displayName = 'OrderListContext';

export function OrderListProvider({ children }: PropsWithChildren) {
  const [params, setParams] = useState<OrderListDTO>({
    filters: {},
    pagination: {
      take: 10,
      skip: 0,
    },
  });

  function onChangeFilter(filters: OrderListFiltersDTO) {
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
    <OrderListContext.Provider value={{ params, onChangeFilter, onChangePagination }}>
      {children}
    </OrderListContext.Provider>
  );
}

export function useOrderList() {
  const context = useContext(OrderListContext);

  if (!context)
    throw new Error('useOrderList deve ser usado dentro de um OrderListProvider');

  return context;
}
