interface IReportButtonProps {
  text: string;
  icon: JSX.Element;
  disabled: boolean;
  handler: () => void;
}

export function ReportButton({
  text,
  icon,
  disabled,
  handler,
}: IReportButtonProps) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={handler}
      className="flex-grow basis-1 rounded-full px-2 py-4 hover:cursor-pointer disabled:pointer-events-none disabled:opacity-75 disabled:shadow-none disabled:bg-primary-400/50"
    >
      <div className="flex flex-row justify-center mx-2 text-center text-primary-950 dark:text-primary-200">
        {icon}
        {disabled && <p className="text-sm">{text}</p>}
      </div>
    </button>
  );
}
