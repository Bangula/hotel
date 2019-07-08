import React, { useState, useEffect } from "react";
import Dialog from "@material-ui/core/Dialog";

const Modal = ({ open, close, ...props }) => {
  return (
    <Dialog
      open={open}
      fullWidth
      onClose={close}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      {props.children}
    </Dialog>
  );
};

export default Modal;
