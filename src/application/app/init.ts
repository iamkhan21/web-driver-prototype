import { forward, fromObservable } from "effector";
import { initApp } from "@application/app/index";
import { updateUserGeolocation } from "@application/geolocation";
import { interval } from "rxjs";

forward({
  from: initApp,
  to: [updateUserGeolocation],
});

forward({
  from: fromObservable(interval(30_000)),
  to: updateUserGeolocation,
});
