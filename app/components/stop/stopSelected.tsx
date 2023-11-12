import { useState, useEffect, useRef } from "react";
import dynamic from "next/dynamic";

import { IReportFrom } from "@/interfaces/from";
import { IStopDetails } from "@/interfaces/stop";
import { IDBRes } from "@/interfaces/dbResponse";

const StopDetails = dynamic(() => import("./stopDetails"));
const StopReport = dynamic(() => import("./stopReport"));

const axios = require("axios").default;

interface IStopSelectedProps {
  stop: IStopDetails;
}

export default function StopSelected({ stop }: IStopSelectedProps) {
  // TODO: Better warnings based off reports
  const [warning, setWarning] = useState(false);

  const mounted = useRef(false);

  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
      getReports();
    }
  });

  const getReports = () => {
    axios
      .get("/api/report/from", {
        params: {
          StopNo: stop.StopNo,
        },
      })
      .then((res: IDBRes) => {
        const reports = res.data.data as IReportFrom[];

        if (reports.length > 0) {
          setWarning(true);
        }
      })
      .catch((err: any) => {
        console.error(err);
      });
  };

  return (
    <div className="m-2">
      <StopDetails stop={stop} warning={warning} />
      <StopReport stop={stop} />
    </div>
  );
}
