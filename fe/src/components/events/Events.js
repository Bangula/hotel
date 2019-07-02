import React from "react";
import Event from "./components/Event";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import bgImage from "../../assets/images/events-bg.jpg";

import { getAllEvents } from "../../services/http/endpoints/events";

const Events = () => {
  const [events, setEvents] = React.useState([]);

  React.useEffect(() => {
    getData();
  }, []);
  const user = useSelector(state => state.user);
  async function getData() {
    const { data, error } = await getAllEvents();
    if (data) {
      setEvents(data.data.data);
    } else if (error) {
      console.log(error.response);
    }
  }

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
