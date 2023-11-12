interface ISubmitButtonProps {
  disabled: boolean;
  handler: () => void;
}

export function SubmitButton({ disabled, handler }: ISubmitButtonProps) {
  return (
    <div className="flex my-2">
      <button
        type="button"
        disabled={disabled}
        onClick={handler}
        className="flex-grow basis-1 rounded-full px-2 py-4 text-primary-200 bg-primary-950 transition-all hover:shadow-lg focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-75 disabled:shadow-none"
      >
        <div className="flex flex-row justify-center">
          <p>Submit</p>
        </div>
      </button>
    </div>
  );
}
