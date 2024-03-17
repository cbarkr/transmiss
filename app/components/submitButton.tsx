interface ISubmitButtonProps {
  disabled: boolean;
  handler: () => void;
}

export function SubmitButton({ disabled, handler }: ISubmitButtonProps) {
  return (
    <div className="flex flex-col items-center">
      <button type="button" disabled={disabled} onClick={handler} className="border-2 border-blue-400 p-2 font-bold text-4xl text-blue-400 hover:underline underline-offset-4">
        Submit →
      </button>
    </div>
  );
}
