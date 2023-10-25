import { randomUUID } from "crypto";

import { IReport } from "@/interfaces/report";

export class Report implements IReport {
  report_id: string;
  datetime: string;
  stop_id: number;
  report_type: string;
  bus_id?: number;
  route_id?: number;
  person_count?: number;

  constructor(params: IReport) {
    this.report_id = randomUUID();
    this.datetime = new Date().toISOString();
    this.stop_id = params.stop_id;
    this.report_type = params.report_type;
    this.bus_id = params.bus_id;
    this.route_id = params.route_id;
    this.person_count = params.person_count;
  }
}
