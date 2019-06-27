import React from "react";
import { Fade } from "react-slideshow-image";
import bgImage1 from "@assets/images/slide_1.jpg";
import bgImage2 from "@assets/images/slide_2.jpg";
import bgImage3 from "@assets/images/slide_3.jpg";

const slideImages = [bgImage1, bgImage2, bgImage3];

const properties = {
  duration: 5000,
  transitionDuration: 700,
  infinite: true,
  indicators: true,
  arrows: false
};

const Home = () => {
  return (
    <div className="home">
      <Fade {...properties}>
        <div className="each-fade">
          <div
            className="h-screen bg-no-repeat bg-cover relative"
            style={{ backgroundImage: `url(${slideImages[0]})` }}
          >
            <div
              className="border border-white w-1/3"
              style={{
                position: "absolute",
                top: "50%",
                left: "0",
                right: "0",
                margin: "0 auto",
                color: "white",
                tranform: "translateY(-50%)"
              }}
            >
              <h1 className="text-center">Welcome To Quantox Hotel</h1>
            </div>
          </div>
        </div>
        <div className="each-fade">
          <div
            className="h-screen bg-no-repeat bg-cover relative"
            style={{ backgroundImage: `url(${slideImages[1]})` }}
          >
            <div
              style={{
                position: "absolute",
                width: "500px",
                top: "50%",
                left: "0",
                right: "0",
                margin: "0 auto",
                color: "white",
                tranform: "translateY(-50%)"
              }}
            >
              Slide 2
            </div>
          </div>
        </div>
        <div className="each-fade">
          <div
            className="h-screen bg-no-repeat bg-cover relative"
            style={{ backgroundImage: `url(${slideImages[2]})` }}
          >
            <div
              style={{
                position: "absolute",
                width: "500px",
                top: "50%",
                left: "0",
                right: "0",
                margin: "0 auto",
                color: "white",
                tranform: "translateY(-50%)"
              }}
            >
              Slide 3
            </div>
          </div>
        </div>
      </Fade>
    </div>
  );
};

export default Home;
