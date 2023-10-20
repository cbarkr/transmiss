import { useContext } from "react";
import dynamic from 'next/dynamic'

import { IStopDetails } from "@/interfaces/stopdetails";
import { StopListContext } from "../page";


const StopDetails = dynamic(() => import('./StopDetails'))


interface StopListProps {
  stops: IStopDetails[]
}


export default function StopList({ stops }: StopListProps) {
  const { setStop } = useContext(StopListContext);


  const handleClick = (stop: IStopDetails) => {
    setStop(stop)
  }

  // NOTE: Stops pre-ordered
  const stopItems = stops.map((stop: IStopDetails) => 
    <div onClick={() => handleClick(stop)} className="m-1 hover:cursor-pointer" key={stop.StopNo}>
      <StopDetails stop={ stop } />
    </div>
  );

  return <div className="m-2">{stopItems}</div>;
}
