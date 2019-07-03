import React from "react";
import Slider from "react-slick";

import { getPromotions } from "../../services/http/endpoints/promotions";

// Components
import PromotionCard from "./components/PromotionCard";
import PromotionModal from "./components/PromotionModal";

const Promotions = () => {
  const [promotions, setPromotions] = React.useState([]);
  const [modalIsOpen, setModalIsOpen] = React.useState(false);
  const [modalId, setModalId] = React.useState("");

  React.useEffect(() => {
    getData();
  }, []);

  async function getData() {
    const { data, error } = await getPromotions();
    if (data) {
      setPromotions(data.data.data);
    } else if (error) {
      console.log(error);
    }
  }
  const openModal = id => {
    setModalIsOpen(true);
    console.log(id);
    setModalId(id);
  };
  const handleCloseModal = id => {
    setModalIsOpen(false);
    console.log(id);
  };
  const settings = {
    dots: true,
    infinite: true,
    speed: 800,
    slidesToShow: 3,
    slidesToScroll: 3,
    autoplay: false,
    appendDots: dots => (
      <div
        style={{
          borderRadius: "10px",
          top: "350px"
        }}
      >
        <ul style={{ margin: "0px", paddingTop: "50px" }}> {dots} </ul>
      </div>
    )
  };
  const cardList =
    promotions.length > 0
      ? promotions.map(item => {
          return (
            <PromotionCard item={item} key={item.id} openModal={openModal} />
          );
        })
      : null;
  return (
    <div className="promotionSlider w-full mt-32">
      <h1 className="text-center  text-5xl text-gray-700  z-50 home-header italic">
        Promotions
      </h1>
      <div className="mt-16 ">
        <Slider {...settings}>{cardList}</Slider>
      </div>
      {modalIsOpen ? (
        <PromotionModal
          modalIsOpen={modalIsOpen}
          handleCloseModal={handleCloseModal}
          modalId={modalId}
        />
      ) : null}
    </div>
  );
};

export default Promotions;
