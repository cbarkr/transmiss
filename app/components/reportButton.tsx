interface IReportButtonProps {
  text: string;
  icon: JSX.Element;
  bgColourLight: string;
  bgColourDark?: string;
  textColourLight: string;
  textColourDark?: string;
  disabled: boolean;
  handler: () => void;
}

export function ReportButton({
  text,
  icon,
  bgColourLight,
  bgColourDark,
  textColourLight,
  textColourDark,
  disabled,
  handler,
}: IReportButtonProps) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={handler}
      className={`flex-grow basis-1 rounded-full m-1 px-2 py-4 hover:cursor-pointer disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none ${bgColourLight} ${bgColourDark}`}
    >
      <div
        className={`flex flex-row justify-center px-12 mx-2 text-center ${textColourLight} ${textColourDark}`}
      >
        {icon}
        <p>{text}</p>
      </div>
    </button>
  );
}
