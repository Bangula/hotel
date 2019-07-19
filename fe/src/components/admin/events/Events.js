import React, { useState, useEffect } from "react";

import { getAllEvents, deleteEvent } from "@endpoints/events";

import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";

import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import TabContainer from "../subscribers/components/TabContainer";
import LinkTab from "../subscribers/components/LinkTab";
import CreateEvent from "./components/CreateEvent";

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

const Events = () => {
  const [openModal, setOpenModal] = React.useState(false);
  const [value, setValue] = React.useState(0);
  const [currentPage, setCurrentPage] = useState(1); //for api
  const [totalPages, setTotalPages] = useState(1);

  const [events, setEvents] = useState([]);
  const [eventId, setEventId] = useState("");
  const [editId, setEditid] = useState("");

  React.useEffect(() => {
    document.title = "Quantox Hotel - Admin Panel - Events";
  }, []);

  useEffect(() => {
    setEditid("");
    getData(currentPage);
  }, [value]);

  async function getData(page) {
    const { data, error } = await getAllEvents(page);
    if (data) {
      console.log(data.data);
      setEvents(data.data.data);
      setTotalPages(data.data.meta.pagination.total_pages);
    } else if (error) {
      console.log(error.response);
    }
  }

  const deleteEventById = async id => {
    const { data, error } = await deleteEvent(id);
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
          <LinkTab label="All events" href="/drafts" />
          <LinkTab label="Create new event" href="/trash" />
        </Tabs>
      </AppBar>
      {value === 0 && (
        <TabContainer>
          <div className="text-center">
            <Modal
              open={openModal}
              handleClose={handleCloseModal}
              userAction={() => deleteEventById(eventId)}
              modalHeader={"Remove event"}
              modalText={"Are you shure you want to delete this event?"}
            />

            {events.length ? (
              <>
                <Paper className={classes.root}>
                  <Table className={classes.table}>
                    <TableHead>
                      <TableRow>
                        <TableCell>Title</TableCell>

                        <TableCell align="right" />
                        <TableCell align="right" />
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {events.map(event => (
                        <TableRow key={event.id}>
                          <TableCell component="th" scope="row">
                            <span className="italic font-semibold text-gray-600 text-lg">
                              {event.title}
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
          <CreateEvent Alert={Alert} id={editId} setValue={() => setValue(0)} />
        </TabContainer>
      )}
    </div>
  );
};

export default Events;
