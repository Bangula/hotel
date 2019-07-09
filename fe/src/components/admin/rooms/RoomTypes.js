import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
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
  List
} from "@material-ui/core";

import { getRoomTypes, deleteRoomType, createRoomType } from "@endpoints/rooms";

import "@zendeskgarden/react-pagination/dist/styles.css";
import { ThemeProvider } from "@zendeskgarden/react-theming";
import { Pagination } from "@zendeskgarden/react-pagination";

import Modal from "../Modal";
import Alert from "react-s-alert";

import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import StarBorder from "@material-ui/icons/StarBorder";
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
  }, [currentPage]);

  //Inicijalno ucitavanje
  useEffect(() => {
    if (!types.length) getAllRoomTypes(currentPage);
  }, []);

  return (
    <div className="text-center" style={{ marginTop: "50px" }}>
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
        className="bg-gray-400 mb-4"
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
                  <TableCell align="left">Bed Count</TableCell>
                  <TableCell align="left">Maximum Persons</TableCell>
                  <TableCell align="left">Price Adult</TableCell>
                  <TableCell align="left">Price Child</TableCell>
                  <TableCell size="small" align="left">
                    Edit Room Type
                  </TableCell>
                  <TableCell align="left">Delete Type</TableCell>
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
                          Edit Room Type
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
                        Delete Room Type
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
