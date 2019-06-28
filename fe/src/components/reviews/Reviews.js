import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Review from "./Review";
import CircularProgress from "@material-ui/core/CircularProgress";
import { getReviews } from "@endpoints/reviews";

const Reviews = () => {
  const [reviews, setReviews] = useState({});

  const getAllReviews = async () => {
    const { data, error } = await getReviews();
    if (data) {
      setReviews(data.data);
    }
  };

  useEffect(() => {
    document.title = "Quantox Hotel - Reviews";
    getAllReviews();
  }, []);

  return (
    <>
      <div className="header-image" />

      <div className="container mx-auto text-center ">
        {Object.keys(reviews).length ? (
          reviews.data.map(data => {
            console.log("map data", data);
            return <Review {...data} />;
          })
        ) : (
          // <CircularProgress />
          <CircularProgress />
        )}
      </div>
    </>
  );
};

export default Reviews;
