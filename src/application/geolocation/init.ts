import { forward } from "effector";
import {
  $userGeolocation,
  resetUserGeolocation,
  updateUserGeolocation,
  updateUserGeolocationFx,
} from "@application/geolocation/index";
import { of } from "await-of";
import { getGeolocation } from "@utils/geolocation";
import { setDialogError } from "@application/errors";
import { DialogError, DialogErrors } from "@application/errors/types";

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
  from: updateUserGeolocation,
  to: updateUserGeolocationFx,
});

$userGeolocation
  .reset(resetUserGeolocation)
  .on([updateUserGeolocationFx.doneData], (_, location) => location)
  .on([updateUserGeolocationFx.fail], () => null);
