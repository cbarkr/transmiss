"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";

import { CircularProgress } from "@mui/material";
import { LocationError } from "@/enums/errors";
import { IStopDetails } from "@/interfaces/stop";

const axios = require("axios").default;

const StopDetails = dynamic(() => import("../../components/stop/stopDetails"));

const StopError = dynamic(() => import("../../components/stop/stopError"));

export default function Nearby() {
  const router = useRouter();
  const [stops, setStops] = useState<IStopDetails[]>([]);
  const [loading, setLoading] = useState(false);
  const [invalid, setInvalid] = useState(false);
  const [invalidMessage, setInvalidMessage] = useState("");

  useEffect(() => {
    getCoords();
  }, []);

  const getCoords = () => {
    if (navigator.geolocation) {
      // TODO: Share state w/ search component
      // setLocationInUse(true);
      navigator.geolocation.getCurrentPosition(
        fetchStopsByLocation,
        navigatorError,
        {
          enableHighAccuracy: true,
          maximumAge: 0,
        },
      );
    } else {
      setInvalid(true);
      setInvalidMessage(LocationError.LocationUnsupported);
    }
  };

  const navigatorError = (error: GeolocationPositionError) => {
    // TODO: Share state w/ search component
    // setLocationInUse(false);

    switch (error.code) {
      case error.PERMISSION_DENIED:
        setInvalid(true);
        setInvalidMessage(LocationError.LocationDenied);
        break;
      case error.POSITION_UNAVAILABLE:
        setInvalid(true);
        setInvalidMessage(LocationError.LocationUnavailable);
        break;
      default:
        setInvalid(true);
        setInvalidMessage(LocationError.LocationUnknown);
        break;
    }
  };

  const fetchStopsByLocation = (position: GeolocationPosition) => {
    setLoading(true);

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
        setInvalid(true);
        setInvalidMessage(LocationError.LocationUnknown);
      })
      .finally(() => {
        setLoading(false);
        // TODO: Share state w/ search component
        // setLocationInUse(false);
      });
  };

  const handleClick = (id: number) => {
    // Redirect to stop detail page
    router.push(`/stops/${id}`);
  };

  // NOTE: Stops pre-ordered
  const stopItems = stops.map((stop: IStopDetails) => (
    <div
      key={stop.StopNo}
      onClick={() => handleClick(stop.StopNo)}
      className="my-2 hover:cursor-pointer"
    >
      <StopDetails stop={stop} />
    </div>
  ));

  return (
    <div className="mt-2">
      {loading && (
        <div className="flex flex-col items-center">
          <CircularProgress color="inherit" />
        </div>
      )}
      {invalid && <StopError error={invalidMessage} />}
      {!loading && !invalid && <>{stopItems}</>}
    </div>
  );
}
