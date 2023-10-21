"use client";

import { useState } from "react";
import dynamic from "next/dynamic";

import { defaultStopState } from "@/models/stop/default";
import { IStopDetails } from "@/interfaces/stopdetails";
import { StopListContext, StopSearchContext } from "@/context/stop";

const StopSearch = dynamic(() => import("./components/stopSearch"));
const StopList = dynamic(() => import("./components/stopList"));
const StopSelected = dynamic(() => import("./components/stopSelected"));

const isStopEmpty = (stop: IStopDetails) => {
  return Number.isNaN(stop.StopNo);
};

export default function Home() {
  // NOTE: stop and stops should be mutually exclusive
  const [stop, setStop] = useState<IStopDetails>(defaultStopState);
  const [stops, setStops] = useState<IStopDetails[]>([]);

  return (
    <div className="flex flex-col items-center">
      <div className="max-w-screen-sm">
        <StopSearchContext.Provider
          value={{ setStop: setStop, setStops: setStops }}
        >
          <StopSearch />
        </StopSearchContext.Provider>
        {!isStopEmpty(stop) && <StopSelected stop={stop} />}
        {isStopEmpty(stop) && stops.length === 0 && (
          <p className="mt-24 text-center">Select a stop to get started</p>
        )}
        {isStopEmpty(stop) && stops.length > 0 && (
          <StopListContext.Provider value={{ setStop: setStop }}>
            <StopList stops={stops} />
          </StopListContext.Provider>
        )}
      </div>
    </div>
  );
}
