import dynamic from "next/dynamic";

import { IStopDetails } from "@/interfaces/stop";
import PlaceIcon from "@mui/icons-material/Place";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

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
    <>
      {warning && <StopWarning />}
      <div className="rounded-3xl p-4 bg-zinc-700 max-w-screen-sm">
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
          <div className="flex flex-row mt-1 gap-1">
            <button
              onClick={handleShowReportMenu}
              type="button"
              className="flex flex-col min-w-[5rem] w-[10dvh] min-h-[5rem] h-[10dvh] justify-center items-center text-center text-xl rounded-full bg-primary-200 text-black transition-all hover:shadow-lg focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-75 disabled:shadow-none"
            >
              <div>Report</div>
              <ArrowForwardIcon />
            </button>
          </div>
        )}
      </div>
    </>
  );
}
