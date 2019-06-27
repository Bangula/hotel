import React from "react";

const UpcomingEvents = () => {
  return (
    <div className="mt-32 container mx-auto">
      <h1 className="text-center text-6xl text-gray-700">Upcoming events</h1>
      <div
        className="flex border border-black mt-32
      "
      >
        <div className=" border border-black w-6/12">Event1</div>
        <div className=" border border-black w-6/12">Event2</div>
      </div>
    </div>
  );
};

export default UpcomingEvents;
