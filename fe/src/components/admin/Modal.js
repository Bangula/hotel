import React from "react";

import {
  Button,
  useTheme,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  useMediaQuery
} from "@material-ui/core";

export default function AdminModal(props) {
  // const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  // function handleClickOpen() {
  //   setOpen(true);
  // }

  // function handleClose() {
  //   setOpen(false);
  // }

  return (
    <div>
      <Dialog
        fullScreen={fullScreen}
        open={props.open}
        onClose={props.handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          {props.modalHeader}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>{props.modalText}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              props.userAction();
              props.handleClose();
              if (props.additionAction) props.additionAction();
            }}
            color="secondary"
            variant="outlined"
          >
            Agree
          </Button>
          <Button
            onClick={props.handleClose}
            color="primary"
            variant="outlined"
          >
            Disagree
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
