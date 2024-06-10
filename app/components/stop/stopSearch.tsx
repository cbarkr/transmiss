"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import SearchIcon from "@mui/icons-material/Search";

export default function Search() {
  const router = useRouter();
  const [stopID, setStopID] = useState("");  

  const handleSubmit = (e: any) => {
    e.preventDefault();
    submitHandler(stopID);
  };

  const handleNearby = () => {
    // Redirect to nearby stops page
    router.push("/stops/nearby");
  };

  const submitHandler = (id: string) => {
    // Redirect to stop detail page
    router.push(`/stops/${id}`);
  };

  useEffect(() => {
    if (stopID.length === 5) {
      submitHandler(stopID);
    }
  }, [stopID])

  return (
    <div className="w-full">
      <form onSubmit={(e) => handleSubmit(e)}>
        <div className="flex flex-col gap-2">
          <div>
            <label htmlFor="stop-input" className="flex items-start">
              Stop Number
            </label>
            <div className="flex flex-row w-full items-center border-b-2">
              <input
                id="stop-input"
                onChange={(e) => setStopID(e.target.value)}
                value={stopID}
                min={0}
                max={99999}
                pattern="[0-9]{5}"
                type="text"
                inputMode="decimal"
                placeholder="12345"
                className="w-full font-mono bg-transparent outline-none md:text-xl"
              ></input>
              <button type="submit" className="p-2">
                <SearchIcon />
              </button>
            </div>
          </div>
          <div>or</div>
          <div>
            <button
              onClick={handleNearby}
              type="button"
              className="p-2 border-2 rounded-2xl font-mono"
            >
              Use my location
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
