import { ReactNode } from 'react';
import { EAbilityReference } from '@/modules/role/domain';

interface ItemChildren {
  name: string;
  path: string;
  ability?: keyof typeof EAbilityReference;
}

export interface ISidebarItem {
  icon: ReactNode;
  name: string;
  path: string;
  ability?: keyof typeof EAbilityReference;
  children?: Array<ItemChildren>;
}
