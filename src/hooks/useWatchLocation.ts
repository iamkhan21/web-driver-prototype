import { useEffect, useRef, useState } from "react";

const defaultOptions: PositionOptions = {
  enableHighAccuracy: false,
  timeout: 20_000,
  maximumAge: 10_000,
};

const useWatchLocation = (options = defaultOptions) => {
  // store location in state
  const [location, setLocation] = useState<GeolocationCoordinates | null>(null);
  // store error message in state
  const [error, setError] = useState<string>("");
  // save the returned id from the geolocation's `watchPosition` to be able to cancel the watch instance
  const locationWatchId = useRef<number>();

  // Success handler for geolocation's `watchPosition` method
  const handleSuccess = (pos: GeolocationPosition) => {
    setLocation(pos.coords);
  };

  // Error handler for geolocation's `watchPosition` method
  const handleError = (error: GeolocationPositionError) => {
    setError(error.message);
  };

  // Clears the watch instance based on the saved watch id
  const cancelLocationWatch = () => {
    const { geolocation } = navigator;

    if (locationWatchId.current && geolocation) {
      geolocation.clearWatch(locationWatchId.current);
    }
  };

  useEffect(() => {
    const { geolocation } = navigator;

    // If the geolocation is not defined in the used browser we handle it as an error
    if (!geolocation) {
      setError("Geolocation is not supported.");
      return;
    }

    // Start to watch the location with the Geolocation API
    locationWatchId.current = geolocation.watchPosition(
      handleSuccess,
      handleError,
      options
    );

    // Clear the location watch instance when React unmounts the used component
    return cancelLocationWatch;
  }, [options]);

  return { location, error, cancelLocationWatch };
};

export default useWatchLocation;
