import React, { useState } from "react";
import Event from "./components/Event";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";

import { getAllEvents } from "../../services/http/endpoints/events";

const useStyles = makeStyles(theme => ({
  progress: {
    position: "fixed",
    top: "50%",
    zIndex: "100",
    left: 0,
    right: 0,
    margin: "0 auto",
    transform: "translateY(-50%)"
  }
}));

const Events = () => {
  const [events, setEvents] = React.useState([]);
  const [loader, setLoader] = useState(true);

  React.useEffect(() => {
    document.title = "Quantox Hotel - Events";
  }, []);
  React.useEffect(() => {
    window.scrollTo(0, 0);
    getData();
  }, []);

  const user = useSelector(state => state.user);
  async function getData() {
    const { data, error } = await getAllEvents();
    if (data) {
      console.log(data.data);
      console.log(new Date());
      setEvents(data.data.data);
      setLoader(false);
    } else if (error) {
      console.log(error.response);
    }
  }
  const classes = useStyles();

  const eventsList =
    events.length > 0
      ? events.map((item, index) => {
          return (
            <div key={index} className="mb-16">
              <Event event={item} join={true} />
            </div>
          );
        })
      : null;
  return (
    <div>
      {loader ? <CircularProgress className={classes.progress} /> : null}

      <div className="header-image" />
      <h1 className="home-header text-center text-5xl text-gray-600 z-50">
        <i className="fas fa-user-friends" />
        <br />
        Events
      </h1>
      {user.isAuthenticated ? null : (
        <h1 className="text-2xl text-center italic text-gray-500">
          <Link to="/register" className="underline">
            Register
          </Link>{" "}
          or{" "}
          <Link to="/login" className="underline">
            Login
          </Link>{" "}
          to join the events
        </h1>
      )}

      <div className="container mx-auto mt-32">
        <div className=" w-full justify-between">{eventsList}</div>
      </div>
    </div>
  );
};

export default Events;
