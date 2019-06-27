import React from "react";
import bgImage from "@assets/images/about.jpg";

const About = () => {
  return (
    <div
      className="about w-full relative z-50 mt-32"
      style={{ height: "50vh", backgroundImage: `url(${bgImage})` }}
    >
      <div
        className="absolute w-full h-full left-0 top-0 bg-contain z-10 pt-16"
        style={{ background: "rgba(0, 0, 0, 0.5)" }}
      >
        <h1 className="text-center text-6xl text-white z-50">About Us</h1>
        <div className="container mx-auto">
          <p className="text-center mt-16 text-white z-50 ">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse
            dolorum optio, quod consequatur eos nobis rem nostrum aliquid illo
            rerum? Magnam voluptate modi dolor nulla repudiandae minus possimus.
            Debitis, perferendis? Lorem ipsum dolor sit amet consectetur
            adipisicing elit. Esse dolorum optio, quod consequatur eos nobis rem
            nostrum aliquid illo rerum? Magnam voluptate modi dolor nulla
            repudiandae minus possimus. Debitis, perferendis
          </p>
          <div className="flex justify-center text-white mt-16 text-4xl ">
            <i className="fas fa-wifi p-4" />
            <i className="fas fa-parking p-4" />
            <i className="fas fa-swimming-pool p-4" />
            <i className="fas fa-cocktail p-4" />
            <i className="fas fa-dumbbell p-4" />
            <i className="fas fa-paw p-4" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
