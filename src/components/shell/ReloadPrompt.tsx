import { useRegisterSW } from "virtual:pwa-register/react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Snackbar,
} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

function ReloadPrompt() {
  const {
    offlineReady: [offlineReady, setOfflineReady],
    needRefresh: [needRefresh, setNeedRefresh],
    updateServiceWorker,
  } = useRegisterSW({
    onRegistered(r) {
      // eslint-disable-next-line prefer-template
      console.log("SW Registered: " + r);
    },
    onRegisterError(error) {
      console.log("SW registration error", error);
    },
  });

  const close = () => {
    setOfflineReady(false);
    setNeedRefresh(false);
  };

  if (offlineReady)
    return (
      <Snackbar
        open={true}
        autoHideDuration={5000}
        onClose={close}
        message="App ready to work offline"
        action={
          <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={close}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        }
      />
    );

  if (needRefresh)
    return (
      <Dialog
        open={true}
        onClose={close}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Application updates</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            New content available, <br /> click on reload button to update.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={close}>Close</Button>
          <Button onClick={() => updateServiceWorker(true)} autoFocus>
            Reload
          </Button>
        </DialogActions>
      </Dialog>
    );

  return null;
}

export default ReloadPrompt;
