import { useContext } from "react";
import dynamic from "next/dynamic";

import { IStopDetails } from "@/interfaces/stop";
import { StopSetContext } from "@/context/stop";
import { Active } from "@/enums/activeComponent";

const StopDetails = dynamic(() => import("./stopDetails"));

interface IStopListProps {
  stops: IStopDetails[];
}

export default function StopList({ stops }: IStopListProps) {
  const { setStop, setActive } = useContext(StopSetContext);

  const handleClick = (stop: IStopDetails) => {
    setStop(stop);
    setActive(Active.Selected);
  };

  // NOTE: Stops pre-ordered
  const stopItems = stops.map((stop: IStopDetails) => (
    <div
      key={stop.StopNo}
      onClick={() => handleClick(stop)}
      className="my-1 hover:cursor-pointer"
    >
      <StopDetails stop={stop} />
    </div>
  ));

  return <div className="m-2">{stopItems}</div>;
}
