'use client';

import { useState } from 'react';
import React from 'react';
import dynamic from 'next/dynamic';


const StopSearch = dynamic(() => import('./components/StopSearch'))
const StopList = dynamic(() => import('./components/StopList'))
const StopDetails = dynamic(() => import('./components/StopDetails'))


export const StopContext = React.createContext({
  stop: {},
  setStop: (stop: {}) => {},
  stops: {},
  setStops: (stops: {}) => {}
})

export const StopListContext = React.createContext({
  stop: {},
  setStop: (stop: {}) => {}
})


const isEmpty = (obj: object) => {
  return Object.keys(obj).length === 0;
}


export default function Home() {
  const [stop, setStop] = useState({})
  const [stops, setStops] = useState({})
  

  return (
    <div className='w-full p-24'>
      <div className='flex flex-col items-center'>
        <StopContext.Provider value={{ stop: stop, stops: stops, setStop: setStop, setStops: setStops }}>
          <StopSearch />
        </StopContext.Provider>
        { !isEmpty(stop) && <StopDetails stop={ stop } /> }
        { (isEmpty(stop) && isEmpty(stops)) && <div>Select a stop to get started</div> }
        {
          (isEmpty(stop) && !(isEmpty(stops))) && (
            <StopListContext.Provider value={{ stop: stop, setStop: setStop }}>
              <StopList stops={stops} />
            </StopListContext.Provider>
          )
        }
      </div>
    </div>
  )
}
