import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import {
  makeStyles,
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
  Typography
} from "@material-ui/core";
import {
  getReviewsOnHold,
  getReviewsApproved,
  getPage,
  approveReview,
  deleteReview
} from "@endpoints/reviews";
import "@zendeskgarden/react-pagination/dist/styles.css";
import { ThemeProvider } from "@zendeskgarden/react-theming";
import { Pagination } from "@zendeskgarden/react-pagination";
function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {props.children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired
};

function LinkTab(props) {
  return (
    <Tab
      component="a"
      onClick={event => {
        event.preventDefault();
      }}
      {...props}
    />
  );
}

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper
  }
}));

// REVIEWS ON HOLD ////////////////////////////////
const ReviewsComponent = props => {
  const [totalPages, setTotalPages] = useState("");
  const [reviews, setReviews] = useState([]);
  const [currentPage, setCurrentPage] = useState(1); //for api

  //per page
  const getAllReviews = async page => {
    const { data, error } = await getPage(page);
    if (data) {
      setReviews(data.data.data);
      setTotalPages(data.data.meta.pagination.total_pages);
      console.log("Reviews  fetched", data.data);
    } else if (error) {
      console.log(error.response);
    }
  };

  // REVIEWS ON HOLD
  const getAllReviewsOnHold = async page => {
    const { data, error } = await getReviewsOnHold(page);
    if (data) {
      setReviews(data.data.data);
      setTotalPages(data.data.meta.pagination.total_pages);
      console.log("Reviews on hold fetched", data.data);
    } else if (error) {
      console.log(error.response);
    }
  };
  // REVIEWS approved
  const getAllReviewsApproved = async page => {
    const { data, error } = await getReviewsApproved(page);
    if (data) {
      setReviews(data.data.data);
      setTotalPages(data.data.meta.pagination.total_pages);
      console.log("Reviews APPROVED fetched", data.data);
    } else if (error) {
      console.log(error.response);
    }
  };
  // Approve Review
  const approveSingleReview = async id => {
    const { data, error } = await approveReview(id);
    if (data) {
      if (props.onHold) {
        getAllReviewsOnHold(currentPage);
      }
      console.log("Review Approved", data);
    } else if (error) {
      console.log(error.response);
    }
  };
  // Delete review
  const deleteSingleReview = async id => {
    const { data, error } = await deleteReview(id);
    if (reviews.length === 1) {
      setCurrentPage(currentPage - 1);
      console.log("ostao jos jedan");
    }
    if (data) {
      if (props.onHold && reviews.length > 1) {
        getAllReviewsOnHold(currentPage);
      }
      if (props.approved && reviews.length > 1) {
        console.log("ovo ME ZEZA ", reviews.length);
        getAllReviewsApproved(currentPage);
      }
      if (props.allReviews && reviews.length > 1) {
        getAllReviews(currentPage);
      }
      console.log("Review Deleted", data);
    } else if (error) {
      console.log(error.response);
    }
  };

  //Kada se menja strana paginacije
  useEffect(() => {
    if (reviews.length) {
      if (props.onHold) {
        getAllReviewsOnHold(currentPage);
      } else if (props.approved) {
        getAllReviewsApproved(currentPage);
      } else if (props.allReviews) {
        getAllReviews(currentPage);
      }
    }
  }, [
    currentPage,
    props.onHold,
    props.allReviews,
    reviews.length,
    props.approved
  ]);

  //Inicijalno ucitavanje, zavisno od taba
  useEffect(() => {
    if (props.onHold) {
      getAllReviewsOnHold(currentPage);
    } else if (props.approved) {
      getAllReviewsApproved(currentPage);
    } else if (props.allReviews) {
      getAllReviews(currentPage);
    }
  }, [props.onHold, currentPage, props.approved, props.allReviews]);

  //ako je na poslednjoj strani obrisan poslednji unos, da ucita stranicu ispred
  // useEffect(() => {
  //   if (reviews.length === 0 && currentPage !== 1) {

  //     getAllReviewsOnHold(currentPage);
  //   }
  // }, [reviews]);
  console.log("karent pejdz", currentPage);
  console.log("duzina reviews niza", reviews.length);
  return (
    <>
      {reviews.length ? (
        <>
          <Paper>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Comment</TableCell>

                  <TableCell align="left">Hotel Rate &nbsp;</TableCell>

                  <TableCell size="small" align="left">
                    Room Rate
                  </TableCell>
                  <TableCell align="left">Accomodation Rate</TableCell>
                  {props.onHold ? (
                    <TableCell align="left">Approve Review</TableCell>
                  ) : null}
                  <TableCell align="left">Decline Review</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {reviews.map(review => (
                  <TableRow key={review.id}>
                    <TableCell align="left">{review.comment}</TableCell>

                    <TableCell align="left" padding="none">
                      <meter
                        min="0"
                        max="10"
                        optimum="10"
                        low="4"
                        high="7"
                        value={review.hotel_rate * 2}
                        className="w-9/12"
                      />
                      <span className="pl-2 pr-6"> {review.hotel_rate} |</span>
                    </TableCell>

                    <TableCell align="left" padding="none">
                      <meter
                        min="0"
                        max="10"
                        optimum="10"
                        low="4"
                        high="7"
                        value={review.room_rate * 2}
                        className="w-9/12"
                      />
                      <span className="pl-2 pr-6"> {review.room_rate} |</span>
                    </TableCell>
                    <TableCell align="left">
                      <meter
                        min="0"
                        max="10"
                        optimum="10"
                        low="4"
                        high="7"
                        value={review.accommodation_rate * 2}
                        className="w-9/12"
                      />
                      <span className="pl-2 pr-6">
                        {" "}
                        {review.accommodation_rate} |
                      </span>
                    </TableCell>
                    {/* Ako postoji onHold prop da renderuje approve dugme inace ne treba */}
                    {props.onHold ? (
                      <TableCell align="left">
                        {" "}
                        <Link to="#">
                          <Button
                            onClick={() => approveSingleReview(review.id)}
                            variant="contained"
                            color="primary"
                          >
                            Approve Review
                          </Button>
                        </Link>
                      </TableCell>
                    ) : null}

                    <TableCell align="left">
                      {" "}
                      <Button
                        // onClick={() => handleClickOpenModal(facility.id)}
                        onClick={() => deleteSingleReview(review.id)}
                        variant="contained"
                        color="secondary"
                      >
                        Decline Review
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Paper>
          {totalPages > 1 ? (
            <ThemeProvider>
              <Pagination
                totalPages={totalPages}
                currentPage={currentPage}
                onChange={currentPage => {
                  console.log("current page", currentPage);
                  return setCurrentPage(currentPage);
                }}
              />
            </ThemeProvider>
          ) : null}
        </>
      ) : (
        <CircularProgress />
      )}
    </>
  );
};

const AdminReviews = () => {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  function handleChange(event, newValue) {
    setValue(newValue);
  }

  return (
    <div className={classes.root} style={{ marginTop: "50px" }}>
      <AppBar position="static">
        <Tabs variant="fullWidth" value={value} onChange={handleChange}>
          <LinkTab label="Reviews on HOLD" href="/drafts" />
          <LinkTab label="Approved Reviews" href="/trash" />
          <LinkTab label="All Reviews" href="/spam" />
        </Tabs>
      </AppBar>

      {value === 0 && (
        <TabContainer>
          {/* Reviwes on Hold */}
          <ReviewsComponent onHold />
        </TabContainer>
      )}
      {value === 1 && (
        <TabContainer>
          {" "}
          {/* Approved Reviews */}
          <ReviewsComponent approved />
        </TabContainer>
      )}
      {value === 2 && (
        <TabContainer>
          {/* All Reviews */}
          <ReviewsComponent allReviews />
        </TabContainer>
      )}
    </div>
  );
};

export default AdminReviews;
