import { useState, useEffect, useRef } from "react";
import { IStopDetails } from "@/interfaces/stop";
import { PeopleCounter } from "../peopleCounter";
import { RouteSelector } from "../routeSelector";
import { SubmitButton } from "../submitButton";
import { usePrevious } from "../../hooks/prev";

const axios = require("axios").default;

interface IStopReportProps {
  stop: IStopDetails;
}

export default function StopReport({ stop }: IStopReportProps) {
  const [full, setFull] = useState(true);
  const [numPeople, setNumPeople] = useState(0);
  const [routeID, setRouteID] = useState("");

  const mounted = useRef(false);
  const previousStop = usePrevious(stop);

  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
    } else {
      if (stop !== previousStop) {
        resetState();
      }
    }
  }, [stop, previousStop]);

  const resetState = () => {
    setFull(true);
    setNumPeople(0);
    setRouteID("");
  }

  const handleFullSubmit = () => {
    postReport("/api/report/bus");
    resetState();
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
      });
  };

  return (
    <div className="rounded-3xl my-1 p-2 max-w-screen-sm bg-gunmetal/10 dark:bg-gunmetal">
      {full && (
        <>
          <div className="rounded-3xl mb-4 p-2">
            <p className="text-lg font-bold mb-4">Which bus passed you?</p>
            <RouteSelector
              routes={stop.Routes}
              handler={(newRouteID) => setRouteID(newRouteID)}
              curr={routeID}
            />
          </div>
          <div className="rounded-3xl mb-4 p-2">
            <p className="text-lg font-bold mb-4">
              About how many people are at this stop?
            </p>
            <PeopleCounter
              currNum={numPeople}
              handler={(newNum) => setNumPeople(newNum)}
            />
          </div>
        </>
      )}
      <SubmitButton disabled={routeID.length === 0} handler={handleFullSubmit} />
    </div>
  );
}
