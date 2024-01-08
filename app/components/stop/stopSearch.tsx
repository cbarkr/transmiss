"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import SearchIcon from "@mui/icons-material/Search";
import GpsNotFixedIcon from "@mui/icons-material/GpsNotFixed";
import GpsFixedIcon from "@mui/icons-material/GpsFixed";

export default function Search() {
  const router = useRouter();
  const [stopID, setStopID] = useState("");

  // TODO: Share state with nearby page
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

  const handleNearby = () => {
    // Redirect to nearby stops page
    router.push("/stops/nearby");
  };

  const submitHandler = (id: string = stopID) => {
    // Redirect to stop detail page
    router.push(`/stops/${id}`);
  };

  return (
    <div className="w-full">
      <form onSubmit={(e) => handleSubmit(e)}>
        <div className="flex flex-row gap-1 items-center">
          <div className="flex flex-row w-full items-center rounded-full bg-white text-black">
            <button
              type="submit"
              className="rounded-full mx-2 p-2 transition-all hover:shadow-lg focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-75 disabled:shadow-none"
            >
              <SearchIcon />
            </button>
            <input
              onChange={(e) => handleChange(e.target.value)}
              value={stopID}
              min={0}
              max={99999}
              pattern="[0-9]{5}"
              type="text"
              inputMode="decimal"
              placeholder="Search by stop number"
              className="w-full rounded-3xl m-2 pl-2 bg-transparent outline-none text-black"
            ></input>
            <button
              onClick={handleNearby}
              type="button"
              className="rounded-full m-2 p-2 transition-all hover:shadow-lg focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-75 disabled:shadow-none"
            >
              {locationInUse ? <GpsFixedIcon /> : <GpsNotFixedIcon />}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
