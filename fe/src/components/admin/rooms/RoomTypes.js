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
  CircularProgress,
  Collapse,
  ListItemText,
  ListItemIcon,
  ListItem,
  List
} from "@material-ui/core";
<<<<<<< HEAD

import { getRoomTypes, deleteRoomType } from "@endpoints/rooms";

=======
import { getRoomTypes, deleteRoomType, createRoomType } from "@endpoints/rooms";
>>>>>>> 31c52f8a4af1f923431fe6bb38c72a615c91a21a
import "@zendeskgarden/react-pagination/dist/styles.css";
import { ThemeProvider } from "@zendeskgarden/react-theming";
import { Pagination } from "@zendeskgarden/react-pagination";
import Modal from "../Modal";
import Alert from "react-s-alert";

<<<<<<< HEAD
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
=======
import { ExpandMore, ExpandLess } from "@material-ui/icons";

>>>>>>> 31c52f8a4af1f923431fe6bb38c72a615c91a21a
import EditRoomType from "./EditRoomType";

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.paper
  }
}));

//DISABLE ON CLICK RIPPLE
function RoomTypes() {
  const classes = useStyles();

  const [currentPage, setCurrentPage] = useState(1); //for api
  const [totalPages, setTotalPages] = useState(1);
  const [types, setTypes] = useState([]);
  const [openModal, setOpenModal] = React.useState(false);
  const [modalType, setModalType] = React.useState(""); //stores data of current type id for modal
  const [openList, setOpenList] = React.useState(false);
  const [typeForEdit, setTypeForEdit] = React.useState({});

  function handleClickOpenModal(id) {
    setModalType(id);
    setOpenModal(true);
  }

  function handleCloseModal() {
    setOpenModal(false);
  }
  //Toggle list
  function handleClickList() {
    setOpenList(!openList);
  }
  const getAllRoomTypes = async page => {
    const { data, error } = await getRoomTypes(page);
    if (data) {
      console.log("types fetched", data.data);
      setTypes(data.data.data);
      setTotalPages(data.data.meta.pagination.total_pages);
    } else if (error) {
      console.log(error.response);
    }
  };

  const deleteSingleRoomType = async typeId => {
    const { data, error } = await deleteRoomType(typeId);
    if (data) {
      Alert.success("Room Type Deleted!");
      getAllRoomTypes(currentPage);
      handleCloseModal();
    } else if (error) {
      console.log(error.response);
    }
  };

  //Kada se menja strana paginacije
  useEffect(() => {
    if (types.length) getAllRoomTypes(currentPage);
  }, [currentPage, types]);

  //Inicijalno ucitavanje
  useEffect(() => {
    if (!types.length) getAllRoomTypes(currentPage);
  }, [currentPage, types]);

  return (
    <div className="text-center" style={{ marginTop: "55px" }}>
      <Alert />
      <Modal
        open={openModal}
        handleClose={handleCloseModal}
        userAction={() => deleteSingleRoomType(modalType)}
        modalHeader={"Delete Room Type"}
        modalText={"Are you shure you want to delete this room type?"}
      />
      {/* //////////////////// Add new room Type //////////////////////////// */}
      <List
        component="nav"
        aria-labelledby="nested-list-subheader"
        className="bg-gray-400 py-6"
      >
        <ListItem button onClick={handleClickList}>
          <ListItemIcon>{/* icon  */}</ListItemIcon>
          <ListItemText primary="Add New Type" />
          {openList ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={openList} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <EditRoomType
              type={typeForEdit}
              setTypeForEdit={setTypeForEdit}
              getAllRoomTypes={() => getAllRoomTypes(currentPage)}
            />
          </List>
        </Collapse>
      </List>

      {types.length ? (
        <>
          <Paper className={classes.root}>
            <Table className={classes.table}>
              <TableHead>
                <TableRow>
                  <TableCell>Type Name</TableCell>
                  <TableCell className="cell-xs" align="left">
                    Beds
                  </TableCell>
                  <TableCell className="cell-sm" align="left">
                    Max <br /> Persons
                  </TableCell>
                  <TableCell className="cell-sm" align="left">
                    Price <br /> Adult
                  </TableCell>
                  <TableCell className="cell-sm" align="left">
                    Price <br /> Child
                  </TableCell>
                  <TableCell className="cell-sm" size="small" align="left">
                    Edit <br /> Type
                  </TableCell>
                  <TableCell className="cell-sm" align="left">
                    Delete <br /> Type
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {types.map(type => (
                  <TableRow key={type.id}>
                    <TableCell align="left">{type.name}</TableCell>
                    <TableCell align="left">{type.bed_count}</TableCell>
                    <TableCell align="left">{type.max_persons}</TableCell>
                    <TableCell align="left">{type.price_adult}</TableCell>
                    <TableCell align="left">{type.price_child}</TableCell>
                    <TableCell align="left">
                      {" "}
                      <Link to="#">
                        <Button
                          onClick={() => {
                            setOpenList(true);
                            setTypeForEdit(type);
                          }}
                          variant="contained"
                          color="primary"
                          className={classes.button}
                        >
                          Edit
                        </Button>
                      </Link>
                    </TableCell>

                    <TableCell align="left">
                      {" "}
                      <Button
                        onClick={() => handleClickOpenModal(type.id)}
                        variant="contained"
                        color="secondary"
                        className={classes.button}
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
    </div>
  );
}

export default RoomTypes;
