import { useState, useEffect, useRef } from "react";
import { CheckCircle } from "@mui/icons-material";
import dynamic from "next/dynamic";

import { usePrevious } from "../hooks/prev";
import { IStopDetails } from "@/interfaces/stop";
import { IReportFrom } from "@/interfaces/from";

const StopDetails = dynamic(() => import("./stopDetails"));

const axios = require("axios").default;

interface StopSelectedProps {
  stop: IStopDetails;
}

export default function StopSelected({ stop }: StopSelectedProps) {
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
    }
    else {
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

  const reportCrowded = () => {
    setFull(false);
    setNoShow(false);
    setCrowded(true);
  };

  const reportFull = () => {
    setCrowded(false);
    setNoShow(false);
    setFull(true);
  };

  const reportNoShow = () => {
    setCrowded(false);
    setFull(false);
    setNoShow(true);
  };

  const getReports = () => {
    console.log('getReports')
    axios
      .get("/api/report/from", {
        params: {
          StopNo: stop.StopNo
        }
      })
      .then((res: any) => {
        setReports(res.data.data);
    })
      .catch((err: any) => {
        console.error(err);
      });
  }

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
        route_id: routeID
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
    <div className="m-1 rounded-lg p-2 bg-neutral-200 dark:bg-neutral-900">
      <StopDetails stop={stop} reports={reports}/>
      <div className="p-2 max-w-screen-sm">
        <p className="font-bold my-2">Report</p>
        {!crowded && !full && !noShow && (
          <div className="flex flex-row justify-center">
            <button
              onClick={reportCrowded}
              type="button"
              className="flex-grow rounded-lg p-2 w-24 h-16 bg-error-100 text-sm text-error-900 border-solid border-2 dark:border-1 transition-all hover:shadow-lg focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
            >
              Crowded
            </button>
            <button
              onClick={reportNoShow}
              type="button"
              className="flex-grow rounded-lg p-2 w-24 h-16 bg-error-900 text-sm text-error-100 border-solid border-2 dark:border-1 transition-all hover:shadow-lg focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
            >
              No Show
            </button>
            <button
              onClick={reportFull}
              type="button"
              className="flex-grow rounded-lg p-2 w-24 h-16 bg-error-700 text-sm text-white border-solid border-2 dark:border-1 transition-all hover:shadow-lg focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
            >
              Full bus
            </button>
          </div>
        )}
        {crowded && (
          <>
            <p>How many people are at this stop?</p>
            <div className="flex flex-row justify-between items-center">
              {/* TODO: Consider getting estimate instead? Like https://transitapp.com/rats */}
              <div>
                <div className="rounded-lg py-2 px-4 bg-primary-950 text-secondary-300">{numPeople}</div>
              </div>
              <div>
                <button 
                  type="button"
                  disabled={submitted}
                  onClick={() => setNumPeople(numPeople => numPeople > 1 ? numPeople - 1 : 0)}
                  className="rounded-full py-2 px-4 bg-primary-950 text-secondary-300 text-xl transition-all hover:shadow-lg focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                >
                  -
                </button>
                <button 
                  type="button"
                  disabled={submitted}
                  onClick={() => setNumPeople(numPeople => numPeople + 1)}
                  className="rounded-full py-2 px-4 bg-primary-950 text-secondary-300 text-xl transition-all hover:shadow-lg focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                >
                  +
                </button>
              </div>
            </div>
            <div className="flex flex-col items-center my-2">
              <button
                type="button"
                disabled={submitted}
                onClick={handleCrowdedSubmit}
                className="rounded-full py-2 px-8 bg-success-600 text-success-50 transition-all hover:shadow-lg focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
              >
                {
                  submitted ? <CheckCircle /> : <p>Submit</p>
                }
              </button>
            </div>
          </>
        )}
        {noShow && (
          <>
            <div className='my-2'>
              <p>Which bus passed you?</p>
              <div className="flex flex-row items-center">
                {stop.Routes.split(",").map((route: string) => (
                  <button
                    key={route}
                    type="button"
                    disabled={routeID === route}
                    onClick={() => setRouteID(route)}
                    className="rounded-lg py-2 px-4 font-bold bg-secondary-300 text-primary-950 transition-all hover:shadow-lg focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                  >
                    {route ? route : "N/A"}
                  </button>
                ))}
              </div>
            </div>
            <div className='my-2'>
              <p>How many people are at this stop? (optional)</p>
              <div className="flex flex-row justify-between items-center">
                {/* TODO: Consider getting estimate instead? Like https://transitapp.com/rats */}
                <div>
                  <div className="rounded-lg py-2 px-4 bg-primary-950 text-secondary-300">{numPeople}</div>
                </div>
                <div>
                  <button 
                    type="button"
                    disabled={submitted}
                    onClick={() => setNumPeople(numPeople => numPeople > 1 ? numPeople - 1 : 0)}
                    className="rounded-full py-2 px-4 bg-primary-950 text-secondary-300 text-xl transition-all hover:shadow-lg focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                  >
                    -
                  </button>
                  <button 
                    type="button"
                    disabled={submitted}
                    onClick={() => setNumPeople(numPeople => numPeople + 1)}
                    className="rounded-full py-2 px-4 bg-primary-950 text-secondary-300 text-xl transition-all hover:shadow-lg focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
            <div className="flex flex-col items-center my-2">
              <button
                type="button"
                disabled={submitted}
                onClick={handleNoShowSubmit}
                className="rounded-full py-2 px-8 bg-success-600 text-success-50 transition-all hover:shadow-lg focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
              >
                {
                  submitted ? <CheckCircle /> : <p>Submit</p>
                }
              </button>
            </div>
          </>
        )}
        {full && (
          <>
            <div className='my-2'>
              <p>Which bus passed you?</p>
              <div className="flex flex-row items-center">
                {stop.Routes.split(",").map((route: string) => (
                  <button
                    key={route}
                    type="button"
                    disabled={routeID === route}
                    onClick={() => setRouteID(route)}
                    className="rounded-lg py-2 px-4 font-bold bg-secondary-300 text-primary-950 transition-all hover:shadow-lg focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                  >
                    {route ? route : "N/A"}
                  </button>
                ))}
              </div>
            </div>
            <div className='my-2'>
              <p>How many people are at this stop? (optional)</p>
              <div className="flex flex-row justify-between items-center">
                {/* TODO: Consider getting estimate instead? Like https://transitapp.com/rats */}
                <div>
                  <div className="rounded-lg py-2 px-4 bg-primary-950 text-secondary-300">{numPeople}</div>
                </div>
                <div>
                  <button 
                    type="button"
                    disabled={submitted}
                    onClick={() => setNumPeople(numPeople => numPeople > 1 ? numPeople - 1 : 0)}
                    className="rounded-full py-2 px-4 bg-primary-950 text-secondary-300 text-xl transition-all hover:shadow-lg focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                  >
                    -
                  </button>
                  <button 
                    type="button"
                    disabled={submitted}
                    onClick={() => setNumPeople(numPeople => numPeople + 1)}
                    className="rounded-full py-2 px-4 bg-primary-950 text-secondary-300 text-xl transition-all hover:shadow-lg focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
            <div className="flex flex-col items-center my-2">
              <button
                type="button"
                disabled={submitted}
                onClick={handleFullSubmit}
                className="rounded-full py-2 px-8 bg-success-600 text-success-50 transition-all hover:shadow-lg focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
              >
                {
                  submitted ? <CheckCircle /> : <p>Submit</p>
                }
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
