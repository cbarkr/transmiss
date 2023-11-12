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
  const [full, setFull] = useState(true);
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

  const handleFullSubmit = () => {
    postReport("/api/report/bus");
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
    <div className="rounded-lg my-1 p-2 max-w-screen-sm bg-gunmetal/10 dark:bg-gunmetal">
      {full && (
        <>
          <div className="mb-4">
            <p className="text-xl font-bold mb-4">Which bus passed you?</p>
            <RouteSelector
              routes={stop.Routes}
              handler={updateRouteID}
              curr={routeID}
            />
          </div>
          <div className="mb-4">
            <p className="text-xl font-bold mb-4">
              How many people are at this stop? (optional)
            </p>
            <PeopleCounter
              currNum={numPeople}
              handler={updateNumPeople}
              disabled={submitted}
            />
          </div>
        </>
      )}
      <SubmitButton submitted={submitted} handler={handleFullSubmit} />
    </div>
  );
}
