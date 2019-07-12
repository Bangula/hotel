import React from "react";
import Alert from "react-s-alert";

import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";

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

  const handleOnDragStart = e => e.preventDefault();

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
  const responsive = {
    0: { items: 1 },
    1024: { items: 2 }
  };
  const cardList =
    promotions.length > 0
      ? promotions.map(item => {
          return (
            <PromotionCard
              onDragStart={handleOnDragStart}
              item={item}
              key={item.id}
              openModal={openModal}
              className="item"
            />
          );
        })
      : null;
  return (
    <div className="promotionSlider container mx-auto w-full mt-2 md:mt-32">
      <Alert />
      <h1 className="text-center text-3xl md:text-5xl text-gray-700 home-header italic">
        Promotions
      </h1>
      <div className="mt-16 ">
        <AliceCarousel
          responsive={responsive}
          autoPlayInterval={3000}
          autoPlayDirection="ltr"
          autoPlay={true}
          fadeOutAnimation={true}
          mouseDragEnabled={true}
          disableAutoPlayOnAction={true}
        >
          {cardList}
        </AliceCarousel>
      </div>
      {modalIsOpen ? (
        <PromotionModal
          modalIsOpen={modalIsOpen}
          handleCloseModal={handleCloseModal}
          modalId={modalId}
          Alert={Alert}
        />
      ) : null}
    </div>
  );
};

export default Promotions;
