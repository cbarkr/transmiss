import { IStopDetails } from "@/interfaces/stopdetails";

interface StopDetailsProps {
  stop: IStopDetails;
}

export default function StopDetails({ stop }: StopDetailsProps) {
  return (
    <div className="rounded-lg p-2 bg-gray-200 max-w-screen-sm">
      <div className="flex flex-row justify-between">
        <p className="text-l md:text-xl font-bold">{stop.StopNo}</p>
        <p>
          {stop.OnStreet} & {stop.AtStreet}
        </p>
      </div>
      <div className="flex flex-row">
        {stop.Routes.split(",").map((route: string) => (
          <div
            className="rounded-full p-2 font-bold bg-purple-400 text-amber-950"
            key={route}
          >
            {route ? route : "N/A"}
          </div>
        ))}
      </div>
    </div>
  );
}