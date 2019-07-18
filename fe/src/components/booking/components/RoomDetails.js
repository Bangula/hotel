import React, { useState, useEffect } from "react";
import Room from "@components/rooms/components/Room";
import Drawer from "@material-ui/core/Drawer";

// import Dialog from "@material-ui/core/Dialog";

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
      setData(data.data.data);
    } else if (error) {
      console.log(error.response);
    }
  }

  return (
    <div>
      {/* <Dialog
        open={open}
        fullWidth
        onClose={close}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <div>
          <Room data={data} fullWidth close={close} />
        </div>
      </Dialog> */}
      <Drawer anchor="right" open={open} onClose={close}>
        <div style={{ maxWidth: "600px", margin: "0 auto" }}>
          <Room data={data} fullWidth close={close} />
        </div>
      </Drawer>
    </div>
  );
};

export default RoomDetails;
