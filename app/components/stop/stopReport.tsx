import { useState } from "react";
import { useRouter } from "next/navigation";

import { IStopDetails } from "@/interfaces/stop";
import { PeopleCounter } from "../peopleCounter";
import { RouteSelector } from "../routeSelector";
import { SubmitButton } from "../submitButton";

const axios = require("axios").default;

interface IStopReportProps {
  stop: IStopDetails;
}

export default function StopReport({ stop }: IStopReportProps) {
  const router = useRouter();
  const [numPeople, setNumPeople] = useState(0);
  const [routeID, setRouteID] = useState("");

  const handleSubmit = () => {
    postReport("/api/report/bus");
  };

  const handleRedirect = (report_uuid: string) => {
    router.push(`/reports/${report_uuid}/confirmation`);
  };

  const postReport = (url: string) => {
    axios
      .post(url, {
        stop_id: stop.StopNo,
        person_count: numPeople,
        route_id: routeID,
      })
      .then((res: any) => {
        handleRedirect(res.data.data.report_id);
      })
      .catch((err: any) => {
        console.error(err);
      });
  };

  return (
    <div className="flex flex-col gap-12 my-2">
      <div className="flex flex-col mt-4 gap-2">
        <p className="text-2xl font-bold">1. Which bus passed you?</p>
        <RouteSelector
          interactive={true}
          routes={stop.Routes}
          handler={(newRouteID) => setRouteID(newRouteID)}
          curr={routeID}
        />
      </div>
      <div className="flex flex-col gap-2">
        <p className="text-2xl font-bold">
          2. How many people are at this stop?
        </p>
        <PeopleCounter
          currNum={numPeople}
          handler={(newNum) => setNumPeople(newNum)}
        />
      </div>
      <SubmitButton disabled={!routeID || !numPeople} handler={handleSubmit} />
    </div>
  );
}
