import { IOption } from '../interfaces';

export type ToggleColumns<T> = Partial<Record<keyof T, IOption<boolean>>>;
