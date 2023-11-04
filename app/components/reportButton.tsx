interface IReportButtonProps {
  text: string;
  icon: JSX.Element;
  bgColourLight: string;
  bgColourDark: string;
  textColourLight: string;
  textColourDark: string;
  handler: () => void;
}

export function ReportButton({
  text,
  icon,
  bgColourLight,
  bgColourDark,
  textColourLight,
  textColourDark,
  handler,
}: IReportButtonProps) {
  return (
    <div
      className={`flex-grow basis-1 rounded-full m-1 px-2 py-4 hover:cursor-pointer ${bgColourLight} ${bgColourDark}`}
      onClick={handler}
    >
      <div
        className={`flex flex-row justify-center px-12 mx-2 text-center ${textColourLight} ${textColourDark}`}
      >
        {icon}
        <p>{text}</p>
      </div>
    </div>
  );
}
