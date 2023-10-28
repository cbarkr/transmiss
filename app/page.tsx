"use client";

import { useState } from "react";
import dynamic from "next/dynamic";

import { defaultStopState } from "@/models/stop";
import { IStopDetails } from "@/interfaces/stop";
import { StopListContext, StopSearchContext } from "@/context/stop";
import { CircularProgress } from "@mui/material";
import { BusAlert } from "@mui/icons-material";
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

  return (
    <div className="flex flex-col items-center mx-2">
      <div className="w-full max-w-screen-sm">
        <div className="mt-4">
          <StopSearchContext.Provider
            value={{
              setStop: setStop,
              setStops: setStops,
              setActive: setActive,
              setError: setError
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
          {active == Active.Error && (
            <p className="text-center">{error}</p>
          )}
          {active == Active.Selected && <StopSelected stop={stop} />}
          {active == Active.List && (
            <StopListContext.Provider
              value={{ setStop: setStop, setActive: setActive }}
            >
              <StopList stops={stops} />
            </StopListContext.Provider>
          )}
        </div>
      </div>
    </div>
  );
}
