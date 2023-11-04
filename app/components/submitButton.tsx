import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

interface ISubmitButtonProps {
  submitted: boolean;
  handler: () => void;
}

export function SubmitButton({ submitted, handler }: ISubmitButtonProps) {
  return (
    <div className="flex justify-end items-center my-2">
      <button
        type="button"
        disabled={submitted}
        onClick={handler}
        className="flex-grow basis-1 rounded-full py-2 px-4 text-greens-300 bg-greens-950 dark:text-greens-950 dark:bg-greens-300 transition-all hover:shadow-lg focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
      >
        {submitted ? (
          <CheckCircleIcon />
        ) : (
          <div className="flex flex-row justify-between">
            <p>Submit</p>
            <ArrowForwardIcon />
          </div>
        )}
      </button>
    </div>
  );
}
