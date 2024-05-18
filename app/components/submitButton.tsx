interface ISubmitButtonProps {
  disabled: boolean;
  handler: () => void;
}

export function SubmitButton({ disabled, handler }: ISubmitButtonProps) {
  return (
    <div className="flex flex-col items-center">
      <button
        type="button"
        disabled={disabled}
        onClick={handler}
        className={`border-2 rounded-2xl p-2 font-mono text-xl hover:underline underline-offset-4 ${
          disabled
            ? "border-blue-400/75 text-blue-400/75"
            : "border-blue-400 text-blue-400"
        }`}
      >
        Submit report
      </button>
    </div>
  );
}
