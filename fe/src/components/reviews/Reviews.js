import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import Review from "./Review";
import CircularProgress from "@material-ui/core/CircularProgress";
import { getReviews, getPage } from "@endpoints/reviews";

import "@zendeskgarden/react-pagination/dist/styles.css";

import { ThemeProvider } from "@zendeskgarden/react-theming";
import { Pagination } from "@zendeskgarden/react-pagination";

const Reviews = () => {
  const [reviews, setReviews] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const getAllReviews = async () => {
    const { data, error } = await getReviews();
    if (data) {
      setReviews(data.data);
      setCurrentPage(data.data.meta.pagination.current_page);

      console.log(data.data.meta.pagination);
      setTotalPages(data.data.meta.pagination.total_pages);
    }
  };
  console.log(reviews);

  const getCurrentPage = async (pageNum, currentPage) => {
    const { data, error } = await getPage(pageNum);
    if (data) {
      setReviews(data.data);
    }
  };

  useEffect(() => {
    document.title = "Quantox Hotel - Reviews";
    getAllReviews();
  }, []);

  useEffect(() => {
    getCurrentPage(currentPage);
    window.scrollTo(0, 0); // scroll to top after selecting page
  }, [currentPage]);

  return (
    <>
      <div className="header-image" />
      <div className="container mx-auto text-center ">
        {Object.keys(reviews).length ? (
          reviews.data.map(data => {
            return <Review {...data} key={data.id} />;
          })
        ) : (
          <CircularProgress />
        )}
      </div>
      <ThemeProvider>
        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          onChange={currentPage => setCurrentPage(currentPage)}
        />
      </ThemeProvider>
      ;
    </>
  );
};

export default Reviews;
