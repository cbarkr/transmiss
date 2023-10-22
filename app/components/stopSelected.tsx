import { useState, useEffect, useRef } from "react";
import { Slider } from "@mui/material";
import { CheckCircle } from "@mui/icons-material";
import dynamic from "next/dynamic";

import { IStopDetails } from "@/interfaces/stopdetails";

const StopDetails = dynamic(() => import("./stopDetails"));

const axios = require("axios").default;

interface StopSelectedProps {
  stop: IStopDetails;
}

export default function StopSelected({ stop }: StopSelectedProps) {
  // NOTE: crowded and full should be mutually exclusive
  const [crowded, setCrowded] = useState(false);
  const [full, setFull] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [numPeople, setNumPeople] = useState(0);
  const [routeID, setRouteID] = useState("");

  const mounted = useRef(0);

  useEffect(() => {
    if (!mounted.current) {
      mounted.current = stop.StopNo;
    } else {
      if (mounted.current !== stop.StopNo) {
        // Reset if new stop has been selected
        mounted.current = stop.StopNo;
        setFull(false);
        setCrowded(false);
        setSubmitted(false);
        setNumPeople(0);
        setRouteID("");
      }
    }
  });

  const reportCrowded = () => {
    setFull(false);
    setCrowded(true);
  };

  const reportFull = () => {
    setCrowded(false);
    setFull(true);
  };

  const handleChange = (e: Event, newValue: number | number[]) => {
    setNumPeople(newValue as number);
  };

  const handleCrowdedSubmit = () => {
    postCrowdedReport();
  };

  const handleFullSubmit = () => {
    postFullReport();
  };

  const postCrowdedReport = () => {
    axios
      .post("/api/report/stop", {
        stopID: stop.StopNo,
        personCount: numPeople,
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

  const postFullReport = () => {
    axios
      .post("/api/report/bus", {
        stopID: stop.StopNo,
        personCount: numPeople,
        routeID: routeID
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
    <div className="m-1 rounded-lg p-2 bg-gray-200">
      <StopDetails stop={stop} />
      <p className="font-bold my-4">Report</p>
      {!crowded && !full && (
        <div className="flex flex-row justify-between">
          <button
            onClick={reportCrowded}
            type="button"
            className="rounded-full p-2 bg-white border-solid border-2 transition-all hover:shadow-lg focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
          >
            Crowded stop
          </button>
          <button
            onClick={reportFull}
            type="button"
            className="rounded-full py-2 px-8 bg-amber-800 text-white border-solid border-2 transition-all hover:shadow-lg focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
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
            <Slider
              valueLabelDisplay="auto"
              color="info"
              value={numPeople}
              onChange={handleChange}
              defaultValue={5}
              step={1}
              min={1}
              max={20}
              className="mx-4"
            />
          </div>
          <div className="flex flex-col items-center my-4">
            <button
              type="button"
              disabled={submitted}
              onClick={handleCrowdedSubmit}
              className="rounded-full py-2 px-8 bg-emerald-500 text-white transition-all hover:shadow-lg focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
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
          <div className='my-4'>
            <p>How many people are at this stop? (optional)</p>
            <div className="flex flex-row justify-between items-center">
              {/* TODO: Consider getting estimate instead? Like https://transitapp.com/rats */}
              <Slider
                valueLabelDisplay="auto"
                color="info"
                value={numPeople}
                onChange={handleChange}
                defaultValue={5}
                step={1}
                min={1}
                max={20}
                className="mx-4"
              />
            </div>
          </div>
          <div className='my-4'>
            <p>Which bus passed you? (optional)</p>
            <div className="flex flex-row justify-between items-center">
              {stop.Routes.split(",").map((route: string) => (
                <button
                  key={route}
                  type="button"
                  disabled={routeID === route}
                  onClick={() => setRouteID(route)}
                  className="rounded-full p-2 font-bold bg-purple-400 text-amber-950 transition-all hover:shadow-lg focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                >
                  {route ? route : "N/A"}
                </button>
              ))}
            </div>
          </div>
          <div className="flex flex-col items-center my-4">
            <button
              type="button"
              disabled={submitted}
              onClick={handleFullSubmit}
              className="rounded-full py-2 px-8 bg-emerald-500 text-white transition-all hover:shadow-lg focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
            >
              {
                submitted ? <CheckCircle /> : <p>Submit</p>
              }
            </button>
          </div>
        </>
      )}
    </div>
  );
}
