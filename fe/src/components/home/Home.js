import React, { useEffect } from "react";
import { Fade } from "react-slideshow-image";
import bgImage1 from "@assets/images/slide_1.jpg";
import bgImage2 from "@assets/images/slide_2.jpg";

// Components
import Slide1 from "./components/Slide1";
import Slide2 from "./components/Slide2";
import CheckBar from "./components/CheckBar";
import UpcomingEvents from "./UpcomingEvents";
import About from "./About";
import Promotions from "./Promotions";

const slideImages = [bgImage1, bgImage2];

const properties = {
  duration: 5000,
  transitionDuration: 700,
  infinite: true,
  indicators: false,
  arrows: false
};

const Home = () => {
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="home">
      <Fade {...properties}>
        <div className="each-fade">
          <div
            className="h-screen bg-no-repeat  bg-cover relative"
            style={{
              backgroundImage: `url(${slideImages[0]})`
            }}
          >
            <div
              className="w-2/3"
              style={{
                position: "absolute",
                top: "40%",
                left: "0",
                right: "0",
                margin: "0 auto",
                color: "white",
                tranform: "translateY(-50%)"
              }}
            >
              <Slide1 />
            </div>
          </div>
        </div>
        <div className="each-fade">
          <div
            className="h-screen bg-no-repeat bg-cover relative"
            style={{ backgroundImage: `url(${slideImages[1]})` }}
          >
            <div
              className="w-2/3"
              style={{
                position: "absolute",
                top: "40%",
                left: "0",
                right: "0",
                margin: "0 auto",
                color: "white",
                tranform: "translateY(-50%)"
              }}
            >
              <Slide2 />
            </div>
          </div>
        </div>
      </Fade>
      <CheckBar />
      <UpcomingEvents />
      <Promotions />
      <About />
    </div>
  );
};

export default Home;
