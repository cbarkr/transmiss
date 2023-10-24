import { UUID } from "crypto";

export interface IReport {
  readonly reportID: UUID;
  readonly reportDatetime: string;
}
