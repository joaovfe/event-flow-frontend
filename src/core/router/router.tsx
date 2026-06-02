import { useMemo } from 'react';
import { useRoutes } from 'react-router-dom';

import { Authenticated, Unauthenticated, Public } from '@shared/layout';

import { AUTHENTICATED_ROUTES, UNAUTHENTICATED_ROUTES, PUBLIC_ROUTES } from './routes';
import { RequiredAuth, GuestOnly } from './hocs';
import { toRouter } from './mappers';

export function Router() {
  const { authenticatedRoutes, unauthenticatedRoutes, publicRoutes } = useMemo(
    () => ({
      authenticatedRoutes: toRouter(AUTHENTICATED_ROUTES),
      unauthenticatedRoutes: toRouter(UNAUTHENTICATED_ROUTES),
      publicRoutes: toRouter(PUBLIC_ROUTES),
    }),
    [],
  );

  return useRoutes([
    {
      element: <Public />,
      children: publicRoutes,
    },
    {
      element: <GuestOnly />,
      children: [
        {
          element: <Unauthenticated />,
          children: unauthenticatedRoutes,
        },
      ],
    },
    {
      element: <RequiredAuth />,
      children: [
        {
          element: <Authenticated />,
          children: authenticatedRoutes,
        },
      ],
    },
  ]);
}
