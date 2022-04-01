import React from "react";
import { useStore } from "effector-react";
import { $dialogError, resetDialogError } from "@application/app";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

const ErrorDialog = () => {
  const error = useStore($dialogError);

  function close() {
    resetDialogError();
  }

  if (error) {
    return (
      <Dialog
        open={true}
        onClose={close}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{error.type}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {error.message}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={close}>Close</Button>
        </DialogActions>
      </Dialog>
    );
  }
  return null;
};

export default ErrorDialog;
