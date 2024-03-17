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
    <div className="flex justify-center items-center fixed inset-0 bg-black bg-opacity-50 backdrop-blur-lg">
      <div className="flex flex-col gap-4 my-1 p-2 w-[80dvw] max-w-screen-xs bg-black border-2">
        <div className="flex flex-col justify-center items-center font-bold">
          <div className="text-xl my-2">
            <CheckCircleIcon fontSize="large" />
          </div>
          <h3 className="text-xl leading-6">
            Report submitted!
          </h3>
        </div>
        <div className="flex flex-col items-center">
          <button
            type="button"
            onClick={handler}
            className="border-2 border-blue-400 text-blue-400 p-2 "
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
