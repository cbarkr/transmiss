import { useState, useContext } from "react";
import { Search, NearMe } from "@mui/icons-material";

import { StopSearchContext } from "@/context/stop";
import { Active } from "@/enums/activeComponent";

const axios = require("axios").default;

export default function StopSearch() {
  const { setStop, setStops, setActive } =
    useContext(StopSearchContext);

  const [stopID, setStopID] = useState("");

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
      navigator.geolocation.getCurrentPosition(
        fetchStopsByLocation,
        navigatorError,
        {
          enableHighAccuracy: true,
          maximumAge: 0
        }
      );
    } else {
      // TODO: Handle when geolocation unsupported by browser
    }
  };

  const navigatorError = () => {
    // TODO: Handle errors
    console.log('error');
  }

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
      });
  };

  return (
    <>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div className="flex flex-col xs:flex-row justify-between items-center">
          <div className="flex flex-row w-full sm:w-fit justify-between items-center rounded-full border-solid border-2 dark:border-1 p-2 bg-transparent">
            <input
              onChange={(e) => handleChange(e.target.value)}
              value={stopID}
              type="number"
              placeholder="Search by stop number"
              className="rounded-lg p-2 text-neutral-800 dark:text-neutral-50 bg-transparent outline-none"
            ></input>
            <button
              type="submit"
              className="rounded-full px-2 transition-all hover:shadow-lg focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
            >
              <Search fontSize="large" />
            </button>
          </div>
          <div className="mx-2 w-full sm:w-fit text-center">or</div>
          <button
            onClick={getCoords}
            type="button"
            className="flex flex-row w-full sm:w-fit justify-between items-center rounded-full p-2 text-neutral-800 dark:text-neutral-50 bg-transparent border-solid border-2 dark:border-1 transition-all hover:shadow-lg focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
          >
            <p className="p-2">Use location</p>
            <NearMe fontSize="large" />
          </button>
        </div>
      </form>
    </>
  );
}
