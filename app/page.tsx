'use client';

import { useState } from 'react';
import StopSearch from './components/StopSearch';

export const StopContext = React.createContext(null)

export default function Home() {
  const [stop, setStop] = useState({})
  const [stops, setStops] = useState({})
  

  return (
    <div className='w-full p-24'>
      <div className='flex flex-col items-center justify-between'>
        <StopContext.Provider value={{ stop: stop, stops: stops, setStop: setStop, setStops: setStops }}>
          <StopSearch />
        </StopContext.Provider>
      </div>
      {/* TODO: Render list of retrieved stops */}
    </div>
  )
}
