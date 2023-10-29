import { IStopDetails } from "@/interfaces/stop";

interface IStopDetailsProps {
  stop: IStopDetails;
}

export default function StopDetails({ stop }: IStopDetailsProps) {
  return (
    <div className="rounded-lg p-2 bg-neutral-200 dark:bg-gunmetal max-w-screen-sm">
      <div className="flex flex-row justify-between my-2">
        <div className="flex flex-row">
          <p className="text-l md:text-xl font-bold">{stop.StopNo}</p>
        </div>
        <div className="flex flex-row">
          {stop.Routes.split(",").map((route: string) => (
            <div
              className="rounded-full py-2 px-4 font-bold bg-secondary-300 text-sm text-primary-950"
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
