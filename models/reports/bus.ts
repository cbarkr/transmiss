import { UUID, randomUUID } from "crypto";

import { IReport } from "../../interfaces/report";

interface BusReport extends IReport {
  stopID: number;
  busID?: number;
  routeID?: number;
  personCount?: number;
}

export class Bus implements BusReport {
  readonly reportID: UUID;
  readonly reportDatetime: string;
  stopID: number;
  busID?: number;
  routeID?: number;
  personCount?: number;

  constructor(
    stopID: number,
    busID?: number,
    routeID?: number,
    personCount?: number
  ) {
    this.reportID = randomUUID();
    this.reportDatetime = new Date().toUTCString();
    this.stopID = stopID;

    if (busID) this.busID = busID;
    if (routeID) this.routeID = routeID;
    if (personCount) this.personCount = personCount;
  }
}
