interface IPeopleCounterProps {
  currNum: number;
  handler: (newNum: number) => void;
  disabled: boolean;
}

export function PeopleCounter({ currNum, handler, disabled }: IPeopleCounterProps) {
  const handleChange = (e: any) => {
    const newNum = Number.parseInt(e);
    handler(newNum > 1 ? newNum : currNum);
  };

  return (
    <div className="flex flex-row items-center rounded-full text-secondary-200 bg-secondary-950 dark:text-secondary-950 dark:bg-secondary-200 w-fit">
      {/* TODO: Consider getting estimate instead? Like https://transitapp.com/rats */}
      <button
        type="button"
        disabled={disabled}
        onClick={() => handler(currNum > 1 ? currNum - 1 : 0)}
        className="rounded-full py-2 px-4 text-xl transition-all hover:shadow-lg focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-75 disabled:shadow-none"
      >
        -
      </button>
      <input
        onChange={(e) => handleChange(e.target.value)}
        value={currNum}
        type="number"
        min={0}
        max={100}
        pattern="[0-9]*"
        className="rounded-full w-6 bg-transparent outline-none text-center"
      ></input>
      <button
        type="button"
        disabled={disabled}
        onClick={() => handler(currNum + 1)}
        className="rounded-full py-2 px-4 text-xl transition-all hover:shadow-lg focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-75 disabled:shadow-none"
      >
        +
      </button>
    </div>
  );
}
