"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";

import { CircularProgress } from "@mui/material";
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

  const [warning, setWarning] = useState(false);
  const [stop, setStop] = useState<IStopDetails>(defaultStopState);
  const [loading, setLoading] = useState(false);
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
    }
  }, []);

  const fetchStopByID = (id: string) => {
    setLoading(true);

    axios
      .get("/api/stops/search", {
        params: {
          stopID: id,
        },
      })
      .then((res: any) => {
        setStop(res.data.data);
        fetchReportsByStopID(id);
      })
      .catch((err: any) => {
        console.error(err);
        setInvalid(true);
        setInvalidMessage(LocationError.LocationNotFound);
      })
      .finally(() => {
        setLoading(false);
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

  return (
    <div className="mt-2 flex flex-col gap-1">
      {loading && (
        <div className="flex flex-col items-center">
          <CircularProgress color="inherit" />
        </div>
      )}
      {invalid && <StopError error={invalidMessage} />}
      {!loading && !invalid && (
        <>
          <StopDetails stop={stop} warning={warning} />
          <StopReport stop={stop} />
        </>
      )}
    </div>
  );
}
