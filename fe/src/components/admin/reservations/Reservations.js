import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Moment from "react-moment";

import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  CircularProgress
} from "@material-ui/core";

import "@zendeskgarden/react-pagination/dist/styles.css";
import { ThemeProvider } from "@zendeskgarden/react-theming";
import { Pagination } from "@zendeskgarden/react-pagination";

import Modal from "../Modal";
import Alert from "react-s-alert";
//const { windowWidth } = React.useContext(WidthContext);
import { getAllReservations, deleteReservation } from "@endpoints/reservations";

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    input: {
      marginLeft: 8,
      flex: 1
    },
    root2: {
      flexGrow: 1,
      backgroundColor: theme.palette.background.paper
    },
    iconButton: {
      padding: 10
    },
    divider: {
      width: 1,
      height: 28,
      margin: 4
    }
  }
}));

function Reservations() {
  const [openModal, setOpenModal] = React.useState(false);
  const [id, setId] = React.useState("");
  const [currentPage, setCurrentPage] = useState(1); //for api
  const [totalPages, setTotalPages] = useState(1);
  const [reservations, setReservations] = useState("");

  React.useEffect(() => {
    document.title = "Quantox Hotel - Admin Panel - Reservations";
    getReservations(currentPage);
  }, []);
  useEffect(() => {
    if (reservations.length) getReservations(currentPage);
  }, [currentPage]);

  function handleClickOpenModal(id) {
    setId(id);
    setOpenModal(true);
  }

  function handleCloseModal() {
    setOpenModal(false);
  }
  const classes = useStyles();

  const getReservations = async page => {
    const { data, error } = await getAllReservations(page);
    if (data) {
      console.log(" fetched", data.data);
      setReservations(data.data.data);
      setTotalPages(data.data.meta.pagination.total_pages);
    } else if (error) {
      console.log(error.response);
    }
  };

  const deleteReservationById = async id => {
    const { data, error } = await deleteReservation(id);
    if (data) {
      console.log(data);
      handleCloseModal();
      getReservations(currentPage);
    } else if (error) {
      console.log(error.response);
    }
  };

  return (
    <div className={classes.root2} style={{ marginTop: "82px" }}>
      <div className="text-center">
        <Modal
          open={openModal}
          handleClose={handleCloseModal}
          userAction={() => deleteReservationById(id)}
          modalHeader={"Remove subscriber"}
          modalText={"Are you shure you want to delete this subscriber?"}
        />

        {reservations.length ? (
          <>
            <Paper className={`${classes.root} responsive`}>
              <Table className="asdasdasdas">
                <TableHead>
                  <TableRow>
                    <TableCell className="cell-md" align="left">
                      Created At
                    </TableCell>
                    <TableCell className="cell-sm" align="left">
                      Rooms
                    </TableCell>
                    <TableCell align="left">Client</TableCell>
                    <TableCell align="left">Phone</TableCell>
                    <TableCell className="cell-sm" align="right">
                      Delete
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {reservations.map(item => (
                    <TableRow key={item.real_id}>
                      <TableCell
                        align="left"
                        style={{
                          fontWeight: "bold",
                          fontSize: "1rem",
                          fontStyle: "italic"
                        }}
                      >
                        <Moment format="MM/DD/YYYY">
                          {item.created_at.date}
                        </Moment>
                      </TableCell>
                      <TableCell>
                        {item.rooms
                          ? item.rooms.data.map(room => {
                              return <span> {room.room_number} </span>;
                            })
                          : null}
                      </TableCell>
                      <TableCell>
                        {item.user.data.first_name} {item.user.data.last_name}
                      </TableCell>
                      <TableCell>{item.user.data.phone_number}</TableCell>

                      <TableCell align="right">
                        <Button
                          onClick={() => handleClickOpenModal(item.id)}
                          variant="contained"
                          color="secondary"
                          className={classes.button}
                          title="Delete reservation"
                        >
                          X
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Paper>
            {totalPages > 1 ? (
              <div className="mt-8 mb-16">
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
              </div>
            ) : null}
          </>
        ) : (
          <CircularProgress />
        )}
      </div>
    </div>
  );
}

export default Reservations;
