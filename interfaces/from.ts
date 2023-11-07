export interface IReportFrom {
  readonly stop_id: number;
  readonly report_type: string;
  readonly report_datetime: string;
  readonly route_id?: string;
}
