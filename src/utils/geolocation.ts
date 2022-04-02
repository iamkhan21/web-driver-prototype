import {
  Coordinates,
  CoordinatesArray,
  LocationAccuracy,
} from "@application/geolocation/types";

export function getGeolocation(): Promise<GeolocationCoordinates> {
  const options = {
    enableHighAccuracy: false,
    timeout: 20_000,
  };

  return new Promise((resolve, reject) => {
    function success({ coords }: GeolocationPosition) {
      resolve(coords);
    }

    function error(err: GeolocationPositionError) {
      reject(convertLocationErrorToHR(err));
    }

    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(success, error, options);
    } else {
      reject(new Error("Geolocation not supported"));
    }
  });
}

function convertLocationErrorToHR(error: GeolocationPositionError): Error {
  switch (error.code) {
    case 1:
      return new Error(
        "App can't get location info. The acquisition of the geolocation information failed because the page didn't have the permission to do it."
      );
    case 2:
      return new Error(
        "App can't get location info. The acquisition of the geolocation failed because at least one internal source of position returned an internal error."
      );
    case 3:
      return new Error(
        "App can't get location info. The time allowed to acquire the geolocation was reached before the information was obtained."
      );
    default:
      return new Error("App can't get location info. Unknown error.");
  }
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
