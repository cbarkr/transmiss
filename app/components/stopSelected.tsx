import { useState, useEffect, useRef } from "react";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import GroupsIcon from "@mui/icons-material/Groups";
import NoTransferIcon from "@mui/icons-material/NoTransfer";
import AirportShuttleIcon from "@mui/icons-material/AirportShuttle";
import dynamic from "next/dynamic";

import { PeopleCounter } from "./peopleCounter";
import { RouteSelector } from "./routeSelector";
import { ReportButton } from "./reportButton";
import { SubmitButton } from "./submitButton";
import { usePrevious } from "../hooks/prev";
import { IStopDetails } from "@/interfaces/stop";
import { IReportFrom } from "@/interfaces/from";

const StopDetails = dynamic(() => import("./stopDetails"));

const axios = require("axios").default;

interface IStopSelectedProps {
  stop: IStopDetails;
}

export default function StopSelected({ stop }: IStopSelectedProps) {
  // NOTE: crowded and full should be mutually exclusive
  const [crowded, setCrowded] = useState(false);
  const [full, setFull] = useState(false);
  const [noShow, setNoShow] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [numPeople, setNumPeople] = useState(0);
  const [routeID, setRouteID] = useState("");
  const [reports, setReports] = useState<IReportFrom[]>([]);

  const mounted = useRef(false);
  const previousStop = usePrevious(stop);

  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
      getReports();
    } else {
      if (stop !== previousStop) {
        setFull(false);
        setCrowded(false);
        setNoShow(false);
        setSubmitted(false);
        setNumPeople(0);
        setRouteID("");
      }
    }
  }, [stop, previousStop, reports]);

  const updateNumPeople = (newNum: number) => {
    setNumPeople(newNum);
  };

  const updateRouteID = (newRouteID: string) => {
    setRouteID(newRouteID);
  };

  const reportCrowded = () => {
    setFull(false);
    setNoShow(false);
    setCrowded(true);
  };

  const reportNoShow = () => {
    setCrowded(false);
    setFull(false);
    setNoShow(true);
  };

  const reportFull = () => {
    setCrowded(false);
    setNoShow(false);
    setFull(true);
  };

  const getReports = () => {
    axios
      .get("/api/report/from", {
        params: {
          StopNo: stop.StopNo,
        },
      })
      .then((res: any) => {
        setReports(res.data.data);
      })
      .catch((err: any) => {
        console.error(err);
      });
  };

  const handleCrowdedSubmit = () => {
    postReport("/api/report/stop");
  };

  const handleFullSubmit = () => {
    postReport("/api/report/bus");
  };

  const handleNoShowSubmit = () => {
    postReport("/api/report/noshow");
  };

  const postReport = (url: string) => {
    axios
      .post(url, {
        stop_id: stop.StopNo,
        person_count: numPeople,
        route_id: routeID,
      })
      .then((res: any) => {
        console.log(res);
      })
      .catch((err: any) => {
        console.error(err);
      })
      .finally(() => {
        setSubmitted(true);
      });
  };

  return (
    <div className="m-2">
      {reports.length > 0 && (
        <div className="flex flex-row items-center rounded-lg my-1 p-2 bg-reds-800/90">
          <ErrorOutlineIcon sx={{ color: "white" }} />
          <p className="mx-2 text-white">
            Others have reported issues with this stop within the last hour.
            Submit a report to help!
          </p>
        </div>
      )}
      <StopDetails stop={stop} />
      <div className="rounded-lg my-1 p-2 max-w-screen-sm bg-primary-200 dark:bg-primary-950">
        <p className="font-bold my-2">Report</p>
        {(!crowded || !noShow || !full) && (
          <div className="flex flex-col sm:flex-row justify-center">
            <ReportButton
              text="Crowded"
              icon={<GroupsIcon />}
              bgColourLight="bg-primary-950"
              bgColourDark="dark:bg-primary-200"
              textColourLight="text-primary-200"
              textColourDark="dark:text-primary-950"
              disabled={crowded}
              handler={reportCrowded}
            />
            <ReportButton
              text="No Show"
              icon={<NoTransferIcon />}
              bgColourLight="bg-yellows-500/75"
              bgColourDark="dark:bg-yellows-500"
              textColourLight="text-yellows-950"
              disabled={noShow}
              handler={reportNoShow}
            />
            <ReportButton
              text="Bus Full"
              icon={<AirportShuttleIcon />}
              bgColourLight="bg-reds-800"
              bgColourDark="dark:bg-reds-800"
              textColourLight="text-reds-50"
              disabled={full}
              handler={reportFull}
            />
          </div>
        )}
      </div>
      {(crowded || noShow || full) && (
        <div className="rounded-lg my-1 p-2 max-w-screen-sm bg-secondary-200 dark:bg-secondary-950">
          <p className="font-bold my-2">Report Details</p>
          {crowded && (
            <>
              <div className="flex flex-row justify-between items-center">
                <p>How many people are at this stop?</p>
                <PeopleCounter
                  currNum={numPeople}
                  handler={updateNumPeople}
                  disabled={submitted}
                />
              </div>
            </>
          )}
          {noShow && (
            <>
              <div className="flex flex-row justify-between items-center my-2">
                <p>Which bus were you expecting?</p>
                <RouteSelector
                  routes={stop.Routes}
                  handler={updateRouteID}
                  curr={routeID}
                />
              </div>
              <div className="flex flex-row justify-between items-center my-2">
                <p>How many people are at this stop? (optional)</p>
                <PeopleCounter
                  currNum={numPeople}
                  handler={updateNumPeople}
                  disabled={submitted}
                />
              </div>
            </>
          )}
          {full && (
            <>
              <div className="flex flex-row justify-between items-center my-2">
                <p>Which bus passed you?</p>
                <RouteSelector
                  routes={stop.Routes}
                  handler={updateRouteID}
                  curr={routeID}
                />
              </div>
              <div className="flex flex-row justify-between items-center my-2">
                <p>How many people are at this stop? (optional)</p>
                <PeopleCounter
                  currNum={numPeople}
                  handler={updateNumPeople}
                  disabled={submitted}
                />
              </div>
            </>
          )}
        </div>
      )}
      {(crowded || noShow || full) && (
        <>
          {crowded && numPeople > 0 && (
            <div className="rounded-lg my-1 p-2 max-w-screen-sm bg-greens-200 dark:bg-greens-950">
              <SubmitButton
                submitted={submitted}
                handler={handleCrowdedSubmit}
              />
            </div>
          )}
          {noShow && routeID !== "" && (
            <div className="rounded-lg my-1 p-2 max-w-screen-sm bg-greens-200 dark:bg-greens-950">
              <SubmitButton
                submitted={submitted}
                handler={handleNoShowSubmit}
              />
            </div>
          )}
          {full && routeID !== "" && (
            <div className="rounded-lg my-1 p-2 max-w-screen-sm bg-greens-200 dark:bg-greens-950">
              <SubmitButton submitted={submitted} handler={handleFullSubmit} />
            </div>
          )}
        </>
      )}
    </div>
  );
}
