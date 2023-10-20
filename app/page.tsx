'use client';

import { useState } from 'react';
import React from 'react';
import dynamic from 'next/dynamic';

import { IStopDetails } from '@/interfaces/stopdetails';


const StopSearch = dynamic(() => import('./components/StopSearch'))
const StopList = dynamic(() => import('./components/StopList'))
const StopSelected = dynamic(() => import('./components/StopSelected'))


export const StopContext = React.createContext({
  setStop: (stop: IStopDetails) => {},
  setStops: (stops: {}) => {}
})

export const StopListContext = React.createContext({
  setStop: (stop: IStopDetails) => {}
})


const isObjectEmpty = (obj: object) => {
  return Object.keys(obj).length === 0;
}

const isStopEmpty = (stop: IStopDetails) => {
  return Number.isNaN(stop.StopNo)
}


export default function Home() {
  const [stop, setStop] = useState<IStopDetails>({
    StopNo: NaN,
    Name: '',
    BayNo: '',
    City: '',
    OnStreet: '',
    AtStreet: '',
    Latitude: NaN,
    Longitude: NaN,
    WheelchairAccess: NaN,
    Distance: NaN,
    Routes: '',
  })
  const [stops, setStops] = useState({})
  

  return (
    <div className='w-full p-24'>
      <div className='flex flex-col items-center'>
        <StopContext.Provider value={{ setStop: setStop, setStops: setStops }}>
          <StopSearch />
        </StopContext.Provider>
        { !isStopEmpty(stop) && <StopSelected stop={ stop } /> }
        { (isStopEmpty(stop) && isObjectEmpty(stops)) && <div>Select a stop to get started</div> }
        {
          (isStopEmpty(stop) && !(isObjectEmpty(stops))) && (
            <StopListContext.Provider value={{ setStop: setStop }}>
              <StopList stops={stops} />
            </StopListContext.Provider>
          )
        }
      </div>
    </div>
  )
}
