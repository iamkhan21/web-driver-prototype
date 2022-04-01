import { forward } from "effector";
import {
  $userGeolocation,
  resetUserGeolocation,
  updateUserGeolocation,
  updateUserGeolocationFx,
} from "@application/geolocation/index";
import { of } from "await-of";
import { getGeolocation } from "@utils/geolocation";

updateUserGeolocationFx.use(async () => {
  const [location, err] = await of(getGeolocation());

  if (err) throw err;

  if (!location) throw new Error("Can't get geolocation");

  return location;
});

forward({
  from: updateUserGeolocation,
  to: updateUserGeolocationFx,
});

$userGeolocation
  .reset(resetUserGeolocation)
  .on([updateUserGeolocationFx.doneData], (_, location) => location)
  .on([updateUserGeolocationFx.fail], () => null);
