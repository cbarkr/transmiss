import { useState, useEffect, useRef, useContext } from "react";
import dynamic from "next/dynamic";

import { IReportFrom } from "@/interfaces/from";
import { IStopDetails } from "@/interfaces/stop";
import { IDBRes } from "@/interfaces/dbResponse";
import { StopSetContext } from "@/context/stop";
import { Active } from "@/enums/activeComponent";

const StopDetails = dynamic(() => import("./stopDetails"));
const StopReport = dynamic(() => import("./stopReport"));

const axios = require("axios").default;

interface IStopSelectedProps {
  stop: IStopDetails;
}

export default function StopSelected({ stop }: IStopSelectedProps) {
  // TODO: Better warnings based off reports
  const [warning, setWarning] = useState(false);
  const [showReportMenu, setShowReportMenu] = useState(false);
  const { setActive } = useContext(StopSetContext);

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

  const handleShowReportMenu = () => {
    setShowReportMenu(!showReportMenu);
  }

  const handleReportSubmit = () => {
    setActive(Active.Default);
  };

  return (
    <div className="m-2">
      <StopDetails stop={stop} warning={warning} selected={true} showReportMenu={showReportMenu} handleShowReportMenu={handleShowReportMenu}/>
      {showReportMenu && <StopReport stop={stop} handleReportSubmit={handleReportSubmit} />}
    </div>
  );
}
