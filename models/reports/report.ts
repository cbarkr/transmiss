import { UUID } from "crypto";

export interface Report {
  readonly reportID: UUID;
  readonly reportDatetime: string;
}
