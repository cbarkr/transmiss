interface IPeopleCounterProps {
  currNum: number;
  handler: (newNum: number) => void;
}

export function PeopleCounter({ currNum, handler }: IPeopleCounterProps) {
  const handleChange = (e: any) => {
    const newNum = Number.parseInt(e);
    handler(newNum > 1 ? newNum : currNum);
  };

  return (
    <div className="flex flex-row items-center text-primary-200 gap-2 w-fit">
      {/* TODO: Consider getting estimate instead? Like https://transitapp.com/rats */}
      <button
        type="button"
        onClick={() => handler(currNum > 1 ? currNum - 1 : 0)}
        className="rounded-full min-w-[3rem] min-h-[3rem] text-xl bg-primary-950 transition-all hover:shadow-lg focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-75 disabled:shadow-none"
      >
        -
      </button>
      <input
        onChange={(e) => handleChange(e.target.value)}
        value={currNum}
        min={0}
        max={100}
        pattern="[0-9]*"
        type="text"
        inputMode="decimal"
        className="rounded-full w-6 bg-transparent outline-none text-center text-black text-2xl font-bold"
      ></input>
      <button
        type="button"
        onClick={() => handler(currNum + 1)}
        className="rounded-full min-w-[3rem] min-h-[3rem] text-xl bg-primary-950 transition-all hover:shadow-lg focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-75 disabled:shadow-none"
      >
        +
      </button>
    </div>
  );
}
