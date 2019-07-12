import React from "react";

const Slide2 = () => {
  return (
    <div className="text-center">
      <h1 className="slide1-header text-center text-3xl md:text-6xl">
        Golden Autumn Offer
      </h1>
      <div className="flex  justify-center">
        <div className="p-4">
          <i className="fas fa-wifi   text-lg md:text-4xl pb-4" />
          <br />
          <p className="text-xs">FREE WIFI</p>
        </div>
        <div className="p-4">
          <i className="fas fa-parking  text-xl md:text-4xl pb-4" />
          <br />
          <p className="text-xs">FREE PARKING</p>
        </div>
        <div className="p-4">
          <i className="fas fa-coffee  text-xl md:text-4xl pb-4" />
          <br />
          <p className="text-xs">BREAKFAST</p>
        </div>
      </div>
    </div>
  );
};

export default Slide2;
