import { useContext } from "react";
import dynamic from "next/dynamic";

import { IStopDetails } from "@/interfaces/stop";
import { StopListContext } from "@/context/stop";
import { Active } from "@/enums/activeComponent";

const StopDetails = dynamic(() => import("./stopDetails"));

interface StopListProps {
  stops: IStopDetails[];
}

export default function StopList({ stops }: StopListProps) {
  const { setStop, setActive } = useContext(StopListContext);

  const handleClick = (stop: IStopDetails) => {
    setStop(stop);
    setActive(Active.Selected);
  };

  // NOTE: Stops pre-ordered
  const stopItems = stops.map((stop: IStopDetails) => (
    <div
      onClick={() => handleClick(stop)}
      className="m-1 hover:cursor-pointer"
      key={stop.StopNo}
    >
      <StopDetails stop={stop} reports={[]}/>
    </div>
  ));

  return <div className="m-2">{stopItems}</div>;
}
