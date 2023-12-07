import { useState, useEffect, useRef } from "react";

import { IStopDetails } from "@/interfaces/stop";
import { PeopleCounter } from "../peopleCounter";
import { RouteSelector } from "../routeSelector";
import { SubmitButton } from "../submitButton";
import { ReportSubmittedModal } from "../reportSubmittedModal";
import { usePrevious } from "../../hooks/prev";

const axios = require("axios").default;

interface IStopReportProps {
  stop: IStopDetails;
  handleReportSubmit: () => void;
}

export default function StopReport({
  stop,
  handleReportSubmit,
}: IStopReportProps) {
  const [numPeople, setNumPeople] = useState(0);
  const [routeID, setRouteID] = useState("");
  const [showModal, setShowModal] = useState(false);

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
    setNumPeople(0);
    setRouteID("");
    setShowModal(false);
  };

  const handleFullSubmit = () => {
    postReport("/api/report/bus");
    setShowModal(true);
  };

  const handleModalClose = () => {
    resetState();
    handleReportSubmit();
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
    <div className="rounded-3xl my-1 p-4 max-w-screen-sm bg-primary-200">
      <div className="mb-4">
        <p className="text-lg text-black font-bold mb-2">
          Which bus passed you?
        </p>
        <RouteSelector
          routes={stop.Routes}
          handler={(newRouteID) => setRouteID(newRouteID)}
          curr={routeID}
        />
      </div>
      <div className="mb-4">
        <p className="text-lg text-black font-bold mb-2">
          Roughly how many people are at this stop?
        </p>
        <PeopleCounter
          currNum={numPeople}
          handler={(newNum) => setNumPeople(newNum)}
        />
      </div>
      <SubmitButton
        disabled={routeID.length === 0}
        handler={handleFullSubmit}
      />
      <ReportSubmittedModal show={showModal} handler={handleModalClose} />
    </div>
  );
}
