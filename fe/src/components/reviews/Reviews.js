import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import Review from "./Review";
import { getReviews, getPage } from "@endpoints/reviews";
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";

import "@zendeskgarden/react-pagination/dist/styles.css";

import { ThemeProvider } from "@zendeskgarden/react-theming";
import { Pagination } from "@zendeskgarden/react-pagination";

const useStyles = makeStyles(theme => ({
  progress: {
    position: "fixed",
    top: "50%",
    zIndex: "100",
    left: 0,
    right: 0,
    margin: "0 auto",
    transform: "translateY(-50%)"
  }
}));

const Reviews = () => {
  const [reviews, setReviews] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [loader, setLoader] = useState(true);
  const classes = useStyles();

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
      setLoader(false);
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
      {loader ? <CircularProgress className={classes.progress} /> : null}

      <h1 className="home-header text-center text-5xl text-gray-600 z-50">
        <i className="fas fa-comments" />
        <br />
        Reviews
      </h1>
      <div className="container mx-auto text-center mt-16 ">
        {Object.keys(reviews).length ? (
          reviews.data.map(data => {
            return <Review {...data} key={data.id} />;
          })
        ) : (
          <CircularProgress />
        )}
      </div>

      {Object.keys(reviews).length ? (
        <ThemeProvider>
          <Pagination
            totalPages={totalPages}
            currentPage={currentPage}
            onChange={currentPage => setCurrentPage(currentPage)}
          />
        </ThemeProvider>
      ) : null}
      <div className="h-32 w-full" />
    </>
  );
};

export default Reviews;
