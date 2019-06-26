import React from "react";
import { Slide } from "react-slideshow-image";
import bgImage1 from "#assets/images/slide_1-min.jpg";
import bgImage2 from "#assets/images/slide_2.jpg";

const slideImages = [bgImage1, bgImage2];

const properties = {
  duration: 5000,
  transitionDuration: 500,
  infinite: true,
  indicators: true,
  arrows: true,
  onChange: (oldIndex, newIndex) => {
    console.log(`slide transition from ${oldIndex} to ${newIndex}`);
  }
};

const Home = () => {
  return (
    <div>
      <Slide {...properties}>
        <div className="each-slide">
          <div style={{ backgroundImage: `url(${slideImages[0]})` }}>
            <span>Slide 1</span>
          </div>
        </div>
        <div className="each-slide">
          <div style={{ backgroundImage: `url(${slideImages[1]})` }}>
            <span>Slide 2</span>
          </div>
        </div>
      </Slide>
    </div>
  );
};

export default Home;
