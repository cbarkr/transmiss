import { useState } from "react";
import dynamic from "next/dynamic";

import { IReportFrom } from "@/interfaces/from";
import { IStopDetails } from "@/interfaces/stop";

const StopDetails = dynamic(() => import("./stopDetails"));
const StopReport = dynamic(() => import("./stopReport"));

interface IStopSelectedProps {
  stop: IStopDetails;
}

export default function StopSelected({ stop }: IStopSelectedProps) {
  // TODO: Better warnings based off reports
  const [reports, setReports] = useState<IReportFrom[]>([]);
  const [warning, setWarning] = useState(false);

  const handleRetrievedReports = (newReports: IReportFrom[]) => {
    setReports(newReports);

    if (newReports.length > 0) {
      setWarning(true);
    }
  };

  return (
    <div className="m-2">
      {warning}
      <StopDetails stop={stop} warning={warning}/>
      <StopReport stop={stop} handleRetrievedReports={handleRetrievedReports} />
    </div>
  );
}
