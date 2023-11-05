import { useState } from "react";
import dynamic from "next/dynamic";

import { IReportFrom } from "@/interfaces/from";
import { IStopDetails } from "@/interfaces/stop";

const StopError = dynamic(() => import("./stopError"));
const StopDetails = dynamic(() => import("./stopDetails"));
const StopReport = dynamic(() => import("./stopReport"));

interface IStopSelectedProps {
  stop: IStopDetails;
}

export default function StopSelected({ stop }: IStopSelectedProps) {
  const [reports, setReports] = useState<IReportFrom[]>([]);

  const handleReports = (reports: IReportFrom[]) => {
    setReports(reports);
  };

  return (
    <div className="m-2">
      {reports.length > 0 && (
        <StopError />
      )}
      <StopDetails stop={stop} />
      <StopReport stop={stop} handleReports={handleReports} />
    </div>
  );
}
