import React from "react";
import { getAllEvents } from "../../services/http/endpoints/events";
import { Link } from "react-router-dom";

// Components
import Event from "../events/components/Event";

const UpcomingEvents = () => {
  const [events, setEvents] = React.useState([]);

  React.useEffect(() => {
    getData();
  }, []);
  async function getData() {
    const { data, error } = await getAllEvents();
    if (data) {
      let newList = [];
      newList.push(data.data.data[0]);
      newList.push(data.data.data[1]);
      setEvents(newList);
    } else if (error) {
      console.log(error.response);
    }
  }
  const newList =
    events.length > 1
      ? events.map((item, index) => {
          return (
            <div key={index} className="md:w-8/12 mb-16">
              <Event event={item} />
            </div>
          );
        })
      : null;
  return (
    <div className="mt-32 container mx-auto">
      <h1 className="text-center text-5xl text-gray-700 home-header">
        Upcoming events
      </h1>
      <div className="mt-24">{newList}</div>
      <div className="w-full text-center">
        <Link
          to="/events"
          className="font-semibold italic text-center  opacity-50 hover:text-red-800 border border-gray-600 p-2 rounded-lg shadow-md hover:shadow-xl"
        >
          View all events...
        </Link>
      </div>
    </div>
  );
};

export default UpcomingEvents;
