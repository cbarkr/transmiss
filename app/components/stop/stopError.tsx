import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

export default function StopError() {
  return (
    <div className="flex flex-row items-center rounded-lg my-1 p-2 bg-reds-800/90">
      <ErrorOutlineIcon sx={{ color: "white" }} />
      <p className="mx-2 text-white">
        Others have reported issues with this stop within the last hour. Submit
        a report to help!
      </p>
    </div>
  );
}
