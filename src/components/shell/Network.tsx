import React, { useEffect, useState } from "react";
import Snackbar, { SnackbarOrigin } from "@mui/material/Snackbar";

const anchorOrigin: SnackbarOrigin = {
  vertical: "bottom",
  horizontal: "center",
};

const Network = () => {
  const [isOnline, setIsOnline] = useState<boolean | null>(null);

  function reset() {
    setIsOnline(null);
  }

  function setNetworkState() {
    setIsOnline(navigator.onLine);
  }

  useEffect(() => {
    window.addEventListener("offline", setNetworkState);
    window.addEventListener("online", setNetworkState);

    return () => {
      window.removeEventListener("offline", setNetworkState);
      window.removeEventListener("online", setNetworkState);
    };
  }, []);

  if (isOnline === null) return null;

  if (isOnline) {
    return (
      <Snackbar
        open
        autoHideDuration={5000}
        onClose={reset}
        anchorOrigin={anchorOrigin}
        message="Restored Internet connection"
      />
    );
  }

  return (
    <Snackbar
      open
      autoHideDuration={5000}
      onClose={reset}
      anchorOrigin={anchorOrigin}
      message="Lost Internet connection"
    />
  );
};

export default Network;
