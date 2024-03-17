import { useState } from "react";

import { IStopDetails } from "@/interfaces/stop";
import { PeopleCounter } from "../peopleCounter";
import { RouteSelector } from "../routeSelector";
import { SubmitButton } from "../submitButton";
import { ReportSubmittedModal } from "../reportSubmittedModal";

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
    <div className="flex flex-col gap-12 my-2">
      <div className="flex flex-col mt-4 gap-4">
        <p className="text-2xl font-bold">
          1. Which bus passed you?
        </p>
        <RouteSelector
          interactive={true}
          routes={stop.Routes}
          handler={(newRouteID) => setRouteID(newRouteID)}
          curr={routeID}
        />
      </div>
      <div className="flex flex-col gap-4">
        <p className="text-2xl font-bold">
          2. How many people are at this stop?
        </p>
        <PeopleCounter
          currNum={numPeople}
          handler={(newNum) => setNumPeople(newNum)}
        />
      </div>
      <SubmitButton
        disabled={(!routeID || !numPeople)}
        handler={handleFullSubmit}
      />
      <ReportSubmittedModal show={showModal} handler={handleModalClose} />
    </div>
  );
}
