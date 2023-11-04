interface IReportButtonProps {
  text: string;
  icon: JSX.Element;
  primaryColour: string;
  secondaryColour: string;
  handler: () => void;
}

export function ReportButton({
  text,
  icon,
  primaryColour,
  secondaryColour,
  handler,
}: IReportButtonProps) {
  return (
    <div
      className={
        "flex-grow basis-1 rounded-full m-1 px-2 py-4 hover:cursor-pointer" +
        " " +
        "bg-" +
        secondaryColour +
        " " +
        "dark:bg-" +
        primaryColour
      }
      onClick={handler}
    >
      <div
        className={
          "flex flex-row justify-center px-12 mx-2 text-center" +
          " " +
          "text-" +
          primaryColour +
          " " +
          "dark:text-" +
          secondaryColour
        }
      >
        {icon}
        <p>{text}</p>        
      </div>
    </div>
  );
}
