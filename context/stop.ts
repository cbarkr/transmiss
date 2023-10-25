import React from "react";

import { IStopDetails } from "@/interfaces/stop";

export const StopSearchContext = React.createContext({
  setStop: (stop: IStopDetails) => {},
  setStops: (stops: IStopDetails[]) => {},
  setActive: (active: number) => {},
});

export const StopListContext = React.createContext({
  setStop: (stop: IStopDetails) => {},
  setActive: (active: number) => {},
});
