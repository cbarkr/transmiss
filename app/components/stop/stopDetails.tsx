import dynamic from "next/dynamic";

import { IStopDetails } from "@/interfaces/stop";
import PlaceIcon from "@mui/icons-material/Place";

const StopWarning = dynamic(() => import("./stopWarning"));

interface IStopDetailsProps {
  stop: IStopDetails;
  warning?: boolean;
  selected?: boolean;
  showReportMenu?: boolean;
  handleShowReportMenu?: () => void;
}

export default function StopDetails({
  stop,
  warning,
  selected,
  showReportMenu,
  handleShowReportMenu,
}: IStopDetailsProps) {
  return (
    <div className="rounded-3xl p-2 bg-gunmetal/10 dark:bg-gunmetal max-w-screen-sm">
      {warning && <StopWarning />}
      <div className="flex flex-row justify-between my-2">
        <p className="text-2xl font-bold">{stop.StopNo}</p>
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
            <p className="text-sm">{stop.Distance}m</p>
          </div>
        )}
      </div>
      {selected && !showReportMenu && (
        <div className="flex mt-4">
          <button
            onClick={handleShowReportMenu}
            type="button"
            className="flex-grow basis-1 rounded-full px-2 py-4 text-primary-200 bg-primary-950 transition-all hover:shadow-lg focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-75 disabled:shadow-none"
          >
            Report
          </button>
        </div>
      )}
    </div>
  );
}
