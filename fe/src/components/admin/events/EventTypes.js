import React, { useState, useEffect } from "react";

import { getAllEventTypes, deleteEventType } from "@endpoints/events";

import { makeStyles } from "@material-ui/core/styles";

import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import TabContainer from "../subscribers/components/TabContainer";
import LinkTab from "../subscribers/components/LinkTab";
import CreateEventTypes from "./components/CreateEventTypes";

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

const EventsTypes = () => {
  const [openModal, setOpenModal] = React.useState(false);
  const [value, setValue] = React.useState(0);
  const [currentPage, setCurrentPage] = useState(1); //for api
  const [totalPages, setTotalPages] = useState(1);

  const [eventTypes, setEventTypes] = useState([]);
  const [eventId, setEventId] = useState("");
  const [editId, setEditid] = useState("");

  useEffect(() => {
    setEditid("");
    getData(currentPage);
  }, [value, currentPage]);

  async function getData(page) {
    const { data, error } = await getAllEventTypes(page);
    if (data) {
      console.log(data.data);
      setEventTypes(data.data.data);
      setTotalPages(data.data.meta.pagination.total_pages);
    } else if (error) {
      console.log(error.response);
    }
  }

  const deleteEventTypesById = async id => {
    const { data, error } = await deleteEventType(id);
    if (data) {
      console.log(data.data);
      getData(currentPage);
    } else if (error) {
      console.log(error.response);
    }
  };

  function handleChange(event, newValue) {
    setValue(newValue);
  }

  function handleClickOpenModal(id) {
    setEventId(id);
    setOpenModal(true);
  }

  function handleCloseModal() {
    setOpenModal(false);
  }
  const handleEdit = id => {
    setValue(1);
    setEditid(id);
  };
  const classes = useStyles();

  return (
    <div className={classes.root2} style={{ marginTop: "42px" }}>
      <Alert />
      <AppBar position="static">
        <Tabs variant="fullWidth" value={value} onChange={handleChange}>
          <LinkTab label="All event-types" href="/drafts" />
          <LinkTab label="Create new event type" href="/trash" />
        </Tabs>
      </AppBar>
      {value === 0 && (
        <TabContainer>
          <div className="text-center">
            <Modal
              open={openModal}
              handleClose={handleCloseModal}
              userAction={() => deleteEventTypesById(eventId)}
              modalHeader={"Remove event-type"}
              modalText={"Are you shure you want to delete this event type?"}
            />

            {eventTypes.length ? (
              <>
                <Paper className={classes.root}>
                  <Table className={classes.table}>
                    <TableHead>
                      <TableRow>
                        <TableCell>Name</TableCell>

                        <TableCell align="right" />
                        <TableCell align="right" />
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {eventTypes.map(event => (
                        <TableRow key={event.id}>
                          <TableCell component="th" scope="row">
                            <span className="italic font-semibold text-gray-600 text-lg">
                              {event.name}
                            </span>
                          </TableCell>

                          <TableCell align="right">
                            <Button
                              onClick={() => handleEdit(event.id)}
                              variant="contained"
                              color="primary"
                              className={classes.button}
                            >
                              EDIT
                            </Button>
                          </TableCell>

                          <TableCell align="right">
                            <Button
                              onClick={() => handleClickOpenModal(event.id)}
                              variant="contained"
                              color="secondary"
                              className={classes.button}
                            >
                              DELETE
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
        </TabContainer>
      )}
      {value === 1 && (
        <TabContainer>
          <CreateEventTypes id={editId} setValue={() => setValue(0)} />
        </TabContainer>
      )}
    </div>
  );
};

export default EventsTypes;
