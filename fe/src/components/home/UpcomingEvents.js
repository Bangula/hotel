import React from "react";
import { getAllEvents } from "../../services/http/endpoints/events";
import { Link } from "react-router-dom";

import bgImage from "../../assets/images/events-bg.jpg";

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
              <Event event={item} join={false} />
            </div>
          );
        })
      : null;
  return (
    <div
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundPositionX: "500px",
        backgroundPositionY: "250px",
        paddingBottom: "160px",
        marginTop: "100px"
      }}
      className="bg-no-repeat"
    >
      <div className="mt-32 container mx-auto">
        <h1 className="text-center text-5xl text-gray-700 home-header italic">
          Upcoming events
        </h1>
        <div className="mt-24">{newList}</div>
        <div className="w-full text-left">
          <Link
            to="/events"
            style={{
              transition: "all 0.3s",
              border: "0.5px solid rgba(0,0,0,0.5)"
            }}
            className="font-semibold italic text-center  opacity-50 hover:text-red-800 border  p-2 rounded-lg shadow-md hover:shadow-xl"
          >
            View all events...
          </Link>
        </div>
      </div>
    </div>
  );
};

export default UpcomingEvents;
