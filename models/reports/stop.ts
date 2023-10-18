import { UUID, randomUUID } from "crypto";

import { Report } from "./report";

interface StopReport extends Report {
  stopID: number;
  personCount: number;
}

export class Stop implements StopReport {
  readonly reportID: UUID;
  readonly reportDatetime: Date;
  stopID: number;
  personCount: number;

  constructor(
    stopID: number,
    personCount: number,
  ) {
    this.reportID = randomUUID();
    this.reportDatetime = new Date();
    this.stopID = stopID; 
    this.personCount = personCount;
  }
}
