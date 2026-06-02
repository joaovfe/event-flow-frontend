import { UUID } from "crypto";

export class BaseEntity {
  uuid: UUID = '' as UUID;

  createdAt?: string;
  updatedAt?: string;
  deletedAt?: string;
}