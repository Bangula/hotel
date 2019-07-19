import React, { useState, useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";

import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import TabContainer from "./components/TabContainer";
import LinkTab from "./components/LinkTab";

import NewCampaign from "./components/NewCampaign";

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

import {
  getAllSubscribers,
  deleteSubscriber,
  subscribeUser
} from "@endpoints/subscribe";

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

function Subscribers() {
  const [openModal, setOpenModal] = React.useState(false);
  const [email, setEmail] = React.useState("");
  const [value, setValue] = React.useState(0);

  React.useEffect(() => {
    document.title = "Quantox Hotel - Admin Panel - Subscribers";
  }, []);

  function handleChange(event, newValue) {
    setValue(newValue);
  }
  // const handleSubmit = async e => {
  //   e.preventDefault();
  //   const { data, error } = await subscribeUser({ email });
  //   console.log(email);

  //   if (data) {
  //     console.log(data);
  //     Alert.success(<i className="fas fa-check" />, {
  //       effect: "slide",
  //       timeout: 2000
  //     });
  //     getAllSubscribers(currentPage);
  //   } else if (error) {
  //     console.log(error.response);
  //   }
  // };

  function handleClickOpenModal(email) {
    setEmail(email);
    setOpenModal(true);
  }

  function handleCloseModal() {
    setOpenModal(false);
  }
  const classes = useStyles();

  const [currentPage, setCurrentPage] = useState(1); //for api
  const [totalPages, setTotalPages] = useState(1);
  const [subscribers, setSubscribers] = useState([]);

  const [subscribeError, setSubscribeError] = useState("");

  const [newEmail, setNewEmail] = useState("");

  const getSubscribers = async page => {
    const { data, error } = await getAllSubscribers(page);
    if (data) {
      console.log(" fetched", data.data);
      setSubscribers(data.data.data);
      setTotalPages(data.data.meta.pagination.total_pages);
    } else if (error) {
      console.log(error.response);
    }
  };

  const deleteSubscriberById = async email => {
    const { data, error } = await deleteSubscriber(email);
    if (data) {
      handleCloseModal();
      getSubscribers(currentPage);
    } else if (error) {
      console.log(error.response);
    }
  };

  useEffect(() => {
    if (subscribers.length) getSubscribers(currentPage);
  }, [currentPage, subscribers]);

  useEffect(() => {
    if (!subscribers.length) getSubscribers(currentPage);
  }, [subscribers, currentPage]);

  const handleSubscribe = async e => {
    e.preventDefault();
    const { data, error } = await subscribeUser({ email: newEmail });
    console.log(newEmail);

    if (data) {
      console.log(data.data);
      setSubscribeError("");
      getSubscribers(currentPage);

      Alert.success(<i className="fas fa-check" />, {
        effect: "slide",
        timeout: 2000,
        position: "bottom-right"
      });
    } else if (error) {
      console.log(error.response);
      if (error.response.data.message)
        setSubscribeError(error.response.data.message);
    }
  };

  return (
    <div className={classes.root2} style={{ marginTop: "42px" }}>
      <Alert />
      <AppBar position="static">
        <Tabs variant="fullWidth" value={value} onChange={handleChange}>
          <LinkTab label="All subscribers" href="/drafts" />
          <LinkTab label="Create new Subscriber" href="/trash" />
          <LinkTab label="Create new campaign" href="/spam" />
        </Tabs>
      </AppBar>
      {value === 0 && (
        <TabContainer>
          <div className="text-center">
            <Modal
              open={openModal}
              handleClose={handleCloseModal}
              userAction={() => deleteSubscriberById(email)}
              modalHeader={"Remove subscriber"}
              modalText={"Are you shure you want to delete this subscriber?"}
            />

            {subscribers.length ? (
              <>
                <Paper className={classes.root}>
                  <Table className={classes.table}>
                    <TableHead>
                      <TableRow>
                        <TableCell className="cell-xs">Id</TableCell>
                        <TableCell align="left">Email</TableCell>

                        <TableCell align="right" />
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {subscribers.map(user => (
                        <TableRow key={user.id}>
                          <TableCell
                            component="th"
                            scope="row"
                            className="cell-xs"
                          >
                            {user.real_id}
                          </TableCell>
                          <TableCell
                            align="left"
                            style={{
                              fontWeight: "bold",
                              fontSize: "1rem",
                              fontStyle: "italic"
                            }}
                          >
                            {user.email}
                          </TableCell>

                          <TableCell align="right">
                            {" "}
                            <Button
                              onClick={() => handleClickOpenModal(user.email)}
                              variant="contained"
                              color="secondary"
                              className={classes.button}
                            >
                              REMOVE SUBSCRIBER
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
          <div className="shadow-lg mb-16 border  py-8">
            <h1 className="text-center text-gray-600 italic">
              Create new subscriber
            </h1>
            <div className="flex justify-center mx-auto mt-8">
              <form
                onSubmit={handleSubscribe}
                style={{ margin: 0, padding: 0 }}
              >
                <TextField
                  id="standard-name"
                  label="Email"
                  className=""
                  onChange={e => setNewEmail(e.target.value)}
                />
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  style={{
                    marginTop: "10px",
                    marginLeft: "20px"
                  }}
                >
                  Submit
                </Button>
              </form>
            </div>
            <h1 className="text-red-600 italic text-center mt-8">
              {subscribeError ? subscribeError : ""}
            </h1>
          </div>
        </TabContainer>
      )}
      {value === 2 && (
        <TabContainer>
          <NewCampaign Alert={Alert} />
        </TabContainer>
      )}
    </div>
  );
}

export default Subscribers;
