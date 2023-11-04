"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { CircularProgress } from "@mui/material";
import { BusAlert } from "@mui/icons-material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";

import { defaultStopState } from "@/models/stop";
import { IStopDetails } from "@/interfaces/stop";
import { StopSetContext, StopSearchContext } from "@/context/stop";
import { Active } from "@/enums/activeComponent";
import { ErrorText } from "@/enums/activeError";

const StopSearch = dynamic(() => import("./components/stopSearch"));
const StopList = dynamic(() => import("./components/stopList"));
const StopSelected = dynamic(() => import("./components/stopSelected"));

export default function Home() {
  // NOTE: stop and stops should be mutually exclusive
  const [stop, setStop] = useState<IStopDetails>(defaultStopState);
  const [stops, setStops] = useState<IStopDetails[]>([]);
  const [active, setActive] = useState(Active.Default);
  const [error, setError] = useState(ErrorText.LocationNotFound);

  const handleBackClick = () => {
    if (stops.length > 0) {
      setStop(defaultStopState);
      setActive(Active.List);
    } else {
      setStop(defaultStopState);
      setActive(Active.Default);
    }
  };

  return (
    <div className="flex flex-col items-center mx-2">
      <div className="w-full max-w-screen-sm">
        <div className="mt-4">
          <StopSearchContext.Provider
            value={{
              setStop: setStop,
              setStops: setStops,
              setActive: setActive,
              setError: setError,
            }}
          >
            <StopSearch />
          </StopSearchContext.Provider>
        </div>
        <div className="mt-4">
          {active == Active.Default && (
            <>
              <div className="flex flex-col items-center">
                <BusAlert fontSize="large" />
              </div>
              <p className="text-center">Select a stop to get started</p>
            </>
          )}
          {active == Active.Loading && (
            <div className="flex flex-col items-center">
              <CircularProgress color="inherit" />
            </div>
          )}
          {active == Active.Error && <p className="text-center">{error}</p>}
          {active == Active.Selected && (
            <>
              <button
                onClick={handleBackClick}
                type="button"
                className="rounded-full m-2 p-2 text-primary-50 bg-primary-950 dark:text-primary-950 dark:bg-primary-50 transition-all hover:shadow-lg focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-75 disabled:shadow-none"
              >
                <ArrowBackIosNewIcon />
              </button>
              <StopSetContext.Provider
                value={{ setStop: setStop, setActive: setActive }}
              >
                <StopSelected stop={stop} />
              </StopSetContext.Provider>
            </>
          )}
          {active == Active.List && (
            <StopSetContext.Provider
              value={{ setStop: setStop, setActive: setActive }}
            >
              <StopList stops={stops} />
            </StopSetContext.Provider>
          )}
        </div>
      </div>
    </div>
  );
}
