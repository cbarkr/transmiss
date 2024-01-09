"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";

// import { ErrorText } from "@/enums/activeError";
import { IStopDetails } from "@/interfaces/stop";

const axios = require("axios").default;

const StopDetails = dynamic(
  () => import("../../components/stop/stopDetails"),
);

export default function Nearby() {
  const router = useRouter();
  const [stops, setStops] = useState<IStopDetails[]>([]);

  useEffect(() => {
    getCoords();
  }, [])

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
      // TODO: Display error ErrorText.LocationUnsupported
    }
  };

  const navigatorError = (error: GeolocationPositionError) => {
    // TODO: Share state w/ search component
    // setLocationInUse(false);

    switch (error.code) {
      case error.PERMISSION_DENIED:
        // TODO: Display error ErrorText.LocationDenied
        break;
      case error.POSITION_UNAVAILABLE:
        // TODO: Display error ErrorText.LocationUnavailable
        break;
      default:
        // TODO: Display error ErrorText.LocationUnknown
        break;
    }
  };

  const fetchStopsByLocation = (position: GeolocationPosition) => {
    // TODO: Loading bar

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
        // TODO: Display error ErrorText.LocationUnknown
      })
      .finally(() => {
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

  return <div className="mt-2">{stopItems}</div>;
}
