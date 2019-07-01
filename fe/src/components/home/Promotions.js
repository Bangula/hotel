import React from "react";
import Slider from "react-slick";

import { getPromotions } from "../../services/http/endpoints/promotions";

// Components
import PromotionCard from "./components/PromotionCard";

const Promotions = () => {
  const [promotions, setPromotions] = React.useState([]);
  React.useEffect(() => {
    getData();
  }, []);

  async function getData() {
    const { data, error } = await getPromotions();
    if (data) {
      console.log(data.data.data);
      setPromotions(data.data.data);
    } else if (error) {
      console.log(error);
    }
  }
  const settings = {
    dots: true,
    infinite: true,
    speed: 800,
    slidesToShow: 3,
    slidesToScroll: 3,
    autoplay: true
  };
  const cardList =
    promotions.length > 0
      ? promotions.map(item => {
          return <PromotionCard item={item} key={item.id} />;
        })
      : null;
  return (
    <div className="promotionSlider w-full mt-32">
      <h1 className="text-center  text-5xl text-gray-700  z-50 home-header">
        Promotions
      </h1>
      <div className="mt-16 ">
        <Slider {...settings}>{cardList}</Slider>
      </div>
    </div>
  );
};

export default Promotions;
