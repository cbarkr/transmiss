import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

export default function StopWarning() {
  return (
    <div className="flex flex-row items-center rounded-lg my-1 p-2 bg-yellows-200/80">
      <ErrorOutlineIcon className="text-yellows-900" />
      <div className="mx-2 text-yellows-900">
        <p className="text-lg font-bold">Issues have been reported within the last hour</p>
        <p>Submit another report to help!</p>
      </div>
    </div>
  );
}
