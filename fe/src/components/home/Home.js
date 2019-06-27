import React from "react";
import { Slide } from "react-slideshow-image";
import bgImage1 from "@assets/images/slide_1.jpg";
import bgImage2 from "@assets/images/slide_2.jpg";
import bgImage3 from "@assets/images/slide_3.jpg";

const slideImages = [bgImage1, bgImage2, bgImage3];

const properties = {
  duration: 5000,
  transitionDuration: 500,
  infinite: true,
  indicators: true,
  arrows: false
};

const Home = () => {
  return (
    <div className="home h-screen">
      <Slide {...properties}>
        <div className="each-slide">
          <div
            className="h-screen bg-no-repeat bg-cover relative"
            style={{ backgroundImage: `url(${slideImages[0]})` }}
          >
            <div
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                color: "white",
                tranform: "translateY(-50%)"
              }}
            >
              Slide 1
            </div>
          </div>
        </div>
        <div className="each-slide">
          <div
            className="h-screen bg-no-repeat bg-cover relative"
            style={{ backgroundImage: `url(${slideImages[1]})` }}
          >
            <div
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                color: "white",
                tranform: "translateY(-50%)"
              }}
            >
              Slide 1
            </div>
          </div>
        </div>
        <div className="each-slide">
          <div
            className="h-screen bg-no-repeat bg-cover relative"
            style={{ backgroundImage: `url(${slideImages[2]})` }}
          >
            <div
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                color: "white",
                tranform: "translateY(-50%)"
              }}
            >
              Slide 1
            </div>
          </div>
        </div>
      </Slide>
    </div>
  );
};

export default Home;
