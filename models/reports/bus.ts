import { UUID, randomUUID } from "crypto";

import { Report } from "./report";

interface BusReport extends Report {
  stopID: number;
  busID?: number;
  routeID?: number;
  personCount?: number;
}

export class Bus implements BusReport {
  readonly reportID: UUID;
  readonly reportDatetime: Date;
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
    this.reportDatetime = new Date();
    this.stopID = stopID;

    if (busID) this.busID = busID;
    if (routeID) this.routeID = routeID;
    if (personCount) this.personCount = personCount;
  }
}
