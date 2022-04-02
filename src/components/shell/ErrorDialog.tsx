import React from "react";
import { useStore } from "effector-react";
import { $dialogError, resetDialogError } from "@application/errors";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";

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
          <DialogContentText
            id="alert-dialog-description"
            className="w-full max-w-xs"
          >
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
