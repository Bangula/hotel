import React, { useState, useEffect } from "react";

import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";

import DateFnsUtils from "@date-io/date-fns";
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import { Button } from "@material-ui/core";

import { getAllRooms } from "../../services/http/endpoints/rooms";

// Components
import RoomList from "./components/RommList";

const Booking = props => {
  const [checkIn, setCheckIn] = useState(new Date());
  const [checkOut, setCheckOut] = useState(new Date());
  const [roomType, setRoomType] = useState(1);
  const [priceFrom, setPriceFrom] = useState("");
  const [priceTo, setPriceTo] = useState("");

  const [wifi, setWifi] = useState(false);
  const [tv, setTv] = useState(false);
  const [ac, setAc] = useState(false);
  const [miniBar, setMiniBar] = useState(false);
  const [balcony, setBalcony] = useState(false);

  const [roomList, setRoomList] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  async function getData() {
    const { data, error } = await getAllRooms();
    if (data) {
      console.log(data.data.data);
      setRoomList(data.data.data);
    } else if (error) {
      console.log(error);
    }
  }

  return (
    <>
      <div className="header-image" />
      <div className="pb-32">
        <h1 className="text-center  text-5xl text-gray-700  z-50 home-header italic">
          Booking
        </h1>
        <div className="filter container mx-auto mt-16">
          <h1 className="text-gray-600 italic py-8 font-semibold">Filter:</h1>
          <div className="">
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <div className="flex flex-wrap">
                <DatePicker
                  value={checkIn}
                  label="Check In Date:"
                  onChange={value => setCheckIn(value)}
                />
                <div className="mx-16">-</div>
                <DatePicker
                  value={checkOut}
                  label="Check Out Date:"
                  onChange={value => setCheckOut(value)}
                />
                <div className="mx-16">-</div>

                <div>
                  <FormControl>
                    <InputLabel htmlFor="age-simple">Number of beds</InputLabel>
                    <Select
                      style={{ width: "200px" }}
                      value={roomType}
                      onChange={value => setRoomType(value)}
                      inputProps={{
                        name: "age",
                        id: "age-simple"
                      }}
                    >
                      <MenuItem value={1}>One bed</MenuItem>
                      <MenuItem value={2}>Two beds</MenuItem>
                      <MenuItem value={3}>Three beds</MenuItem>
                    </Select>
                  </FormControl>
                </div>
              </div>
              <div className="flex flex-wrap mt-16">
                <TextField
                  id="standard-uncontrolled"
                  label="Price from:"
                  defaultValue=""
                  margin="normal"
                />
                <div className="mx-16">-</div>

                <TextField
                  id="standard-uncontrolled"
                  label="Price from:"
                  defaultValue=""
                  margin="normal"
                />
                <div className="flex ml-16">
                  <div
                    id="wifi"
                    onClick={() => setWifi(!wifi)}
                    className={`${
                      wifi ? "text-white bg-teal-500" : "text-black  shadow-md"
                    } text-center py-4 w-24 border border-gray-400 mr-2 fasilities hover:shadow-xl`}
                  >
                    <i className="fas fa-wifi" />
                    <br />
                    <span className="text-xs">WiFi</span>
                  </div>
                  <div
                    id="tv"
                    onClick={() => setTv(!tv)}
                    className={`${
                      tv ? "text-white bg-teal-500" : "text-black  shadow-md "
                    } text-center py-4 w-24 border border-gray-400 mr-2 fasilities hover:shadow-xl`}
                  >
                    <i className="fas fa-tv" />
                    <br />
                    <span className="text-xs">TV</span>
                  </div>
                  <div
                    id="ac"
                    onClick={() => setAc(!ac)}
                    className={`${
                      ac ? "text-white bg-teal-500" : "text-black  shadow-md "
                    } text-center py-4 w-24 border border-gray-400 mr-2 fasilities hover:shadow-xl`}
                  >
                    <i className="fas fa-fan" />
                    <br />
                    <span className="text-xs">A/C</span>
                  </div>
                  <div
                    id="miniBar"
                    onClick={() => setMiniBar(!miniBar)}
                    className={`${
                      miniBar
                        ? "text-white bg-teal-500"
                        : "text-  shadow-md black"
                    } text-center py-4 w-24 border border-gray-400 mr-2 fasilities hover:shadow-xl`}
                  >
                    <i className="fas fa-cocktail" />
                    <br />
                    <span className="text-xs">Mini Bar</span>
                  </div>
                  <div
                    id="balcony"
                    onClick={() => setBalcony(!balcony)}
                    className={`${
                      balcony
                        ? "text-white bg-teal-500"
                        : "text-  shadow-md black"
                    } text-center py-4 w-24 border border-gray-400 mr-2 fasilities hover:shadow-xl`}
                  >
                    <i className="fas fa-building" />
                    <br />
                    <span className="text-xs">Balcony</span>
                  </div>
                </div>
              </div>
              <div className="mt-16">
                <Button variant="contained" color="primary">
                  Search
                </Button>
              </div>
            </MuiPickersUtilsProvider>
          </div>
        </div>
        <div className="container mx-auto mt-16">
          <h1 className="py-16 italic text-gray-600">Available rooms</h1>
          <RoomList data={roomList} />
        </div>
      </div>
    </>
  );
};

export default Booking;
