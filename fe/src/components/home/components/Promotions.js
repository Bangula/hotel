import React from "react";
import Slider from "react-slick";

// Components
import PromotionCard from "./PromotionCard";

const Promotions = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 800,
    slidesToShow: 3,
    slidesToScroll: 3,
    autoplay: true
  };
  return (
    <div className="promotionSlider w-full mt-32">
      <h1 className="text-center text-6xl  z-50">Promotions</h1>
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
