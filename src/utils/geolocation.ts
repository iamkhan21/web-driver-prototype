export type Longitude = number;
export type Latitude = number;
export type LocationAccuracy = number;

export type Coordinates = {
  lng: Longitude;
  lat: Latitude;
};

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

export type CoordinatesArray = [Longitude, Latitude];

export function convertCoordinatesObjectToArray(
  coordinates: Coordinates
): CoordinatesArray {
  return [coordinates.lng, coordinates.lat];
}
