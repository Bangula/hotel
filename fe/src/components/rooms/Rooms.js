import React, { useState, useEffect } from "react";
import { getAllRooms } from "../../services/http/endpoints/rooms";

// Components
import Room from "./components/Room";

const Rooms = () => {
  const [allRooms, setAllRooms] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  async function getData() {
    const { data, error } = await getAllRooms();

    if (data) {
      setAllRooms(data.data.data);
    } else if (error) {
      console.log(error);
    }
  }

  const roomList =
    allRooms.length > 0
      ? allRooms.map(item => {
          return <Room data={item} key={item.id} />;
        })
      : null;

  return (
    <>
      <div className="header-image" />
      <h1 className="home-header text-center text-5xl text-gray-600 z-50">
        <i className="fas fa-bed text-2xl" />
        <br />
        Rooms
      </h1>

      <div className="container mx-auto lg:flex flex-wrap mt-16 pb-32">
        {roomList}
      </div>
    </>
  );
};

export default Rooms;
