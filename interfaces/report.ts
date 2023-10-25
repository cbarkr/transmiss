export interface IReport {
  readonly stop_id: number;
  readonly report_type: string;
  readonly bus_id?: number;
  readonly route_id?: number;
  readonly person_count?: number;
};
