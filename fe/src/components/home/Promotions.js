import React from "react";
import Slider from "react-slick";

// Components
import PromotionCard from "./components/PromotionCard";

const Promotions = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 800,
    slidesToShow: 3,
    slidesToScroll: 3,
    autoplay: false
  };
  return (
    <div className="promotionSlider w-full mt-32">
      <h1 className="text-center  text-5xl text-gray-700  z-50 home-header">
        Promotions
      </h1>
      <div className="mt-16 ">
        <Slider {...settings}>
          <div className="">
            <PromotionCard />
          </div>
          <div>
            <PromotionCard />
          </div>
          <div>
            <PromotionCard />
          </div>
          <div>
            <PromotionCard />
          </div>
          <div>
            <PromotionCard />
          </div>
        </Slider>
      </div>
    </div>
  );
};

export default Promotions;
