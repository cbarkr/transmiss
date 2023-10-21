import { useState, useContext } from "react";
import { Search, NearMe } from "@mui/icons-material";

import { defaultStopState } from "@/models/stop/default";
import { StopSearchContext } from "@/context/stop";

const axios = require("axios").default;

export default function StopSearch() {
  const { setStop, setStops, setIsFetching } = useContext(StopSearchContext);

  const [stopID, setStopID] = useState("");

  const handleSubmit = (e: any) => {
    e.preventDefault();
    submitHandler();
  };

  const submitHandler = (id: string = stopID) => {
    setStops([]); // Reset stops if we're setting a stop
    fetchStopByID(id);
  }

  const handleChange = (id: string) => {
    setStopID(id);
    
    if (id.length === 5) {
      submitHandler(id); // Stop IDs are 5 characters, search immediately
    }
  };

  const handleClick = () => {
    setStop(defaultStopState); // Reset stop if we're querying stops
    getCoords();
  };

  const getCoords = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(fetchStopsByLocation);
    } else {
      // TODO: Error
    }
  };

  const fetchStopByID = (id: string) => {
    setIsFetching(true);
    axios
      .get("/api/stops/search", {
        params: {
          stopID: id,
        },
      })
      .then((res: any) => {
        setStop(res.data.data);
      })
      .catch((err: any) => {
        console.error(err);
      })
      .finally(() => {
        setIsFetching(false);
      });
  };

  const fetchStopsByLocation = (position: GeolocationPosition) => {
    setIsFetching(true);
    axios
      .get("/api/stops/nearby", {
        params: {
          lat: position.coords.latitude,
          long: position.coords.longitude,
        },
      })
      .then((res: any) => {
        setStops(res.data.data);
      })
      .catch((err: any) => {
        console.error(err);
      })
      .finally(() => {
        setIsFetching(false);
      });
  };

  return (
    <>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div className="flex flex-col sm:flex-row justify-between items-center rounded-lg">
          <div className="flex flex-row justify-between items-center rounded-full border-solid border-2 p-2 bg-white">
            <input
              onChange={(e) => handleChange(e.target.value)}
              value={stopID}
              type="text"
              placeholder="Search by stop number"
              className="rounded-lg p-2 text-gray-800 bg-transparent outline-none"
            ></input>
            <button
              type="submit"
              className="rounded-full px-2 bg-black transition-all hover:shadow-lg focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
            >
              <Search fontSize="large" sx={{ color: "white" }}/>
            </button>
          </div>
          <div className="mx-2">or</div>
          <button
            onClick={handleClick}
            type="button"
            className="flex flex-row justify-between items-center rounded-full p-2 bg-white border-solid border-2 transition-all hover:shadow-lg focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
          >
            <p className="text-black">Use location</p>
            <NearMe fontSize="large" sx={{ color: "black" }} />
          </button>
        </div>
      </form>
    </>
  );
}
