import React from "react";
import TextyAnim from "rc-texty";

const Slide1 = () => {
  return (
    <div className="text-center">
      <h1 className="slide1-header text-center text-3xl md:text-6xl">
        <TextyAnim type="mask-top">Welcome to Quantox Hotel</TextyAnim>
      </h1>
      <div className="flex  justify-center">
        <div className="p-8">
          <i className="fas fa-glass-martini-alt text-lg md:text-4xl pb-4" />
          <br />
          <p className="text-xs">DRINKS</p>
        </div>
        <div className="p-8">
          <i className="fas fa-handshake text-lg md:text-4xl pb-4" />

          <br />
          <p className="text-xs">EVENTS</p>
        </div>
        <div className="p-8">
          <i className="fas fa-dumbbell text-lg md:text-4xl pb-4" />

          <br />
          <p className="text-xs">GYM</p>
        </div>
      </div>
    </div>
  );
};

export default Slide1;
