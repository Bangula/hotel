import React, { useState, useEffect } from "react";

import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";

import "@zendeskgarden/react-pagination/dist/styles.css";
import { ThemeProvider } from "@zendeskgarden/react-theming";
import { Pagination } from "@zendeskgarden/react-pagination";

import DateFnsUtils from "@date-io/date-fns";
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import { Button } from "@material-ui/core";

import { getAllRooms } from "../../services/http/endpoints/rooms";
import { WidthContext } from "@components/common/context/ContextProvider";

// Components
import RoomList from "./components/RommList";
import RoomDetails from "./components/RoomDetails";

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

  const [currentPage, setCurrentPage] = useState(1); //for api
  const [totalPages, setTotalPages] = useState(1);

  const [roomId, setRoomId] = useState("");
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const { windowWidth } = React.useContext(WidthContext);

  useEffect(() => {
    window.scrollTo(0, 0);
    getData(currentPage);
  }, []);

  useEffect(() => {
    if (roomList.length) getData(currentPage);
  }, [currentPage]);

  async function getData(page) {
    const { data, error } = await getAllRooms(page);

    if (data) {
      console.log(data);
      setRoomList(data.data.data);
      setTotalPages(data.data.meta.pagination.total_pages);
    } else if (error) {
      console.log(error.response);
    }
  }

  const handleGetDetails = id => {
    console.log(id);
    setRoomId(id);
    setModalIsOpen(true);
  };

  return (
    <>
      <div className="header-image" />
      <div className="pb-32">
        <h1 className="home-header text-center text-5xl text-gray-600 z-50">
          <i className="fas fa-signature" />
          <br />
          Booking
        </h1>
        <div className="filter container mx-auto mt-2 px-4 md:px-0">
          <h1 className="text-gray-600 italic py-8 font-semibold text-2xl">
            Filter:
          </h1>
          <div className="">
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <div className="flex flex-wrap">
                <DatePicker
                  fullWidth={windowWidth > 768 ? null : true}
                  value={checkIn}
                  label="Check In Date:"
                  onChange={value => setCheckIn(value)}
                />
                <div className="mx-4" />
                <DatePicker
                  fullWidth={windowWidth > 768 ? null : true}
                  value={checkOut}
                  label="Check Out Date:"
                  onChange={value => setCheckOut(value)}
                  style={{ marginTop: windowWidth > 768 ? null : "20px" }}
                />
                <div className="mx-4" />

                <div className="w-full mt-5">
                  <FormControl>
                    <InputLabel htmlFor="age-simple">Number of beds</InputLabel>
                    <Select
                      style={{ width: windowWidth < 768 ? "200px" : "100%" }}
                      value={roomType}
                      onChange={value => setRoomType(value)}
                      inputProps={{
                        name: "age",
                        id: "age-simple"
                      }}
                    >
                      <MenuItem value={1}>One</MenuItem>
                      <MenuItem value={2}>Two</MenuItem>
                      <MenuItem value={3}>Three</MenuItem>
                      <MenuItem value={3}>Four</MenuItem>
                    </Select>
                  </FormControl>
                </div>
              </div>
              <div className="mt-10">
                <h1 className="italic  text-gray-600">Price range:</h1>
                <div className="flex flex-wrap">
                  <TextField
                    id="standard-uncontrolled"
                    label="From"
                    defaultValue=""
                    fullWidth={windowWidth > 768 ? null : true}
                  />
                  <div className="mx-4" />

                  <TextField
                    id="standard-uncontrolled"
                    label="To"
                    defaultValue=""
                    fullWidth={windowWidth > 768 ? null : true}
                  />
                </div>
              </div>

              <div className="mt-8">
                <h1 className="italic  text-gray-600">Select facilites:</h1>
                <div className="flex justify-between md:justify-start mt-4">
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
                    } text-center py-4 w-24 border border-gray-400 fasilities hover:shadow-xl`}
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
        <div className="container mx-auto mt-16 px-2">
          <h1 className="py-8 italic text-gray-600">Available rooms</h1>

          <RoomList data={roomList} handleGetDetails={handleGetDetails} />
          <div className="mt-16">
            <ThemeProvider>
              <Pagination
                totalPages={totalPages}
                currentPage={currentPage}
                onChange={currentPage => {
                  return setCurrentPage(currentPage);
                }}
              />
            </ThemeProvider>
          </div>
        </div>
      </div>
      <RoomDetails
        id={roomId}
        open={modalIsOpen}
        close={() => setModalIsOpen(false)}
      />
    </>
  );
};

export default Booking;
