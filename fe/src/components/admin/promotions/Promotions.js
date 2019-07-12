import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import CreateOrEditPromotion from "./CreatePromotions";

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
  Typography
} from "@material-ui/core";
import {
  getPromotionsPerPage,
  deletePromotion,
  updatePromotion,
  createPromotion,
  getPromotionById
} from "@endpoints/promotions";
import "@zendeskgarden/react-pagination/dist/styles.css";
import { ThemeProvider } from "@zendeskgarden/react-theming";
import { Pagination } from "@zendeskgarden/react-pagination";
import Modal from "../Modal";
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

// PROMOTIONS PANEL
const PromotionsComponent = props => {
  const [totalPages, setTotalPages] = useState("");
  const [promotions, setPromotions] = useState([]);
  const [currentPage, setCurrentPage] = useState(1); //for api
  const [openModal, setOpenModal] = React.useState(false);
  const [modalPromotion, setModalPromotion] = React.useState("");

  //per page
  const getAllPromotions = async page => {
    const { data, error } = await getPromotionsPerPage(page);
    if (data) {
      setPromotions(data.data.data);
      setTotalPages(data.data.meta.pagination.total_pages);
      console.log("Promotions  fetched", data.data);
    } else if (error) {
      console.log(error.response);
    }
  };

  // Delete PROMOTION
  const deleteSinglePromotion = async id => {
    const { data, error } = await deletePromotion(id);
    if (promotions.length === 1) {
      setCurrentPage(currentPage - 1);
      console.log("ostao jos jedan");
    }
    if (data) {
      if (props.getAll && promotions.length > 1) {
        getAllPromotions(currentPage);
      }
      console.log("Review Deleted", data);
    } else if (error) {
      console.log(error.response);
    }
  };

  //Kada se menja strana paginacije
  useEffect(() => {
    if (promotions.length) {
      if (props.getAll) {
        getAllPromotions(currentPage);
      }
    }
  }, [currentPage]);

  //Inicijalno ucitavanje, zavisno od taba
  useEffect(() => {
    if (props.getAll) {
      getAllPromotions(currentPage);
    }
    // } else if (props.approved) {
    //   getAllReviewsApproved(currentPage);
    // } else if (props.allReviews) {
    //   getAllReviews(currentPage);
    // }
  }, []);

  //ako je na poslednjoj strani obrisan poslednji unos, da ucita stranicu ispred
  // useEffect(() => {
  //   if (reviews.length === 0 && currentPage !== 1) {

  //     getAllReviewsOnHold(currentPage);
  //   }
  // }, [reviews]);
  // console.log("karent pejdz", currentPage);
  // console.log("duzina reviews niza", reviews.length);
  function handleClickOpenModal(id) {
    setModalPromotion(id);
    setOpenModal(true);
  }

  function handleCloseModal() {
    setOpenModal(false);
  }

  return (
    <>
      {promotions.length ? (
        <>
          <Modal
            open={openModal}
            handleClose={handleCloseModal}
            userAction={() => deleteSinglePromotion(modalPromotion)}
            modalHeader={"Delete Promotion"}
            modalText={"Are you shure you want to delete this room promotion?"}
          />
          <Paper>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Promotion Name</TableCell>
                  <TableCell align="left">Promotion Description</TableCell>
                  <TableCell size="small" align="left">
                    {" "}
                    Discount
                  </TableCell>
                  <TableCell align="left">Discount for Children</TableCell>
                  <TableCell align="left">Price</TableCell>
                  <TableCell align="left">Price for Children</TableCell>
                  <TableCell align="left">Starting At</TableCell>
                  <TableCell align="left">Ending At</TableCell>
                  <TableCell align="left">Active</TableCell>
                  <TableCell align="left">Edit</TableCell>
                  <TableCell align="left">Delete</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {promotions.map(promotion => (
                  <TableRow key={promotion.id}>
                    <TableCell align="left">{promotion.name}</TableCell>
                    <TableCell align="left" padding="none">
                      {" "}
                      {promotion.description}{" "}
                    </TableCell>
                    <TableCell>{promotion.discount}</TableCell>
                    <TableCell>{promotion.discount_children}</TableCell>
                    <TableCell>{promotion.price}</TableCell>
                    <TableCell>{promotion.price_children}</TableCell>
                    <TableCell>{promotion.starting_at}</TableCell>
                    <TableCell>{promotion.ending_at}</TableCell>
                    <TableCell>{promotion.active}</TableCell>

                    <TableCell align="left">
                      {" "}
                      <Link to="#">
                        <Button
                          // onClick={() => approveSingleReview(review.id)}
                          variant="contained"
                          color="primary"
                        >
                          Edit
                        </Button>
                      </Link>
                    </TableCell>

                    <TableCell align="left">
                      {" "}
                      <Button
                        onClick={() => handleClickOpenModal(promotion.id)}
                        // onClick={() => deleteSinglePromotion(promotion.id)}
                        variant="contained"
                        color="secondary"
                      >
                        Delete
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

//CREATE OR EDIT PROMOTION

const Promotions = () => {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  function handleChange(event, newValue) {
    setValue(newValue);
  }

  return (
    <div className={classes.root} style={{ marginTop: "50px" }}>
      <AppBar position="static">
        <Tabs variant="fullWidth" value={value} onChange={handleChange}>
          <LinkTab label="All Promotions" href="/drafts" />
          <LinkTab label="Create or Edit Promotion" href="/trash" />
        </Tabs>
      </AppBar>

      {value === 0 && (
        <TabContainer>
          {/* Reviwes on Hold */}
          <PromotionsComponent getAll />
        </TabContainer>
      )}
      {value === 1 && (
        <TabContainer>
          {" "}
          <CreateOrEditPromotion />
        </TabContainer>
      )}
    </div>
  );
};

export default Promotions;
