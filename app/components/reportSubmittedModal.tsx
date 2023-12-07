import CheckCircleIcon from "@mui/icons-material/CheckCircle";

interface IReportSubmittedModalProps {
  show: boolean;
  handler: () => void;
}

export function ReportSubmittedModal({
  show,
  handler,
}: IReportSubmittedModalProps) {
  if (!show) return;

  return (
    <div className="flex justify-center items-center fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm">
      <div className="flex flex-col my-1 p-2 w-[80dvw] max-w-screen-xs bg-primary-200 rounded-3xl">
        <div className="flex flex-col justify-center items-center">
          <div className="text-xl text-primary-950 my-2">
            <CheckCircleIcon fontSize="large" />
          </div>
          <h3 className="text-xl font-bold leading-6 text-black">
            Report submitted
          </h3>
          <div className="mt-2 px-7 py-3">
            <p className="text-sm text-black">Thank you!</p>
          </div>
        </div>
        <button
          type="button"
          onClick={handler}
          className="flex-grow basis-1 rounded-full px-2 py-4 text-primary-200 bg-primary-950 transition-all hover:shadow-lg focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-75 disabled:shadow-none"
        >
          Ok
        </button>
      </div>
    </div>
  );
}
