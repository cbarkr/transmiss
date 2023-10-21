'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';

import { IStopDetails } from '@/interfaces/stopdetails';
import { StopListContext, StopSearchContext } from '@/context/stop';


const StopSearch = dynamic(() => import('./components/stopSearch'))
const StopList = dynamic(() => import('./components/stopList'))
const StopSelected = dynamic(() => import('./components/stopSelected'))


const defaultStopState = {
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
  Routes: ''
}


const isStopEmpty = (stop: IStopDetails) => {
  return Number.isNaN(stop.StopNo)
}


export default function Home() {
  const [stop, setStop] = useState<IStopDetails>(defaultStopState)
  const [stops, setStops] = useState<IStopDetails[]>([])
  

  return (
    <div className='flex flex-col items-center'>
      <div className='max-w-screen-sm'>
        <StopSearchContext.Provider value={{ setStop: setStop, setStops: setStops }}>
          <StopSearch />
        </StopSearchContext.Provider>
        { !isStopEmpty(stop) && <StopSelected stop={ stop } /> }
        { (isStopEmpty(stop) && stops.length === 0) && <div className='mt-24 text-center'>Select a stop to get started</div> }
        {
          (isStopEmpty(stop) && stops.length > 0) && (
            <StopListContext.Provider value={{ setStop: setStop }}>
              <StopList stops={stops} />
            </StopListContext.Provider>
          )
        }
      </div>
    </div>
  )
}
