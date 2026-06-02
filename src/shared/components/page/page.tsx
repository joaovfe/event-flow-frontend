import { Fragment, PropsWithChildren } from 'react';

export function Page({ children }: PropsWithChildren) {
  return <Fragment>{children}</Fragment>;
}
