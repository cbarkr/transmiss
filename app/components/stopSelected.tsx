import { useState, useEffect, useRef } from "react";
import { CheckCircle } from "@mui/icons-material";
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import dynamic from "next/dynamic";

import { usePrevious } from "../hooks/prev";
import { IStopDetails } from "@/interfaces/stop";
import { IReportFrom } from "@/interfaces/from";

const StopDetails = dynamic(() => import("./stopDetails"));

const axios = require("axios").default;

interface IPeopleCounterProps {
  currNum: number;
  handler: (newNum: number) => void;
  disabled: boolean;
}

interface IRouteSelectorProps {
  routes: string;
  handler: (newRouteID: string) => void;
  curr: string;
}

interface ISubmitButtonProps {
  submitted: boolean;
  handler: () => void;
}

interface IStopSelectedProps {
  stop: IStopDetails;
}

function PeopleCounter({currNum, handler, disabled}: IPeopleCounterProps) {
  const handleChange = (e: any) => {
    const newNum = Number.parseInt(e)
    handler(newNum > 1 ? newNum : currNum)
  }

  return (
    <div className="flex flex-row items-center rounded-full text-secondary-300 bg-primary-950 dark:text-primary-950 dark:bg-secondary-300 w-fit">
      {/* TODO: Consider getting estimate instead? Like https://transitapp.com/rats */}
      <button
        type="button"
        disabled={disabled}
        onClick={() => handler(currNum > 1 ? currNum - 1 : 0)}
        className="rounded-full py-2 px-4 text-xl transition-all hover:shadow-lg focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
      >
        -
      </button>
      <input
        onChange={(e) => handleChange(e.target.value)}
        value={currNum}
        type="number"
        size={1}
        className="rounded-full bg-transparent outline-none text-center"
      ></input>
      <button 
        type="button"
        disabled={disabled}
        onClick={() => handler(currNum + 1)}
        className="rounded-full py-2 px-4 text-xl transition-all hover:shadow-lg focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
      >
        +
      </button>
    </div>
  )
}

function RouteSelector({routes, handler, curr}: IRouteSelectorProps) {
  return (
    <div className="flex flex-row items-center">
      {routes.split(",").map((route: string) => (
        <button
          key={route}
          type="button"
          disabled={curr === route}
          onClick={() => handler(route)}
          className="rounded-lg py-2 px-4 font-bold bg-secondary-300 text-primary-950 transition-all hover:shadow-lg focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
        >
          {route ? route : "N/A"}
        </button>
      ))}
    </div>
  )
}

function SubmitButton({submitted, handler}: ISubmitButtonProps) {
  return (
    <div className="flex flex-col items-center my-2">
      <button
        type="button"
        disabled={submitted}
        onClick={handler}
        className="rounded-full py-2 px-8 bg-success-600 text-success-50 transition-all hover:shadow-lg focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
      >
        {
          submitted ? <CheckCircle /> : <p>Submit</p>
        }
      </button>
    </div>
  )
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

  const updateNumPeople = (newNum: number) => {
    setNumPeople(newNum);
  }

  const updateRouteID = (newRouteID: string) => {
    setRouteID(newRouteID);
  }

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
    <div className="m-2">
      {
        reports && (
          <div className="flex flex-row items-center rounded-lg my-1 p-2 bg-flush-orange-950">
            {/* Magic strings are evil but MUI and tailwind don't play nicely together */}
            {/* #381717 is error-950 */}
            <ErrorOutlineIcon sx={{ color: 'white' }} />
            <p className="mx-2 text-white">Users have reported issues with this stop within the last hour. Submit a report to help others!</p>
          </div>
        )
      }
      <StopDetails stop={stop} />
      <div className="rounded-lg my-1 p-2 max-w-screen-sm bg-primary-200 dark:bg-primary-950">
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
            <PeopleCounter currNum={numPeople} handler={updateNumPeople} disabled={submitted} />
            <SubmitButton submitted={submitted} handler={handleCrowdedSubmit} />
          </>
        )}
        {noShow && (
          <>
            <div className='my-2'>
              <p>Which bus passed you?</p>
              <RouteSelector routes={stop.Routes} handler={updateRouteID} curr={routeID} />
            </div>
            <div className='my-2'>
              <p>How many people are at this stop? (optional)</p>
              <PeopleCounter currNum={numPeople} handler={updateNumPeople} disabled={submitted} />
            </div>
            <SubmitButton submitted={submitted} handler={handleNoShowSubmit} />
          </>
        )}
        {full && (
          <>
            <div className='my-2'>
              <p>Which bus passed you?</p>
              <RouteSelector routes={stop.Routes} handler={updateRouteID} curr={routeID} />
            </div>
            <div className='my-2'>
              <p>How many people are at this stop? (optional)</p>
              <PeopleCounter currNum={numPeople} handler={updateNumPeople} disabled={submitted} />
            </div>
            <SubmitButton submitted={submitted} handler={handleFullSubmit} />
          </>
        )}
      </div>
    </div>
  );
}
