import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

import { IStopDetails } from "@/interfaces/stop";
import { IReportFrom } from "@/interfaces/from";

interface StopDetailsProps {
  stop: IStopDetails;
  reports: IReportFrom[]
}

export default function StopDetails({ stop, reports }: StopDetailsProps) {
  return (
    <div className="rounded-lg p-2 bg-neutral-200 dark:bg-neutral-900 max-w-screen-sm">
      <div className="flex flex-row justify-between my-2">
        <div className="flex flex-row">
          <p className="text-l md:text-xl font-bold">{stop.StopNo}</p>
          <div className='mx-4'>
            {
              reports.length > 0 && (
                // Magic strings are evil but MUI and tailwind don't play nice
                // #963f3f == error-700
                <ErrorOutlineIcon sx={{ color: '#963f3f' }} />
              )
            }
          </div>
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
