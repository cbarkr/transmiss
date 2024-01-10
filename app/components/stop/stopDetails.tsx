import dynamic from "next/dynamic";

import { IStopDetails } from "@/interfaces/stop";
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
      <div className="rounded-3xl p-4 bg-zinc-700">
        <div className="flex flex-row justify-between my-2">
          <p className="text-2xl font-bold">{String(stop.StopNo)}</p>
          <div className="flex flex-row">
            {stop.Routes.split(",").map((route: string) => (
              <div
                key={route}
                className="rounded-3xl py-2 px-4 mx-1 font-bold bg-primary-200 text-sm text-primary-950"
              >
                {route ? route : "N/A"}
              </div>
            ))}
          </div>
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
