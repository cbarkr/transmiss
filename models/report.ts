import { randomUUID } from "crypto";

import { IReport } from "@/interfaces/report";

export class Report implements IReport {
  report_id: string;
  report_datetime: string;
  stop_id: number;
  report_type: string;
  bus_id?: number;
  route_id?: string;
  person_count?: number;

  constructor(params: IReport) {
    this.report_id = randomUUID();
    this.report_datetime = new Date().toISOString();
    this.stop_id = params.stop_id;
    this.report_type = params.report_type;
    this.bus_id = params.bus_id;
    this.route_id = params.route_id;
    this.person_count = params.person_count;
  }
}
