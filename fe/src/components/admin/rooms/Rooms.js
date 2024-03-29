import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  makeStyles,
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  CircularProgress
} from "@material-ui/core";

import { getAllRooms, deleteRoom } from "@endpoints/rooms";

import "@zendeskgarden/react-pagination/dist/styles.css";
import { ThemeProvider } from "@zendeskgarden/react-theming";
import { Pagination } from "@zendeskgarden/react-pagination";

import Modal from "../Modal";
import Alert from "react-s-alert";

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.paper
  }
}));

//DISABLE ON CLICK RIPPLE

function Rooms() {
  const classes = useStyles();

  const [currentPage, setCurrentPage] = useState(1); //for api
  const [totalPages, setTotalPages] = useState(1);
  const [rooms, setRooms] = useState([]);
  const [openModal, setOpenModal] = React.useState(false);
  const [modalRoom, setModalRoom] = React.useState(""); //stores data of current room id for modal

  React.useEffect(() => {
    document.title = "Quantox Hotel - Admin Panel - Rooms";
  }, []);

  function handleClickOpenModal(id) {
    setModalRoom(id);
    setOpenModal(true);
  }

  function handleCloseModal() {
    setOpenModal(false);
  }

  const getRooms = async page => {
    const { data, error } = await getAllRooms(page);
    if (data) {
      console.log("Rooms fetched", data.data);
      setRooms(data.data.data);
      setTotalPages(data.data.meta.pagination.total_pages);
    } else if (error) {
      console.log(error.response);
    }
  };

  const deleteSingleRoom = async roomId => {
    const { data, error } = await deleteRoom(roomId);
    if (data) {
      Alert.success("Room  Deleted!");
      getRooms(currentPage);
      handleCloseModal();
    } else if (error) {
      console.log(error.response);
    }
  };

  //Kada se menja strana paginacije
  useEffect(() => {
    if (rooms.length) getRooms(currentPage);
  }, [currentPage, rooms]);

  //Inicijalno ucitavanje
  useEffect(() => {
    if (!rooms.length) getRooms(currentPage);
  }, [rooms, currentPage]);

  console.log("room id", modalRoom);
  return (
    <div className="text-center" style={{ marginTop: "42px" }}>
      <Alert />
      <Modal
        open={openModal}
        handleClose={handleCloseModal}
        userAction={() => deleteSingleRoom(modalRoom)}
        modalHeader={"Delete Room Type"}
        modalText={"Are you shure you want to delete this room type?"}
      />
      <div className="from-top" />

      {rooms.length ? (
        <>
          <Paper className={`${classes.root} table-container`}>
            <Table className={classes.table}>
              <TableHead>
                <TableRow>
                  <TableCell className="cell-md" align="left">
                    Room No
                  </TableCell>
                  <TableCell className="cell-sm" align="left">
                    Usable
                  </TableCell>

                  <TableCell size="small" align="left">
                    Edit Room
                  </TableCell>
                  <TableCell align="left">Delete Room</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rooms.map(room => (
                  <TableRow key={room.id}>
                    <TableCell className="cell-sm" align="left">
                      {room.room_number}
                    </TableCell>
                    <TableCell className="cell-sm" align="left">
                      {room.usable ? "true" : "false"}
                    </TableCell>

                    <TableCell align="left">
                      {" "}
                      <Link to={`/admin/rooms/edit/${room.id}`}>
                        <Button
                          onClick={() => {
                            // setTypeForEdit(type);
                          }}
                          variant="contained"
                          color="primary"
                          className={classes.button}
                        >
                          Edit Room
                        </Button>
                      </Link>
                    </TableCell>

                    <TableCell align="left">
                      {" "}
                      <Button
                        onClick={() => handleClickOpenModal(room.id)}
                        variant="contained"
                        color="secondary"
                        className={classes.button}
                      >
                        Delete Room
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Paper>
          <ThemeProvider>
            <Pagination
              totalPages={totalPages}
              currentPage={currentPage}
              onChange={currentPage => {
                console.log("current page", currentPage);
                return setCurrentPage(currentPage);
              }}
            />
          </ThemeProvider>{" "}
        </>
      ) : (
        <CircularProgress />
      )}
    </div>
  );
}

export default Rooms;
