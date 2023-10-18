import { useState, useEffect, useRef, useContext } from 'react';
import { IconContext } from 'react-icons';
import { BiCurrentLocation } from 'react-icons/bi';

import { StopContext } from '../page'

const axios = require('axios').default;

type LocationDataType = {
  lat: number,
  lon: number
}

export default function StopSearch() {
  const initRef = useRef(true)


  const {stop, stops, setStop, setStops } = useContext(StopContext)


  const [submitStop, setSubmitStop] = useState(false)
  const [submitLocation, setSubmitLocation] = useState(false)
  const [stopID, setStopID] = useState('')
  const [location, setLocation] = useState<LocationDataType>()

  useEffect(() => {
    if (initRef.current) {
      initRef.current = false
    }

    else {
      if (submitStop) {
        if (stopID) {
          fetchStopByID(stopID)
        }
        setSubmitStop(false)
      }
      if (submitLocation) {
        if (location) {
          fetchStopsByLocation(location)
        }
        setSubmitLocation(false)
      }
    }
  }, [stopID, location, submitStop, submitLocation])


  const handleSubmit = (e: any) => {
    e.preventDefault()
    setSubmitStop(true)
  }

  const handleClick = () => {
    setSubmitLocation(true)
    getCoords()
  }

  function getCoords() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(setCoords)
    } else {
      // TODO: Error
    }
  }

  function setCoords(position: GeolocationPosition) {
    setLocation({
      lat: position.coords.latitude,
      lon: position.coords.longitude
    })
  }

  function fetchStopByID(id: string) {
    axios.get('/api/stops/search', {
      params: {
        stopID: id
      }
    })
    .then((res: any) => {
      console.log(res)

      setStop(res.data)
    })
    .catch((err: any) => {
      console.error(err)
    })
  }

  function fetchStopsByLocation(location: LocationDataType) {
    axios.get('/api/stops/nearby', {
      params: {
        lat: location.lat,
        lon: location.lon
      }
    })
    .then((res: any) => {
      console.log(res)

      setStops(res.data)
    })
    .catch((err: any) => {
      console.error(err)
    })
  }

  return (
    <div>
      <form onSubmit={e => handleSubmit(e)} className='flex flex-row rounded bg-white'>
        <input onChange={e => setStopID(e.target.value)} value={stopID} type='text' placeholder='Stop number' className='shadow border rounded p-2 text-gray-800 focus:outline-none'></input>
        <button onClick={handleClick} type='button'>
          <IconContext.Provider value={{ size: '2rem', color: 'black', className:'m-2' }}>
            <BiCurrentLocation />
          </IconContext.Provider>
        </button>
      </form>
    </div>
  )
}