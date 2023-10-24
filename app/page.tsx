"use client";

import { useState } from "react";
import dynamic from "next/dynamic";

import { defaultStopState } from "@/models/stop/default";
import { IStopDetails } from "@/interfaces/stopdetails";
import { StopListContext, StopSearchContext } from "@/context/stop";
import { CircularProgress } from "@mui/material";
import { BusAlert } from "@mui/icons-material";

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
  const [stopNotFound, setStopNotFound] = useState(false);
  const [isFetching, setIsFetching] = useState(false);

  return (
    <div className="flex flex-col items-center">
      <div className="max-w-screen-sm">
        <div className="mt-4">
          <StopSearchContext.Provider
            value={{
              setStop: setStop,
              setStops: setStops,
              setStopNotFound: setStopNotFound,
              setIsFetching: setIsFetching,
            }}
          >
            <StopSearch />
          </StopSearchContext.Provider>
        </div>
        <div className="mt-4">
          {!isStopEmpty(stop) && (
            <StopSelected stop={stop} />
          )}
          {isStopEmpty(stop) && stops.length > 0 && (
            <StopListContext.Provider value={{ setStop: setStop }}>
              <StopList stops={stops} />
            </StopListContext.Provider>
          )}
          {isStopEmpty(stop) && stops.length === 0 && !isFetching && !stopNotFound && (
            <>
              <div className="flex flex-col items-center">
                <BusAlert fontSize="large" />
              </div>
              <p className="text-center">Select a stop to get started</p>
            </>
          )}
          {isStopEmpty(stop) && stops.length === 0 && !isFetching && stopNotFound && (
            <p className="text-center">Stop not found</p>
          )}
          {isFetching && (
            <div className="flex flex-col items-center">
              <CircularProgress color="inherit" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
