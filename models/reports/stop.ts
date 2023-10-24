import { UUID, randomUUID } from "crypto";

import { IReport } from "../../interfaces/report";

interface StopReport extends IReport {
  stopID: number;
  personCount: number;
}

export class Stop implements StopReport {
  readonly reportID: UUID;
  readonly reportDatetime: string;
  stopID: number;
  personCount: number;

  constructor(stopID: number, personCount: number) {
    this.reportID = randomUUID();
    this.reportDatetime = new Date().toUTCString();
    this.stopID = stopID;
    this.personCount = personCount;
  }
}
