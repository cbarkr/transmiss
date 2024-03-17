import dynamic from "next/dynamic";

import { IStopDetails } from "@/interfaces/stop";
import { RouteSelector } from "../routeSelector";
import PlaceIcon from "@mui/icons-material/Place";

const StopWarning = dynamic(() => import("./stopWarning"));

interface IStopDetailsProps {
  stop: IStopDetails;
  warning?: boolean;
}

export default function StopDetails({ stop, warning }: IStopDetailsProps) {
  return (
    <>
      {warning && <StopWarning />}
      <div className="pb-2 border-b-2">
        <div className="flex flex-row justify-between my-2">
          <p className="text-4xl font-bold">{String(stop.StopNo)}</p>
          <RouteSelector
            interactive={false}
            routes={stop.Routes}
            handler={() => null}
            curr={""}
          />
        </div>
        <div className="flex flex-row justify-between">
          <p className="text-sm">
            {stop.OnStreet} & {stop.AtStreet}
          </p>
          {stop.Distance > 0 && (
            <div className="flex flex-row">
              <PlaceIcon />
              <p className="text-sm">{String(stop.Distance)}m</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
