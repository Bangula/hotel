import React, { useState } from "react";
import room1 from "@assets/images/rooms/room1.jpg";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { useSelector, useDispatch } from "react-redux";

import DateFnsUtils from "@date-io/date-fns";
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";

import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Alert from "react-s-alert";

import Modal from "@common/modal";
import ModalContent from "./ModalContent";

import { WidthContext } from "@components/common/context/ContextProvider";

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

const Room = ({ data, fullWidth, close, open }) => {
  const [wifi, setWifi] = useState(true);
  const [tv, setTv] = useState(true);
  const [ac, setAc] = useState(false);
  const [miniBar, setMiniBar] = useState(false);
  const [balcony, setBalcony] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [adultNum, setAdultNum] = useState("");
  const [childrenNum, setChildrenNum] = useState("");
  const [services, setServices] = React.useState({
    gym: false,
    sports: false,
    restaurant: false,
    wellness: false
  });
  const [state, setState] = React.useState({
    checkIn: new Date(),
    checkOut: new Date()
  });

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { windowWidth } = React.useContext(WidthContext);

  const isAuthenticated = useSelector(state => state.user.isAuthenticated);
  const classes = useStyles();
  const dispatch = useDispatch();

  const handleChange = name => event => {
    setServices({ ...services, [name]: event.target.checked });
  };

  const handleSubmit = () => {
    if (!isAuthenticated) {
      setModalIsOpen(true);
    } else {
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
    }
  };

  return (
    <>
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
              No. {data.room_number}
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
                  } text-center py-4 w-20 border border-gray-400 mr-2 fasilities mb-2 md:mb-0 `}
                >
                  <i className="fas fa-wifi" />
                  <br />
                  <span className="text-xs">WiFi</span>
                </div>
                <div
                  id="tv"
                  className={`${
                    tv ? "text-white bg-teal-500" : "text-black  shadow-md "
                  } text-center py-4 w-20 border border-gray-400 mr-2 fasilities mb-2 md:mb-0`}
                >
                  <i className="fas fa-tv" />
                  <br />
                  <span className="text-xs">TV</span>
                </div>
                <div
                  id="ac"
                  className={`${
                    ac ? "text-white bg-teal-500" : "text-black  shadow-md "
                  } text-center py-4 w-20 border border-gray-400 mr-2 fasilities mb-2 md:mb-0`}
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
                  } text-center py-4 w-20 border border-gray-400 mr-2 fasilities mb-2 md:mb-0`}
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
                  } text-center py-4 w-20 border border-gray-400 mr-2 fasilities mb-2 md:mb-0`}
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
                  <div className="flex flex-wrap justify-center ">
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
                <div className="flex justify-around flex-col md:flex-row">
                  <DatePicker
                    value={state.checkIn}
                    label="Check In"
                    onChange={value => setState({ ...state, checkIn: value })}
                  />
                  <DatePicker
                    value={state.checkOut}
                    style={{ marginTop: windowWidth > 768 ? null : "20px" }}
                    label="Check Out"
                    onChange={value => setState({ ...state, checkOut: value })}
                  />
                </div>
              </MuiPickersUtilsProvider>
            </div>

            <div className="mt-6">
              <p className="italic text-gray-600">Guests number:</p>
              <div className="flex justify-around flex-col md:flex-row">
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
      <Modal open={modalIsOpen} close={setModalIsOpen}>
        <ModalContent close={() => setModalIsOpen(false)} />
      </Modal>
    </>
  );
};

export default Room;
