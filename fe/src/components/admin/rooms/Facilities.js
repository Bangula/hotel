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

import {
  getFacilities,
  deleteFacilitiy,
  createRoomType
} from "@endpoints/rooms";

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
import CreateOrEditFacilities from "./CreateOrEditFacilities";

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.paper
  }
}));

//DISABLE ON CLICK RIPPLE

function Facilities() {
  const classes = useStyles();

  const [currentPage, setCurrentPage] = useState(1); //for api
  const [totalPages, setTotalPages] = useState(1);

  const [facilities, setFacilities] = useState([]);
  const [openModal, setOpenModal] = React.useState(false);
  const [modalFacility, setModalFacility] = React.useState(""); //stores data of current facility id for modal
  const [openList, setOpenList] = React.useState(false);
  const [facilityForEdit, setFacilityForEdit] = React.useState({});

  function handleClickOpenModal(id) {
    setModalFacility(id);
    setOpenModal(true);
  }

  function handleCloseModal() {
    setOpenModal(false);
  }

  //Toggle list
  function handleClickList() {
    setOpenList(!openList);
  }
  const getAllFacilities = async page => {
    const { data, error } = await getFacilities(page);
    if (data) {
      console.log("types fetched", data.data);
      setFacilities(data.data.data);
      setTotalPages(data.data.meta.pagination.total_pages);
    } else if (error) {
      console.log(error.response);
    }
  };

  const deleteSingleFacility = async facilityId => {
    const { data, error } = await deleteFacilitiy(facilityId);
    if (data) {
      Alert.success("Facility Deleted!");
      getAllFacilities(currentPage);
      handleCloseModal();
    } else if (error) {
      console.log(error.response);
    }
  };

  //Kada se menja strana paginacije
  useEffect(() => {
    if (facilities.length) getAllFacilities(currentPage);
  }, [currentPage]);

  //Inicijalno ucitavanje
  useEffect(() => {
    if (!facilities.length) getAllFacilities(currentPage);
  }, []);

  return (
    <div className="text-center">
      <Alert />
      <Modal
        open={openModal}
        handleClose={handleCloseModal}
        userAction={() => deleteSingleFacility(modalFacility)}
        modalHeader={"Delete Room Facility"}
        modalText={"Are you shure you want to delete this room facility?"}
      />
      {/* //////////////////// Add new room Type //////////////////////////// */}
      <div className="from-top" />
      <List
        component="nav"
        aria-labelledby="nested-list-subheader"
        className="bg-gray-400 mb-4"
      >
        <ListItem button onClick={handleClickList}>
          <ListItemIcon>{/* icon  */}</ListItemIcon>
          <ListItemText primary="Add new Facility" />
          {openList ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={openList} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <CreateOrEditFacilities
              facility={facilityForEdit}
              setFacilityForEdit={setFacilityForEdit}
              getAllFacilities={() => getAllFacilities(currentPage)}
            />
          </List>
        </Collapse>
      </List>

      {facilities.length ? (
        <>
          <Paper className={classes.root}>
            <Table className={classes.table}>
              <TableHead>
                <TableRow>
                  <TableCell>Type Name</TableCell>

                  <TableCell align="left">Price Child</TableCell>
                  <TableCell size="small" align="left">
                    Edit Room Type
                  </TableCell>
                  <TableCell align="left">Delete Type</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {facilities.map(facility => (
                  <TableRow key={facility.id}>
                    <TableCell align="left">{facility.name}</TableCell>

                    <TableCell align="left">{facility.price}</TableCell>
                    <TableCell align="left">
                      {" "}
                      <Link to="#">
                        <Button
                          onClick={() => {
                            setOpenList(true);
                            setFacilityForEdit(facility);
                          }}
                          variant="contained"
                          color="primary"
                          className={classes.button}
                        >
                          Edit Room Facility
                        </Button>
                      </Link>
                    </TableCell>

                    <TableCell align="left">
                      {" "}
                      <Button
                        // onClick={() => handleClickOpenModal(facility.id)}
                        onClick={() => deleteSingleFacility(facility.id)}
                        variant="contained"
                        color="secondary"
                        className={classes.button}
                      >
                        Delete Room Facility
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

export default Facilities;
