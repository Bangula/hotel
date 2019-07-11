import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import {
  makeStyles,
  useTheme,
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
  Collapse,
  ListItemText,
  ListItemIcon,
  ListItem,
  List,
  Typography
} from "@material-ui/core";
import {
  getReviewsOnHold,
  getReviewsApproved,
  getPage
} from "@endpoints/reviews";
import "@zendeskgarden/react-pagination/dist/styles.css";
import { ThemeProvider } from "@zendeskgarden/react-theming";
import { Pagination } from "@zendeskgarden/react-pagination";
import Modal from "./Modal";
import Alert from "react-s-alert";

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

const getAllReviewsApproved = async page => {
  const { data, error } = await getReviewsApproved(page);
  if (data) {
    console.log("Reviews approved fetched", data.data);
  } else if (error) {
    console.log(error.response);
  }
};

//per page
const getAllReviews = async page => {
  const { data, error } = await getPage(page);
  if (data) {
    console.log("Reviews approved fetched", data.data);
  } else if (error) {
    console.log(error.response);
  }
};

// REVIEWS ON HOLD ////////////////////////////////
const ReviewsOnHold = () => {
  const [totalPages, setTotalPages] = useState("");
  const [reviews, setReviews] = useState([]);
  const [currentPage, setCurrentPage] = useState("");
  const getAllReviewsOnHold = async page => {
    const { data, error } = await getReviewsOnHold(page);
    if (data) {
      setReviews(data.data.data);
      console.log("Reviews on hold fetched", data.data);
    } else if (error) {
      console.log(error.response);
    }
  };

  useEffect(() => {
    getAllReviewsOnHold();
  }, []);
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
                  <TableCell align="left">Approve Review</TableCell>
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
                    <TableCell align="left">
                      {" "}
                      <Link to="#">
                        <Button
                          // onClick={() => {

                          //   setFacilityForEdit(facility);
                          // }}
                          variant="contained"
                          color="primary"
                        >
                          Approve Review
                        </Button>
                      </Link>
                    </TableCell>

                    <TableCell align="left">
                      {" "}
                      <Button
                        // onClick={() => handleClickOpenModal(facility.id)}
                        // onClick={() => deleteSingleFacility(facility.id)}
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

function AdminReviews() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  function handleChange(event, newValue) {
    setValue(newValue);
  }

  return (
    <div className={classes.root} style={{ marginTop: "50px" }}>
      <AppBar position="static">
        <Tabs variant="fullWidth" value={value} onChange={handleChange}>
          <LinkTab label="Page One" href="/drafts" />
          <LinkTab label="Page Two" href="/trash" />
          <LinkTab label="Page Three" href="/spam" />
        </Tabs>
      </AppBar>

      {value === 0 && (
        <TabContainer>
          <ReviewsOnHold />
        </TabContainer>
      )}
      {value === 1 && <TabContainer>Page Two</TabContainer>}
      {value === 2 && <TabContainer>Page Three</TabContainer>}
    </div>
  );
}

export default AdminReviews;
