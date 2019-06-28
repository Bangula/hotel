import React from "react";
import Event from "./components/Event";

import { getAllEvents } from "../../services/http/endpoints/events";

const Events = () => {
  const [events, setEvents] = React.useState([]);
  React.useEffect(() => {
    getData();
  }, []);
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
            <div key={index} className=" " style={{ width: "48%" }}>
              <Event event={item} />
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
      <div className="container mx-auto mt-32">
        <div className="flex w-full justify-between">{eventsList}</div>
      </div>
    </div>
  );
};

export default Events;
