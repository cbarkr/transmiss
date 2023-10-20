import { useState, useEffect, useRef, useContext } from "react";
import { IconContext } from "react-icons";
import { FaSearch, FaLocationArrow } from "react-icons/fa";

import { StopSearchContext } from "../page";

const axios = require("axios").default;

export default function StopSearch() {
  const initRef = useRef(true);

  const { setStop, setStops } = useContext(StopSearchContext);

  const [submitStop, setSubmitStop] = useState(false);
  const [stopID, setStopID] = useState("");

  useEffect(() => {
    if (initRef.current) {
      initRef.current = false;
    } else {
      if (submitStop) {
        if (stopID) {
          fetchStopByID(stopID);
        }
        setSubmitStop(false);
      }
    }
  }, [stopID, submitStop]);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setSubmitStop(true);
  };

  const getCoords = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(fetchStopsByLocation);
    } else {
      // TODO: Error
    }
  };

  const fetchStopByID = (id: string) => {
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
      });
  };

  const fetchStopsByLocation = (position: GeolocationPosition) => {
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
      });
  };

  return (
    <div>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div className="flex flex-col sm:flex-row justify-between items-center rounded-lg">
          <div className="flex flex-row justify-between items-center rounded-full border-solid border-2 p-2 bg-white">
            <input
              onChange={(e) => setStopID(e.target.value)}
              value={stopID}
              type="text"
              placeholder="Search by stop number"
              className="rounded-lg p-2 text-gray-800 bg-transparent outline-none"
            ></input>
            <button
              type="submit"
              className="rounded-full px-2 bg-black transition-all hover:shadow-lg focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
            >
              <IconContext.Provider
                value={{ size: "1.5rem", color: "white", className: "m-2" }}
              >
                <FaSearch />
              </IconContext.Provider>
            </button>
          </div>
          <div className="mx-2">or</div>
          <button
            onClick={getCoords}
            type="button"
            className="flex flex-row justify-between items-center rounded-full w-full p-2 bg-white border-solid border-2 transition-all hover:shadow-lg focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
          >
            <div className="text-black">Use location</div>
            <IconContext.Provider
              value={{ size: "1.5rem", color: "black", className: "m-2" }}
            >
              <FaLocationArrow />
            </IconContext.Provider>
          </button>
        </div>
      </form>
    </div>
  );
}
