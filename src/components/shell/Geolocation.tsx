import React, { useEffect, useState } from "react";
import { updateUserGeolocation } from "@application/geolocation";
import { getGeolocation } from "@utils/geolocation";
import { of } from "await-of";
import { setDialogError } from "@application/errors";
import { DialogError, DialogErrors } from "@application/errors/types";

const Geolocation = () => {
  const [startInterval, setStartInterval] = useState(false);

  async function handlePermissionByStatus(status: PermissionStatus) {
    switch (status.state) {
      case "granted": {
        return setStartInterval(true);
      }
      case "prompt": {
        const [, err] = await of(getGeolocation());

        if (!err) {
          return setStartInterval(true);
        }
        const error = new DialogError(
          DialogErrors.Geolocation,
          (err as Error).message
        );

        setDialogError(error);
        return setStartInterval(false);
      }
      case "denied": {
        const error = new DialogError(
          DialogErrors.Geolocation,
          "Please allow access to location for this app."
        );

        setDialogError(error);
        return setStartInterval(false);
      }
    }
  }

  useEffect(() => {
    if ("permissions" in navigator) {
      navigator.permissions
        .query({ name: "geolocation" })
        .then((permissionStatus) => {
          handlePermissionByStatus(permissionStatus);
          permissionStatus.onchange = function () {
            handlePermissionByStatus(permissionStatus);
          };
        });
    }
  }, []);

  useEffect(() => {
    let interval: number | null = null;

    if (startInterval) {
      updateUserGeolocation();
      interval = setInterval(updateUserGeolocation, 60_000);
    }

    return () => {
      if (interval !== null) {
        clearInterval(interval);
      }
    };
  }, [startInterval]);

  return null;
};

export default Geolocation;
