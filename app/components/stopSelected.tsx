import { useState, useEffect, useRef } from "react";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import GroupsIcon from '@mui/icons-material/Groups';
import NoTransferIcon from '@mui/icons-material/NoTransfer';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import AirportShuttleIcon from '@mui/icons-material/AirportShuttle';
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
        min={0}
        max={100}
        pattern="[0-9]*"
        className="rounded-full w-6 bg-transparent outline-none text-center"
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
          className="rounded-full py-2 px-4 font-bold text-secondary-300 bg-primary-950 dark:text-primary-950 dark:bg-secondary-300 transition-all hover:shadow-lg focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
        >
          {route ? route : "N/A"}
        </button>
      ))}
    </div>
  )
}

function SubmitButton({submitted, handler}: ISubmitButtonProps) {
  return (
    <div className="flex justify-end items-center my-2">
      <button
        type="button"
        disabled={submitted}
        onClick={handler}
        className="rounded-full py-2 px-4 text-secondary-300 bg-primary-950 dark:text-primary-950 dark:bg-secondary-300 transition-all hover:shadow-lg focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
      >
        {
          submitted ? <CheckCircleIcon /> : 
            <div className="flex flex-row">
              <p>Submit</p>
              <ArrowForwardIcon />
            </div>
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
        reports.length > 0 && (
          <div className="flex flex-row items-center rounded-lg my-1 p-2 bg-flush-orange-950">
            <ErrorOutlineIcon sx={{ color: 'white' }} />
            <p className="mx-2 text-white">Others have reported issues with this stop within the last hour. Submit a report to help!</p>
          </div>
        )
      }
      <StopDetails stop={stop} />
      <div className="rounded-lg my-1 p-2 max-w-screen-sm bg-primary-200 dark:bg-primary-950">
        <p className="font-bold my-2">Report</p>
        {!crowded && !full && !noShow && (
          <div className="flex flex-row justify-center">
            <div 
              className="flex-grow basis-1 rounded-lg bg-primary-950 dark:bg-primary-200 mx-1 px-2 py-4 hover:cursor-pointer" 
              onClick={reportCrowded}
            >
              <div className="flex flex-row justify-between items-center text-primary-200 dark:text-primary-950">
                <div className="flex flex-col items-center">
                  <GroupsIcon />
                  <p>Crowded</p>
                </div>
                <ArrowForwardIosIcon />
              </div>
            </div> 
            <div 
              className="flex-grow basis-1 rounded-lg bg-flush-orange-400/75 mx-1 px-2 py-4 hover:cursor-pointer" 
              onClick={reportNoShow}
            >
              <div className="flex flex-row justify-between items-center text-flush-orange-950">
                <div className="flex flex-col items-center">
                  <NoTransferIcon />
                  <p>No Show</p>
                </div>
                <ArrowForwardIosIcon />
              </div>
            </div>
            <div 
              className="flex-grow basis-1 rounded-lg bg-flush-orange-950 mx-1 px-2 py-4 hover:cursor-pointer" 
              onClick={reportFull}
            >
              <div className="flex flex-row justify-between items-center text-flush-orange-50">
                <div className="flex flex-col items-center">
                  <AirportShuttleIcon />
                  <p>Bus Full</p>
                </div>
                <ArrowForwardIosIcon />
              </div>
            </div>
          </div>
        )}
        {crowded && (
          <>
            <div className='flex flex-row justify-between items-center'>
              <p>How many people are at this stop?</p>
              <PeopleCounter currNum={numPeople} handler={updateNumPeople} disabled={submitted} />
            </div>
            <SubmitButton submitted={submitted} handler={handleCrowdedSubmit} />
          </>
        )}
        {noShow && (
          <>
            <div className='flex flex-row justify-between items-center my-2'>
              <p>Which bus passed you?</p>
              <RouteSelector routes={stop.Routes} handler={updateRouteID} curr={routeID} />
            </div>
            <div className='flex flex-row justify-between items-center my-2'>
              <p>How many people are at this stop? (optional)</p>
              <PeopleCounter currNum={numPeople} handler={updateNumPeople} disabled={submitted} />
            </div>
            <SubmitButton submitted={submitted} handler={handleNoShowSubmit} />
          </>
        )}
        {full && (
          <>
            <div className='flex flex-row justify-between items-center my-2'>
              <p>Which bus passed you?</p>
              <RouteSelector routes={stop.Routes} handler={updateRouteID} curr={routeID} />
            </div>
            <div className='flex flex-row justify-between items-center my-2'>
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
