import React, { useState } from "react";
import room1 from "@assets/images/rooms/room1.jpg";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { useSelector, useDispatch } from "react-redux";

import moment from "moment";

import DateFnsUtils from "@date-io/date-fns";
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";

import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Alert from "react-s-alert";

import Modal from "@common/modal";
import ModalContent from "./ModalContent";

import { WidthContext } from "@components/common/context/ContextProvider";
import { getServices } from "@endpoints/services";

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
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [adultNum, setAdultNum] = useState("");
  const [childrenNum, setChildrenNum] = useState("");
  const [services, setServices] = React.useState([]);
  const [selectedServices, setSelectedServices] = useState([]);
  const [state, setState] = React.useState({
    checkIn: new Date(),
    checkOut: new Date()
  });

  React.useEffect(() => {
    window.scrollTo(0, 0);
    getAllServices();
  }, []);

  const { windowWidth } = React.useContext(WidthContext);

  const isAuthenticated = useSelector(state => state.user.isAuthenticated);
  const classes = useStyles();
  const dispatch = useDispatch();

  const handleChange = id => {
    if (!selectedServices.includes(id)) {
      setSelectedServices([...selectedServices, id]);
    } else {
      let newArr = [...selectedServices];
      let index = newArr.indexOf(id);
      newArr.splice(index, 1);
      setSelectedServices(newArr);
    }
  };

  async function getAllServices() {
    const { data, error } = await getServices();
    if (data) {
      console.log(data);
      setServices(data.data.data);
    } else if (error) {
      console.log(error.response);
    }
  }

  const handleSubmit = () => {
    if (!isAuthenticated) {
      setModalIsOpen(true);
    } else {
      let room = {};
      room.started_at = moment(state.checkIn).format("YYYY-MM-DD");
      room.ended_at = moment(state.checkOut).format("YYYY-MM-DD");
      room.services = selectedServices;

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

  const servicesList = services.length
    ? services.map(item => {
        return (
          <FormControlLabel
            key={item.id}
            control={
              <Checkbox
                onChange={() => handleChange(item.id)}
                color="primary"
                inputProps={{
                  "aria-label": "secondary checkbox"
                }}
              />
            }
            label={item.name}
          />
        );
      })
    : null;

  const facilitiesList =
    Object.keys(data).length > 0
      ? data.facilities.data.map(item => {
          return (
            <span
              key={item.id}
              className="border-r border-gray-400 px-4 px-2 text-gray-600 italic"
            >
              {item.name}
            </span>
          );
        })
      : null;

  return (
    <>
      <div
        className={`${
          fullWidth ? "w-full" : "md:w-6/12"
        } room-item w-full justify-between px-0 mt-16`}
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
            <Link to="# ">
              {`${
                Object.keys(data).length > 0
                  ? data.roomType.data.price_adult
                  : null
              }`}
              $ /Night
            </Link>
          </Fab>

          <CardContent>
            <Typography gutterBottom variant="h5" component="h2" align="center">
              {Object.keys(data).length > 0 ? data.roomType.data.name : null}
            </Typography>
            <div>
              <p className="text-center italic mt-4 text-gray-600 text-xl">
                Facilities
              </p>
              <div className="flex flex-wrap justify-center text-center mt-4">
                {facilitiesList}
              </div>
            </div>

            <div className="mt-8">
              <div>
                <p className="italic text-gray-600">Select services:</p>
                <div className="text-center">
                  <div className="flex flex-wrap justify-center ">
                    {servicesList}
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
            <div className="mt-8 ">
              {close ? (
                <div className="flex flex-end w-full">
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
