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
    <div className="flex flex-row items-center gap-2 w-fit ">
      ↳
      {/* TODO: Consider getting estimate instead? Like https://transitapp.com/rats */}
      <button
        type="button"
        onClick={() => handler(currNum > 1 ? currNum - 1 : 0)}
        className="text-2xl font-bold min-w-[3rem] min-h-[3rem]"
      >
        -
      </button>
      /
      <input
        onChange={(e) => handleChange(e.target.value)}
        value={currNum}
        min={0}
        max={100}
        pattern="[0-9]*"
        type="text"
        inputMode="decimal"
        className="w-12 bg-transparent outline-none text-center text-white text-xl font-bold font-mono"
      ></input>
      /
      <button
        type="button"
        onClick={() => handler(currNum + 1)}
        className="text-2xl font-bold min-w-[3rem] min-h-[3rem]"
      >
        +
      </button>
    </div>
  );
}
