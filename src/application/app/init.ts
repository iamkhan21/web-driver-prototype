import { forward } from "effector";
import { initApp } from "@application/app/index";

forward({
  from: initApp,
  to: [],
});
