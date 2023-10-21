import { useState } from "react";
import { Slider } from "@mui/material";
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';
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

  const [numPeople, setNumPeople] = useState(0);

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
        personCount: numPeople
      })
      .then((res: any) => {
        console.log(res)
      })
      .catch((err: any) => {
        console.error(err);
      });
  };

  const postFullReport = () => {
    axios
      .post("/api/report/bus", {
        stopID: stop.StopNo,
        personCount: numPeople,

        // TODO
        // busID: 0,
        // routeID: 0,
      })
      .then((res: any) => {
        console.log(res)
      })
      .catch((err: any) => {
        console.error(err);
      });
  };

  return (
    <div className="m-1 rounded-lg p-2 bg-gray-200">
      <StopDetails stop={stop} />
      <p className="font-bold my-4">Report</p>
      {
        (!crowded && !full) && (
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
        )
      }
      {
        crowded && (
          <>
            <p>How many people are at this stop?</p>
            <div className="flex flex-row justify-between items-center">
              {/* TODO: Consider getting estimate instead? Like https://transitapp.com/rats */}
              <SentimentSatisfiedAltIcon />
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
              <SentimentVeryDissatisfiedIcon />
            </div>
            <div className="flex flex-col items-center my-4">
              <button type="button" onClick={handleCrowdedSubmit} className="rounded-full py-2 px-8 bg-emerald-500 text-white transition-all hover:shadow-lg focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none">Submit</button>
            </div>
          </>
        )
      }
      {
        full && (
          <>
            <p>How many people are at this stop? (optional)</p>
            <div className="flex flex-row justify-between items-center">
              {/* TODO: Consider getting estimate instead? Like https://transitapp.com/rats */}
              <SentimentSatisfiedAltIcon />
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
              <SentimentVeryDissatisfiedIcon />
            </div>
            {/* TODO: Input for bus ID and route number? */}
            <div className="flex flex-col items-center my-4">
              <button type="button" onClick={handleFullSubmit} className="rounded-full py-2 px-8 bg-emerald-500 text-white transition-all hover:shadow-lg focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none">Submit</button>
            </div>
          </>
        )
      }
    </div>
  );
}
