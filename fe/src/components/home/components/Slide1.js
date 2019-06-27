import React from "react";
import TextyAnim from "rc-texty";

const Slide1 = () => {
  return (
    <div>
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
    </div>
  );
};

export default Slide1;
