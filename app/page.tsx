"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { CircularProgress } from "@mui/material";
import BusAlertIcon from "@mui/icons-material/BusAlert";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import { defaultStopState } from "@/models/stop";
import { IStopDetails } from "@/interfaces/stop";
import { StopSetContext, StopSearchContext } from "@/context/stop";
import { Active } from "@/enums/activeComponent";
import { ErrorText } from "@/enums/activeError";

const StopSearch = dynamic(() => import("./components/stop/stopSearch"));
const StopList = dynamic(() => import("./components/stop/stopList"));
const StopSelected = dynamic(() => import("./components/stop/stopSelected"));

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
      <div className="w-[98dvw] max-w-screen-sm">
        <div className="mt-4 flex flex-row">
          {active !== Active.Selected && (
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
          )}
          {active == Active.Selected && (
            <button
              onClick={handleBackClick}
              type="button"
              className="rounded-full m-2 p-2 bg-white text-black transition-all hover:shadow-lg focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-75 disabled:shadow-none"
            >
              <ArrowBackIcon />
            </button>
          )}
        </div>
        <div className="mt-1">
          {active == Active.Default && (
            <>
              <div className="h-[25dvh] rounded-3xl bg-zinc-700 flex justify-center items-center">
                <div className="flex flex-col items-center gap-2">
                  <BusAlertIcon fontSize="large" />
                  <h1 className="text-2xl font-bold">Transit missing the mark?</h1>
                  <h2 className="text-sm text-gray-200">Search for a stop and say something about it</h2>
                </div>
              </div>
            </>
          )}
          {active == Active.Loading && (
            <div className="flex flex-col items-center">
              <CircularProgress color="inherit" />
            </div>
          )}
          {active == Active.Error && <p className="text-center">{error}</p>}
          {active == Active.Selected && (
            <StopSetContext.Provider
              value={{ setStop: setStop, setActive: setActive }}
            >
              <StopSelected stop={stop} />
            </StopSetContext.Provider>
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
