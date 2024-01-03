import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";

// import { ErrorText } from "@/enums/activeError";
import { IStopDetails } from "@/interfaces/stop";

const axios = require("axios").default;

const StopDetails = dynamic(
  () => import("../../app/components/stop/stopDetails"),
);

export default function Nearby() {
  const mounted = useRef(false);
  const router = useRouter();
  const [stops, setStops] = useState<IStopDetails[]>([]);

  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
      getCoords();
    }
  });

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
      // TODO: Display error
      // setError(ErrorText.LocationUnsupported);
    }
  };

  const navigatorError = (error: GeolocationPositionError) => {
    // TODO: Share state w/ search component
    // setLocationInUse(false);

    switch (error.code) {
      case error.PERMISSION_DENIED:
        // TODO: Display error
        // setError(ErrorText.LocationDenied);
        break;
      case error.POSITION_UNAVAILABLE:
        // TODO: Display error
        // setError(ErrorText.LocationUnavailable);
        break;
      default:
        // TODO: Display error
        // setError(ErrorText.LocationUnknown);
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
        // TODO: Display error
      })
      .finally(() => {
        // TODO: Share state w/ search component
        // setLocationInUse(false);
      });
  };

  const handleClick = (stop: IStopDetails) => {
    // Redirect to stop detail page
    router.push(`/stops/${stop.StopNo}`)
  };

  // NOTE: Stops pre-ordered
  const stopItems = stops.map((stop: IStopDetails) => (
    <div
      key={stop.StopNo}
      onClick={() => handleClick(stop)}
      className="my-1 hover:cursor-pointer"
    >
      <StopDetails stop={stop} />
    </div>
  ));

  return <div className="m-2">{stopItems}</div>;
}
