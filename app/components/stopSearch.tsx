import { useState, useContext } from "react";;
import SearchIcon from '@mui/icons-material/Search';
import GpsNotFixedIcon from '@mui/icons-material/GpsNotFixed';
import GpsFixedIcon from '@mui/icons-material/GpsFixed';

import { StopSearchContext } from "@/context/stop";
import { Active } from "@/enums/activeComponent";
import { ErrorText } from "@/enums/activeError";

const axios = require("axios").default;

export default function StopSearch() {
  const { setStop, setStops, setActive, setError } =
    useContext(StopSearchContext);

  const [stopID, setStopID] = useState("");
  const [locationInUse, setLocationInUse] = useState(false);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    submitHandler();
  };

  const handleChange = (id: string) => {
    setStopID(id);

    if (id.length === 5) {
      submitHandler(id); // Stop IDs are 5 characters, search immediately
    }
  };

  const submitHandler = (id: string = stopID) => {
    fetchStopByID(id);
  };

  const getCoords = () => {
    if (navigator.geolocation) {
      setLocationInUse(true);
      navigator.geolocation.getCurrentPosition(
        fetchStopsByLocation,
        navigatorError,
        {
          enableHighAccuracy: true,
          maximumAge: 0,
        }
      );
    } else {
      setError(ErrorText.LocationUnsupported);
      setActive(Active.Error);
    }
  };

  const navigatorError = (error: GeolocationPositionError) => {
    setLocationInUse(false);
    
    switch (error.code) {
      case error.PERMISSION_DENIED:
        setError(ErrorText.LocationDenied);
        setActive(Active.Error);
        break;
      case error.POSITION_UNAVAILABLE:
        setError(ErrorText.LocationUnavailable);
        setActive(Active.Error);
        break;
      default:
        setError(ErrorText.LocationUnknown);
        setActive(Active.Error);
        break;
    }
  };

  const fetchStopByID = (id: string) => {
    setActive(Active.Loading);

    axios
      .get("/api/stops/search", {
        params: {
          stopID: id,
        },
      })
      .then((res: any) => {
        setStop(res.data.data);
        setActive(Active.Selected);
      })
      .catch((err: any) => {
        setActive(Active.Error);
      });
  };

  const fetchStopsByLocation = (position: GeolocationPosition) => {
    setActive(Active.Loading);

    axios
      .get("/api/stops/nearby", {
        params: {
          lat: position.coords.latitude,
          long: position.coords.longitude,
        },
      })
      .then((res: any) => {
        setStops(res.data.data);
        setActive(Active.List);
      })
      .catch((err: any) => {
        setActive(Active.Error);
      })
      .finally(() => {
        setLocationInUse(false);
      });
  };

  return (
    <>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div className="flex flex-row justify-between items-center">
          <div className="flex flex-row w-full py-2 items-center rounded-full border-solid border-2 dark:border-1 border-primary-950 dark:border-white bg-transparent">
            <button
              type="submit"
              className="rounded-full mx-2 p-2 transition-all hover:shadow-lg focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
            >
              <SearchIcon />
            </button>
            <input
              onChange={(e) => handleChange(e.target.value)}
              value={stopID}
              type="number"
              min={0}
              max={99999}
              pattern="[0-9]{5}"
              title="Five digit stop number"
              placeholder="Search by stop number"
              className="rounded-lg m-2 text-primary-950 dark:text-primary-50 bg-transparent outline-none"
            ></input>
          </div>
          <button
            onClick={getCoords}
            type="button"
            className="rounded-full mx-2 p-2 text-primary-50 bg-primary-950 dark:text-primary-950 dark:bg-primary-50 transition-all hover:shadow-lg focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
          >
            {
              locationInUse ? <GpsFixedIcon /> : <GpsNotFixedIcon />
            }
          </button>
        </div>
      </form>
    </>
  );
}
