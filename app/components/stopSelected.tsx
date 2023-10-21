import dynamic from "next/dynamic";

import { IStopDetails } from "@/interfaces/stopdetails";

const StopDetails = dynamic(() => import("./stopDetails"));

interface StopSelectedProps {
  stop: IStopDetails;
}

export default function StopSelected({ stop }: StopSelectedProps) {
  const reportStop = () => {
    // TODO: Report stop UI
  };

  const reportBus = () => {
    // TODO: Report bus UI
  };

  return (
    <div className="m-1 rounded-lg p-2 bg-gray-200">
      <StopDetails stop={stop} />
      <p className="my-2">Report</p>
      <div className="flex flex-row justify-between">
        <button
          onClick={reportStop}
          type="button"
          className="rounded-full p-2 bg-white border-solid border-2 transition-all hover:shadow-lg focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
        >
          Crowded stop
        </button>
        <button
          onClick={reportBus}
          type="button"
          className="rounded-full py-2 px-8 bg-white border-solid border-2 transition-all hover:shadow-lg focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
        >
          Full bus
        </button>
      </div>
    </div>
  );
}
