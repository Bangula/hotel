import React, { useState } from "react";
import room1 from "@assets/images/rooms/room1.jpg";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { useDispatch } from "react-redux";

import DateFnsUtils from "@date-io/date-fns";
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";

import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Alert from "react-s-alert";

import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Fab
} from "@material-ui/core";

const useStyles = makeStyles({
  card: {},
  media: {
    height: 300
  },
  fab: {
    left: "50%",
    transform: "translate(-50%,-50%)"
  }
});

const Room = ({ data, fullWidth, close }) => {
  const [wifi, setWifi] = useState(true);
  const [tv, setTv] = useState(true);
  const [ac, setAc] = useState(false);
  const [miniBar, setMiniBar] = useState(false);
  const [balcony, setBalcony] = useState(false);

  const [services, setServices] = React.useState({
    gym: false,
    sports: false,
    restaurant: false,
    wellness: false
  });
  const [adultNum, setAdultNum] = useState("");
  const [childrenNum, setChildrenNum] = useState("");

  const [state, setState] = React.useState({
    checkIn: new Date(),
    checkOut: new Date()
  });

  const classes = useStyles();
  const dispatch = useDispatch();

  const handleChange = name => event => {
    setServices({ ...services, [name]: event.target.checked });
  };

  const handleSubmit = () => {
    let room = {};
    room.started_at = state.checkIn;
    room.ended_at = state.checkOut;
    room.services = [];
    if (services.gym) room.services.push("gym");
    if (services.sports) room.services.push("sports");
    if (services.restaurant) room.services.push("restaurant");
    if (services.wellness) room.services.push("wellness");
    room.adults = adultNum;
    room.children = childrenNum;
    room.room_id = data.id;
    dispatch({
      type: "ADD_ROOM",
      payload: room
    });

    Alert.success(<i className="fas fa-check" />, {
      effect: "slide",
      timeout: 2000
    });
    console.log(room);
    if (close) close();
  };

  return (
    <div
      className={`${
        fullWidth ? "w-full" : "md:w-6/12"
      } room-item w-full  justify-between px-4 mt-16`}
    >
      <Card className={`${classes.card} hover:shadow-2xl`}>
        <CardMedia
          className={`${classes.media} relative `}
          image={room1}
          title="Room 1"
        />

        <Fab
          variant="extended"
          aria-label="Add"
          color="primary"
          className={`${classes.fab} absolute mx-auto p-6`}
        >
          <Link to="# "> $70/Night</Link>
        </Fab>

        <CardContent>
          <Typography gutterBottom variant="h5" component="h2" align="center">
            {data.room_number}
          </Typography>
          <div>
            <p className="text-center italic mt-4 text-gray-600 text-xl">
              Facilities
            </p>
            <div className="flex flex-wrap justify-center text-center mt-4">
              <div
                id="wifi"
                className={`${
                  wifi ? "text-white bg-teal-500" : "text-black  shadow-md"
                } text-center py-4 w-20 border border-gray-400 mr-2 fasilities`}
              >
                <i className="fas fa-wifi" />
                <br />
                <span className="text-xs">WiFi</span>
              </div>
              <div
                id="tv"
                className={`${
                  tv ? "text-white bg-teal-500" : "text-black  shadow-md "
                } text-center py-4 w-20 border border-gray-400 mr-2 fasilities`}
              >
                <i className="fas fa-tv" />
                <br />
                <span className="text-xs">TV</span>
              </div>
              <div
                id="ac"
                className={`${
                  ac ? "text-white bg-teal-500" : "text-black  shadow-md "
                } text-center py-4 w-20 border border-gray-400 mr-2 fasilities`}
              >
                <i className="fas fa-fan" />
                <br />
                <span className="text-xs">A/C</span>
              </div>
              <div
                id="miniBar"
                className={`${
                  miniBar
                    ? "text-white bg-teal-500"
                    : "text-black  shadow-md black"
                } text-center py-4 w-20 border border-gray-400 mr-2 fasilities`}
              >
                <i className="fas fa-cocktail" />
                <br />
                <span className="text-xs">Mini Bar</span>
              </div>
              <div
                id="balcony"
                className={`${
                  balcony
                    ? "text-white bg-teal-500"
                    : "text-black  shadow-md black"
                } text-center py-4 w-20 border border-gray-400 mr-2 fasilities`}
              >
                <i className="fas fa-building" />
                <br />
                <span className="text-xs">Balcony</span>
              </div>
            </div>
          </div>

          <div className="mt-8">
            <div>
              <p className="italic text-gray-600">Select services:</p>
              <div className="text-center">
                <div className="flex flex-wrap justify-center">
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={services.gym}
                        onChange={handleChange("gym")}
                        value={services.gym}
                        color="primary"
                        inputProps={{
                          "aria-label": "secondary checkbox"
                        }}
                      />
                    }
                    label="Gym"
                  />

                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={services.sports}
                        onChange={handleChange("sports")}
                        value="sports"
                        color="primary"
                        inputProps={{
                          "aria-label": "secondary checkbox"
                        }}
                      />
                    }
                    label="Sports"
                  />

                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={services.restaurant}
                        onChange={handleChange("restaurant")}
                        value="restaurant"
                        color="primary"
                        inputProps={{
                          "aria-label": "secondary checkbox"
                        }}
                      />
                    }
                    label="Restaurant"
                  />

                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={services.wellness}
                        onChange={handleChange("wellness")}
                        value="wellness"
                        color="primary"
                        inputProps={{
                          "aria-label": "secondary checkbox"
                        }}
                      />
                    }
                    label="Wellness"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4">
            <p className="italic text-gray-600 mb-4">Period:</p>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <div className="flex justify-around">
                <DatePicker
                  value={state.checkIn}
                  label="Check In"
                  onChange={value => setState({ ...state, checkIn: value })}
                />
                <DatePicker
                  value={state.checkOut}
                  label="Check Out"
                  onChange={value => setState({ ...state, checkOut: value })}
                />
              </div>
            </MuiPickersUtilsProvider>
          </div>

          <div className="mt-6">
            <p className="italic text-gray-600">Guests number:</p>
            <div className="flex justify-around">
              <TextField
                id="standard-name"
                label="Adults"
                type="number"
                value={adultNum}
                onChange={e => setAdultNum(e.target.value)}
              />
              <TextField
                id="standard-name"
                label="Chldren"
                type="number"
                value={childrenNum}
                onChange={e => setChildrenNum(e.target.value)}
              />
            </div>
          </div>
          <div className="mt-8">
            {close ? (
              <div className="flex flex-end">
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={close}
                  style={{ marginRight: "10px" }}
                >
                  CLOSE
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleSubmit}
                >
                  ADD TO CART
                </Button>
              </div>
            ) : (
              <Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={handleSubmit}
              >
                ADD TO CART
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
      <Alert />
    </div>
  );
};

export default Room;
