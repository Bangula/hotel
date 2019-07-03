import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";

import { updateUserInfo } from "../../../services/http/endpoints/users";

const InputModal = ({ open, close, infoField, userId, getUserData }) => {
  const [editValue, setEditValue] = React.useState("");

  const handleSubmit = async () => {
    console.log(infoField);
    const { data, error } = await updateUserInfo(
      { [infoField]: editValue },
      userId
    );
    if (data) {
      console.log(data);
      getUserData();
    } else if (error) {
      console.log(error.response);
    }
    close();
  };

  return (
    <div>
      <Dialog open={open} onClose={close} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">
          Edit {infoField && infoField}
        </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            type="text"
            onChange={e => setEditValue(e.target.value)}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={close} color="primary">
            Close
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default InputModal;
