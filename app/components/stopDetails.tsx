import { IStopDetails } from "@/interfaces/stop";

interface IStopDetailsProps {
  stop: IStopDetails;
}

export default function StopDetails({ stop }: IStopDetailsProps) {
  return (
    <div className="rounded-lg p-2 bg-gunmetal/10 dark:bg-gunmetal max-w-screen-sm">
      <div className="flex flex-row justify-between my-2">
        <p className="text-l md:text-xl font-bold">{stop.StopNo}</p>
        <div className="flex flex-row">
          {stop.Routes.split(",").map((route: string) => (
            <div
              key={route}
              className="rounded-lg py-2 px-4 mx-1 font-bold bg-primary-200 text-sm text-primary-950"
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
