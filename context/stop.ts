import React from "react";

import { IStopDetails } from "@/interfaces/stopdetails";

export const StopSearchContext = React.createContext({
  setStop: (stop: IStopDetails) => {},
  setStops: (stops: IStopDetails[]) => {},
});

export const StopListContext = React.createContext({
  setStop: (stop: IStopDetails) => {},
});
