import { forward, fromObservable } from "effector";
import {
  $userGeolocation,
  resetUserGeolocation,
  updateUserGeolocation,
  updateUserGeolocationFx,
} from "@application/geolocation/index";
import { of } from "await-of";
import { getGeolocation } from "@utils/geolocation";
import { interval } from "rxjs";
import { setDialogError } from "@application/app";
import { DialogError, DialogErrors } from "@application/app/types";

updateUserGeolocationFx.use(async () => {
  const [location, err] = await of(getGeolocation());

  if (err) {
    const error = new DialogError(
      DialogErrors.Geolocation,
      (err as Error).message
    );
    setDialogError(error);
    throw error;
  }

  return location!;
});

forward({
  from: fromObservable(interval(30_000)),
  to: updateUserGeolocationFx,
});

forward({
  from: updateUserGeolocation,
  to: updateUserGeolocationFx,
});

$userGeolocation
  .reset(resetUserGeolocation)
  .on([updateUserGeolocationFx.doneData], (_, location) => location)
  .on([updateUserGeolocationFx.fail], () => null);
