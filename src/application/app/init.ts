import { forward } from "effector";
import {
  $dialogError,
  initApp,
  resetDialogError,
  setDialogError,
} from "@application/app/index";
import { updateUserGeolocation } from "@application/geolocation";

forward({
  from: initApp,
  to: [updateUserGeolocation],
});

$dialogError.reset(resetDialogError).on(setDialogError, (_, error) => error);
