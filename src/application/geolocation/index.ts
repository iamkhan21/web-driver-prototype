import { app } from "@application/app";

export const $userGeolocation = app.createStore<GeolocationCoordinates | null>(
  null
);

export const updateUserGeolocation = app.createEvent<void>();
export const resetUserGeolocation = app.createEvent<void>();

export const updateUserGeolocationFx = app.createEffect<
  void,
  GeolocationCoordinates
>();
