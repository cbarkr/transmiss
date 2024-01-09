"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";

import { defaultStopState } from "@/models/stop";
import { IReportFrom } from "@/interfaces/from";
import { IStopDetails } from "@/interfaces/stop";
import { IDBRes } from "@/interfaces/dbResponse";
import { LocationError } from "@/enums/errors";
import stopIDIsValid from "@/utils/validate";
import StopError from "@/app/components/stop/stopError";

const axios = require("axios").default;

const StopDetails = dynamic(() => import("../../components/stop/stopDetails"));
const StopReport = dynamic(() => import("../../components/stop/stopReport"));

export default function Stops({ params }: { params: { id: string } }) {
  const router = useRouter();

  const [warning, setWarning] = useState(false);
  const [stop, setStop] = useState<IStopDetails>(defaultStopState);
  const [invalid, setInvalid] = useState(false);
  const [invalidMessage, setInvalidMessage] = useState("");

  const stopID = params.id;

  useEffect(() => {
    if (!stopIDIsValid(stopID)) {
      setInvalid(true);
      setInvalidMessage(LocationError.LocationNotFound);
      return;
    } else {
      fetchStopByID(stopID);
      fetchReportsByStopID(stopID);
    }
  }, []);

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
        setInvalid(true);
        setInvalidMessage(LocationError.LocationNotFound);
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
    router.push("/");
  };

  return (
    <div className="mt-2 flex flex-col gap-1">
      {invalid && <StopError error={invalidMessage} />}
      {!invalid && (
        <>
          <StopDetails stop={stop} warning={warning} />
          <StopReport stop={stop} handleReportSubmit={handleReportSubmit} />
        </>
      )}
    </div>
  );
}
