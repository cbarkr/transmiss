import BusAlertIcon from "@mui/icons-material/BusAlert";

export default function Home() {
  return (
    <div className="flex flex-col items-center mx-2">
      <div className="w-[98dvw] max-w-screen-sm">
        <div className="mt-4 flex flex-row"></div>
        <div className="mt-1">
          <div className="h-[25vh] rounded-3xl bg-zinc-700 flex justify-center items-center">
            <div className="flex flex-col items-center gap-2">
              <BusAlertIcon fontSize="large" />
              <h1 className="text-2xl font-bold">Transit missing the mark?</h1>
              <h2 className="text-sm text-gray-200">
                Search for a stop and say something about it
              </h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
