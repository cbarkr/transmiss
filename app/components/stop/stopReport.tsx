import { useState, useEffect, useRef } from "react";

import GroupsIcon from "@mui/icons-material/Groups";
import NoTransferIcon from "@mui/icons-material/NoTransfer";
import AirportShuttleIcon from "@mui/icons-material/AirportShuttle";

import { IReportFrom } from "@/interfaces/from";
import { IStopDetails } from "@/interfaces/stop";
import { PeopleCounter } from "../peopleCounter";
import { RouteSelector } from "../routeSelector";
import { ReportButton } from "../reportButton";
import { SubmitButton } from "../submitButton";
import { usePrevious } from "../../hooks/prev";

const axios = require("axios").default;

interface IStopReportProps {
  stop: IStopDetails;
  handleRetrievedReports: (newReports: IReportFrom[]) => void;
}

export default function StopReport({ stop, handleRetrievedReports }: IStopReportProps) {
  // NOTE: crowded and full should be mutually exclusive
  const [crowded, setCrowded] = useState(false);
  const [full, setFull] = useState(false);
  const [noShow, setNoShow] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [numPeople, setNumPeople] = useState(0);
  const [routeID, setRouteID] = useState("");

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
        handleRetrievedReports(res.data.data);
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
    <>
      <div className="rounded-lg my-1 p-2 max-w-screen-sm bg-gunmetal/10 dark:bg-gunmetal">
        <p className="text-xl font-bold my-2">Report</p>
        {(!crowded || !noShow || !full) && (
          <div className="flex flex-row justify-center rounded-full my-2 bg-primary-200 dark:bg-primary-950">
            <ReportButton
              text="Crowded"
              icon={<GroupsIcon />}
              disabled={crowded}
              handler={reportCrowded}
            />
            <ReportButton
              text="No-Show"
              icon={<NoTransferIcon />}
              disabled={noShow}
              handler={reportNoShow}
            />
            <ReportButton
              text="Full"
              icon={<AirportShuttleIcon />}
              disabled={full}
              handler={reportFull}
            />
          </div>
        )}
        {(crowded || noShow || full) && (
          <>
            {crowded && (
              <div>
                <p className="font-bold mb-2">
                  How many people are at this stop?
                </p>
                <PeopleCounter
                  currNum={numPeople}
                  handler={updateNumPeople}
                  disabled={submitted}
                />
              </div>
            )}
            {noShow && (
              <>
                <p className="font-bold mb-2">Which bus were you expecting?</p>
                <RouteSelector
                  routes={stop.Routes}
                  handler={updateRouteID}
                  curr={routeID}
                />
                <p className="font-bold mb-2">
                  How many people are at this stop? (optional)
                </p>
                <PeopleCounter
                  currNum={numPeople}
                  handler={updateNumPeople}
                  disabled={submitted}
                />
              </>
            )}
            {full && (
              <>
                <p className="font-bold mb-2">Which bus passed you?</p>
                <RouteSelector
                  routes={stop.Routes}
                  handler={updateRouteID}
                  curr={routeID}
                />
                <p className="font-bold mb-2">
                  How many people are at this stop? (optional)
                </p>
                <PeopleCounter
                  currNum={numPeople}
                  handler={updateNumPeople}
                  disabled={submitted}
                />
              </>
            )}
            {(crowded || noShow || full) && (
              <>
                {crowded && numPeople > 0 && (
                  <SubmitButton
                    submitted={submitted}
                    handler={handleCrowdedSubmit}
                  />
                )}
                {noShow && routeID !== "" && (
                  <SubmitButton
                    submitted={submitted}
                    handler={handleNoShowSubmit}
                  />
                )}
                {full && routeID !== "" && (
                  <SubmitButton
                    submitted={submitted}
                    handler={handleFullSubmit}
                  />
                )}
              </>
            )}
          </>
        )}
      </div>
    </>
  );
}
