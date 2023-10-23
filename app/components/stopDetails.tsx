import { IStopDetails } from "@/interfaces/stopdetails";

interface StopDetailsProps {
  stop: IStopDetails;
}

export default function StopDetails({ stop }: StopDetailsProps) {
  return (
    <div className="rounded-lg p-2 bg-neutral-200 dark:bg-neutral-800 max-w-screen-sm">
      <div className="flex flex-row justify-between my-2">
        <p className="text-l md:text-xl font-bold">{stop.StopNo}</p>
        <div className="flex flex-row">
          {stop.Routes.split(",").map((route: string) => (
            <div
              className="rounded-lg p-2 font-bold bg-secondary-300 text-primary-950"
              key={route}
            >
              {route ? route : "N/A"}
            </div>
          ))}
        </div>
      </div>
      <p>{stop.OnStreet} & {stop.AtStreet}</p>
    </div>
  );
}
