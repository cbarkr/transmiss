import { useState, useEffect, useRef } from "react";

import NoTransferIcon from "@mui/icons-material/NoTransfer";
import AirportShuttleIcon from "@mui/icons-material/AirportShuttle";

import { IStopDetails } from "@/interfaces/stop";
import { PeopleCounter } from "../peopleCounter";
import { RouteSelector } from "../routeSelector";
import { ReportButton } from "../reportButton";
import { SubmitButton } from "../submitButton";
import { usePrevious } from "../../hooks/prev";

const axios = require("axios").default;

interface IStopReportProps {
  stop: IStopDetails;
}

export default function StopReport({ stop }: IStopReportProps) {
  // NOTE: full and noShow should be mutually exclusive
  const [full, setFull] = useState(true);
  const [noShow, setNoShow] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [numPeople, setNumPeople] = useState(0);
  const [routeID, setRouteID] = useState("");

  const mounted = useRef(false);
  const previousStop = usePrevious(stop);

  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
    } else {
      if (stop !== previousStop) {
        setFull(true);
        setNoShow(false);
        setSubmitted(false);
        setNumPeople(0);
        setRouteID("");
      }
    }
  }, [stop, previousStop]);

  const updateNumPeople = (newNum: number) => {
    if (!submitted) {
      setNumPeople(newNum);
    }
  };

  const updateRouteID = (newRouteID: string) => {
    if (!submitted) {
      setRouteID(newRouteID);
    }
  };

  const reportNoShow = () => {
    setFull(false);
    setNoShow(true);
  };

  const reportFull = () => {
    setNoShow(false);
    setFull(true);
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
    <>
      <div className="rounded-lg my-1 p-2 max-w-screen-sm bg-gunmetal/10 dark:bg-gunmetal">
        <p className="text-2xl font-bold my-2">Report</p>
        <div className="flex flex-row justify-center rounded-full my-2 bg-primary-200 dark:bg-primary-950">
          <ReportButton
            text="Full"
            icon={<AirportShuttleIcon />}
            disabled={full}
            handler={reportFull}
          />
          <ReportButton
            text="No-Show"
            icon={<NoTransferIcon />}
            disabled={noShow}
            handler={reportNoShow}
          />
        </div>
        {(full || noShow) && (
          <>
            {full && (
              <>
                <p className="text-xl font-bold mb-4">Which bus passed you?</p>
                <RouteSelector
                  routes={stop.Routes}
                  handler={updateRouteID}
                  curr={routeID}
                />
                <p className="text-xl font-bold mb-4">
                  How many people are at this stop? (optional)
                </p>
                <PeopleCounter
                  currNum={numPeople}
                  handler={updateNumPeople}
                  disabled={submitted}
                />
              </>
            )}
            {noShow && (
              <>
                <p className="text-xl font-bold mb-4">
                  Which bus were you expecting?
                </p>
                <RouteSelector
                  routes={stop.Routes}
                  handler={updateRouteID}
                  curr={routeID}
                />
                <p className="text-xl font-bold mb-4">
                  How many people are at this stop? (optional)
                </p>
                <PeopleCounter
                  currNum={numPeople}
                  handler={updateNumPeople}
                  disabled={submitted}
                />
              </>
            )}
            <SubmitButton
              submitted={submitted}
              handler={full ? handleFullSubmit : handleNoShowSubmit}
            />
          </>
        )}
      </div>
    </>
  );
}
