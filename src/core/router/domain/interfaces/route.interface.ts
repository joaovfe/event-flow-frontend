import { ReactNode } from 'react';
import { IndexRouteObject } from 'react-router-dom';

import { EAbilityReference } from '@/modules/role/domain';

export interface IRoute extends Omit<IndexRouteObject, 'index' | 'children'> {
  name: string;
  icon?: ReactNode;
  index?: boolean;
  hidden?: boolean;
  children?: Array<IRoute>;
  ability?: keyof typeof EAbilityReference;
}
