import React from "react";
import TextyAnim from "rc-texty";

const Slide1 = () => {
  return (
    <div className="text-center">
      <h1 className="text-center text-6xl">
        <TextyAnim
          type="mask-top"
          onEnd={type => {
            // tslint:disable-next-line
            console.log(type);
          }}
        >
          Welcome to Quantox Hotel
        </TextyAnim>
      </h1>
      <div className="flex border">
        <div className="p-8 border">
          <i className="fas fa-glass-martini-alt text-4xl pb-4" />
          <br />
          <p>DRINKS</p>
        </div>
        <div className="p-8">
          <i className="fas fa-handshake text-4xl pb-4" />

          <br />
          <p>EVENTS</p>
        </div>
        <div className="p-8">
          <i className="fas fa-dumbbell text-4xl pb-4" />

          <br />
          <p>GYM</p>
        </div>
      </div>
    </div>
  );
};

export default Slide1;
