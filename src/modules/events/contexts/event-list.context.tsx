import { createContext, PropsWithChildren, useContext, useState } from 'react';

import { PaginationParams } from '@/shared/domain';

import { EventListDTO, EventListFiltersDTO } from '../domain';

interface IEventListParams {
  params: EventListDTO;
  onChangeFilter: (filter: EventListFiltersDTO) => void;
  onChangePagination: (pagination: PaginationParams) => void;
}

const EventListContext = createContext<IEventListParams | undefined>(undefined);
EventListContext.displayName = 'EventListContext';

export function EventListProvider({ children }: PropsWithChildren) {
  const [params, setParams] = useState<EventListDTO>({
    filters: {},
    pagination: {
      take: 10,
      skip: 0,
    },
  });

  function onChangeFilter(filters: EventListFiltersDTO) {
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
    <EventListContext.Provider
      value={{
        params,
        onChangeFilter,
        onChangePagination,
      }}
    >
      {children}
    </EventListContext.Provider>
  );
}

export function useEventList() {
  const context = useContext(EventListContext);

  if (!context)
    throw new Error('useEventList deve ser usado dentro de um EventListProvider');

  return context;
}
