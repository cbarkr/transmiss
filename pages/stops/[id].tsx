import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";

import { defaultStopState } from "@/models/stop";
import { IReportFrom } from "@/interfaces/from";
import { IStopDetails } from "@/interfaces/stop";
import { IDBRes } from "@/interfaces/dbResponse";

const axios = require("axios").default;

const StopDetails = dynamic(
  () => import("../../app/components/stop/stopDetails"),
);
const StopReport = dynamic(
  () => import("../../app/components/stop/stopReport"),
);

export default function Stops() {
  const mounted = useRef(false);
  const router = useRouter();
  const [warning, setWarning] = useState(false);
  const [stop, setStop] = useState<IStopDetails>(defaultStopState);
  const stopID = router.query.id as string;

  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
      fetchStopByID(stopID);
      fetchReportsByStopID(stopID);
    }
  });

  const fetchStopByID = (id: string) => {
    // TODO: Loading bar

    axios
      .get("/api/stops/search", {
        params: {
          stopID: id,
        },
      })
      .then((res: any) => {
        setStop(res.data.data);
      })
      .catch((err: any) => {
        console.error(err);
      });
  };

  const fetchReportsByStopID = (stopID: string) => {
    axios
      .get("/api/report/from", {
        params: {
          StopNo: stopID,
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

  const handleReportSubmit = () => {
    // Redirect home
    router.push('/')
  };

  return (
    <div className="m-2">
      <StopDetails stop={stop} warning={warning} />
      <StopReport stop={stop} handleReportSubmit={handleReportSubmit} />
    </div>
  );
}
