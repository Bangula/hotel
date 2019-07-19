import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Moment from "react-moment";
import Button from "@material-ui/core/Button";
import { Link as RouteLink } from "react-router-dom";
import Alert from "react-s-alert";

import { createReservation } from "../../services/http/endpoints/reservations";

import { useSelector, useDispatch } from "react-redux";

import Modal from "../admin/Modal";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    marginTop: theme.spacing(3),
    overflowX: "auto"
  },
  table: {
    minWidth: 650
  }
}));

export default function Cart() {
  const [modalIsActive, setModalIsActive] = React.useState(false);
  const [bookModalIsActive, setBookModalIsActive] = React.useState(false);

  const [promotionId, setPromotionId] = React.useState("");
  const [roomId, setRoomId] = React.useState("");

  const promotions = useSelector(state => state.cart.promotions);
  const rooms = useSelector(state => state.cart.rooms);

  React.useEffect(() => {
    document.title = "Quantox Hotel - Cart";
  }, []);
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const cartItems = promotions.concat(rooms);

  const dispatch = useDispatch();

  const classes = useStyles();
  if (rooms.length) console.log(rooms);
  if (promotions.length) console.log(promotions);

  const handleBook = async () => {
    if (rooms.length) {
      let room = { rooms: rooms };
      const { data, error } = await createReservation(room);
      if (data) {
        console.log(data);
        Alert.success("Reservation completed!", {
          effect: "slide",
          timeout: 2000
        });
        dispatch({ type: "RESERVATION_COMPLETED" });
      } else if (error) {
        Alert.error("Error creating reservation!", {
          effect: "slide",
          timeout: 2000
        });
        console.log(error.response);
      }
    }
    if (promotions.length) {
      let promotion = { promotion: promotions[0] };
      const { data, error } = await createReservation(promotion);
      if (data) {
        console.log(data);
        Alert.success("Reservation completed!", {
          effect: "slide",
          timeout: 2000
        });
        dispatch({ type: "RESERVATION_COMPLETED" });
      } else if (error) {
        Alert.error("Error creating reservation!", {
          effect: "slide",
          timeout: 2000
        });
        console.log(error.response);
      }
    }
  };

  const handleDelete = () => {
    if (promotionId.length) {
      dispatch({
        type: "DELETE_PROMOTION",
        payload: promotionId
      });
    } else if (roomId.length) {
      dispatch({
        type: "DELETE_ROOM",
        payload: roomId
      });
    }
  };

  const promotionTable =
    promotions.length > 0 ? (
      <Paper className={classes.root}>
        <h1 className="p-2 italic">Promotions</h1>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell>Room Type</TableCell>
              <TableCell align="left">From Date</TableCell>
              <TableCell align="left">To Date</TableCell>
              <TableCell align="right">Remove From Cart</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {promotions
              ? promotions.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell align="left">Room type</TableCell>
                    <TableCell align="left">
                      <Moment format="YYYY/MM/DD">{item.started_at}</Moment>
                    </TableCell>
                    <TableCell align="left">
                      <Moment format="YYYY/MM/DD">{item.ended_at}</Moment>
                    </TableCell>
                    <TableCell align="right">
                      <Button
                        variant="contained"
                        color="secondary"
                        onClick={
                          () => {
                            setPromotionId(item.promotion_id);
                            setModalIsActive(true);
                          }
                          // dispatch({
                          //   type: "DELETE_PROMOTION",
                          //   payload: item.promotion_id
                          // })
                        }
                      >
                        <i className="far fa-trash-alt" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              : null}
          </TableBody>
        </Table>
      </Paper>
    ) : null;

  const roomsTable =
    rooms.length > 0 ? (
      <Paper className={classes.root}>
        <h1 className="p-2 italic">Rooms</h1>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell>Room Type</TableCell>
              <TableCell align="left">From Date</TableCell>
              <TableCell align="left">To Date</TableCell>
              <TableCell align="right">Remove From Cart</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rooms
              ? rooms.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell align="left">Room type</TableCell>
                    <TableCell align="left">
                      <Moment format="YYYY/MM/DD">{item.started_at}</Moment>
                    </TableCell>
                    <TableCell align="left">
                      <Moment format="YYYY/MM/DD">{item.ended_at}</Moment>
                    </TableCell>
                    <TableCell align="right">
                      <Button
                        variant="contained"
                        color="secondary"
                        onClick={
                          () => {
                            setRoomId(item.room_id);
                            console.log(item.room_id);
                            setModalIsActive(true);
                          }
                          // dispatch({
                          //   type: "DELETE_ROOM",
                          //   payload: item.room_id
                          // })
                        }
                      >
                        <i className="far fa-trash-alt" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              : null}
          </TableBody>
        </Table>
      </Paper>
    ) : null;

  return (
    <>
      <Modal
        open={modalIsActive}
        handleClose={() => setModalIsActive(false)}
        userAction={() => handleDelete()}
        modalHeader={"Remove item"}
        modalText={"Are you shure you want to remove item from cart?"}
      />
      <Modal
        open={bookModalIsActive}
        handleClose={() => setBookModalIsActive(false)}
        userAction={handleBook}
        modalHeader={"Make reservation"}
        modalText={"Proceed with reservation?"}
      />
      <Alert />
      <div className="header-image" />
      <div className="pb-32 px-2">
        <h1 className="home-header text-center text-5xl text-gray-600 z-50">
          <i className="fas fa-shopping-cart text-2xl" />
          <br />
          Cart
        </h1>
        <div className="mt-16 container mx-auto">
          {cartItems.length > 0 ? (
            <>
              <div>
                {promotionTable}
                {roomsTable}
              </div>
              <div className="mt-8 w-full flex justify-end">
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => setBookModalIsActive(true)}
                >
                  BOOK
                </Button>
              </div>
            </>
          ) : (
            <div className="text-center h-32">
              <h1 className="italic text-gray-600 text-center mb-8">
                No items in cart
              </h1>
              <RouteLink
                style={{ transition: "all 0.3s" }}
                className="border border-blue-400 text-blue-600 px-8 py-4 rounded-lg hover:text-blue-400 shadow-lg hover:shadow-xl"
                to="/booking"
              >
                Show available rooms
              </RouteLink>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
