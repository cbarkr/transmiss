import React from "react";

import { IStopDetails } from "@/interfaces/stop";
import { Active } from "@/enums/activeComponent";
import { ErrorText } from "@/enums/activeError";

export const StopSearchContext = React.createContext({
  setStop: (stop: IStopDetails) => {},
  setStops: (stops: IStopDetails[]) => {},
  setActive: (active: Active) => {},
  setError: (error: ErrorText) => {},
});

export const StopSetContext = React.createContext({
  setStop: (stop: IStopDetails) => {},
  setActive: (active: Active) => {},
});
