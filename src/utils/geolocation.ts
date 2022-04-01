import {
  Coordinates,
  CoordinatesArray,
  LocationAccuracy,
} from "@application/geolocation/types";

export function getGeolocation(): Promise<GeolocationCoordinates> {
  const timeout = 5_000;

  const options = {
    enableHighAccuracy: true,
    timeout: timeout,
    maximumAge: timeout,
  };

  return new Promise((resolve, reject) => {
    function success({ coords }: GeolocationPosition) {
      resolve(coords);
    }

    function error(err: GeolocationPositionError) {
      reject(err);
    }

    navigator.geolocation.getCurrentPosition(success, error, options);
  });
}

export function getCoordinates(
  location: GeolocationCoordinates | null
): Coordinates | null {
  if (!location) return null;
  return { lng: location.longitude, lat: location.latitude };
}

export function getAccuracy(
  location: GeolocationCoordinates | null
): LocationAccuracy | null {
  if (!location) return null;
  return location.accuracy;
}

export function convertCoordinatesObjectToArray(
  coordinates: Coordinates
): CoordinatesArray {
  return [coordinates.lng, coordinates.lat];
}
