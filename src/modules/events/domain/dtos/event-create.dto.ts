import { EEventStatus } from '../entities';

export interface EventCreateDTO {
  title: string;
  description: string;
  image?: string;
  location: string;
  startDate: string;
  endDate: string;
  status?: EEventStatus;
}

export interface EventUpdateDTO extends EventCreateDTO {}
