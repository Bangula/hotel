import React, { useState, useEffect } from "react";
import Room from "@components/rooms/components/Room";

import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

import { getRoomById } from "../../../services/http/endpoints/rooms";

const RoomDetails = ({ id, open, close }) => {
  const [data, setData] = useState({});

  useEffect(() => {
    getData(id);
  }, [id]);

  async function getData(id) {
    const { data, error } = await getRoomById(id);
    if (data) {
      console.log(data);
    } else if (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <Dialog
        open={open}
        fullWidth
        onClose={close}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        {/* <DialogTitle id="alert-dialog-title">
          {"Use Google's location service?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Let Google help apps determine location. This means sending
            anonymous location data to Google, even when no apps are running.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={close} color="primary">
            Disagree
          </Button>
          <Button onClick={close
        } color="primary" autoFocus>
            Agree
          </Button>
        </DialogActions> */}
        <div>
          <Room data={data} fullWidth close={close} />
        </div>
      </Dialog>
    </div>
  );
};

export default RoomDetails;
