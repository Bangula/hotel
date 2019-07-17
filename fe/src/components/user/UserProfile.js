import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Button, TextField, Container, Snackbar } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import InputModal from "./components/InputModal";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Moment from "react-moment";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

// Components
import TabContainer from "./components/TabContainer";
import { Redirect } from "react-router-dom";

import { updateUserInfo, getLogedUser } from "@endpoints/users";
import { getAllReservations } from "@endpoints/reservations";

const useStyles = makeStyles(theme => ({
  submit: {
    padding: 10,
    margin: theme.spacing(3, 0, 2),
    root: {
      flexGrow: 1,
      backgroundColor: theme.palette.background.paper
    }
  },
  root: {
    width: "100%",
    marginTop: theme.spacing(3),
    overflowX: "auto"
  },
  table: {
    minWidth: 650
  }
}));

const UserProfile = ({ adminPanel }) => {
  const user = useSelector(state => state.user.info.data);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [value, setValue] = useState(0);
  const [reservations, setReservations] = useState([]);

  const [infoField, setInfoField] = useState("");

  const [userInfo, setUserInfo] = useState({});
  const classes = useStyles();

  useEffect(() => {
    getUserData();
    getReservations();
    window.scrollTo(0, 0);
  }, []);

  async function getUserData() {
    const { data, error } = await getLogedUser();
    if (data) {
      console.log(data);
      setUserInfo(data.data.data);
    } else if (error) {
      console.log(error);
    }
  }
  async function getReservations() {
    const { data, error } = await getAllReservations(user.id);
    if (data) {
      console.log(data);
      let userReservations = data.data.data.length
        ? data.data.data.filter(item => {
            return user.id === item.user.data.id;
          })
        : [];
      setReservations(userReservations);
    } else if (error) {
      console.log(error);
    }
  }

  function handleChange(event, newValue) {
    setValue(newValue);
  }

  const handleEdit = e => {
    setInfoField(e.target.id);
    setModalIsOpen(true);
  };

  const reservationList =
    reservations.length > 0 ? (
      <Paper className={classes.root}>
        <h1 className="p-2 italic">Reservations</h1>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell align="left">Booked</TableCell>
              <TableCell align="right">Total price</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {reservations
              ? reservations.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell align="left">{item.real_id}</TableCell>
                    <TableCell align="left">
                      <Moment format="YYYY/MM/DD">
                        {item.created_at.date}
                      </Moment>
                    </TableCell>
                    <TableCell align="right">{item.total_price}</TableCell>
                  </TableRow>
                ))
              : null}
          </TableBody>
        </Table>
      </Paper>
    ) : null;

  return (
    <>
      {user ? (
        <>
          {adminPanel ? null : <div className="header-image" />}
          <div className="container mx-auto mt-16 px-4 pb-32">
            {adminPanel ? null : (
              <h1 className="">
                <span className="text-4xl text-gray-600 font-semibold mr-6">
                  DASHBOARD
                </span>
                <br />
                <i className="fas fa-user mr-4" />
                <span>{user.first_name}</span>
              </h1>
            )}
            <div className="mt-16 w-12/12 md:w-8/12 mx-auto">
              {adminPanel ? null : (
                <h1 className="text-center italic text-gray-600 my-8">
                  Update Your Profile
                </h1>
              )}
              <div />
            </div>
            <div>
              <div className={classes.root}>
                <AppBar position="static">
                  <Tabs value={value} onChange={handleChange}>
                    <Tab label="User Info" />
                    <Tab label="User Reservations" />
                  </Tabs>
                </AppBar>
                {value === 0 && (
                  <TabContainer>
                    <div className="mt-8">
                      <div className="flex py-4 border-b-2 justify-between pl-2">
                        <p className="italic text-gray-600 leading-normal pt-2">
                          First Name:{" "}
                          <span className="font-semibold ml-4 text-lg md:text-2xl">
                            {userInfo.first_name
                              ? userInfo.first_name
                              : "no data"}
                          </span>
                        </p>
                        <Button onClick={handleEdit}>
                          <i
                            id="first_name"
                            className="fas fa-edit text-xl leading-normal text-gray-600"
                          />
                        </Button>
                      </div>

                      <div className="flex py-4 border-b-2 justify-between pl-2">
                        <p className="italic text-gray-600 leading-normal pt-2">
                          Last Name:{" "}
                          <span className="font-semibold ml-4 text-lg md:text-2xl">
                            {userInfo.last_name
                              ? userInfo.last_name
                              : "no data"}
                          </span>
                        </p>
                        <Button onClick={e => handleEdit(e)}>
                          <i
                            id="last_name"
                            className="fas fa-edit text-xl leading-normal text-gray-600"
                          />
                        </Button>
                      </div>

                      <div className="flex py-4 border-b-2 justify-between pl-2">
                        <p className="italic text-gray-600 leading-normal pt-2">
                          Email:{" "}
                          <span className="font-semibold ml-4 text-lg md:text-2xl">
                            {userInfo.email ? userInfo.email : "no data"}
                          </span>
                        </p>
                        <Button onClick={e => handleEdit(e)}>
                          <i
                            id="email"
                            className="fas fa-edit text-xl leading-normal text-gray-600"
                          />
                        </Button>
                      </div>

                      <div className="flex py-4 border-b-2 justify-between pl-2">
                        <p className="italic text-gray-600 leading-normal pt-2">
                          Phone Number:{" "}
                          <span className="font-semibold ml-4 text-lg md:text-2xl">
                            {userInfo.phone_number
                              ? userInfo.phone_number
                              : "no data"}
                          </span>
                        </p>
                        <Button onClick={e => handleEdit(e)}>
                          <i
                            id="phone_number"
                            className="fas fa-edit text-xl leading-normal text-gray-600"
                          />
                        </Button>
                      </div>

                      <div className="flex py-4 border-b-2 justify-between pl-2">
                        <p className="italic text-gray-600 leading-normal pt-2">
                          Address:{" "}
                          <span className="font-semibold ml-4 text-lg md:text-2xl">
                            {userInfo.address ? userInfo.address : "no data"}
                          </span>
                        </p>
                        <Button onClick={e => handleEdit(e)}>
                          <i
                            id="address"
                            className="fas fa-edit text-xl leading-normal text-gray-600"
                          />
                        </Button>
                      </div>

                      <div className="flex py-4 border-b-2 justify-between pl-2">
                        <p className="italic text-gray-600 leading-normal pt-2">
                          City:{" "}
                          <span className="font-semibold ml-4 text-lg md:text-2xl">
                            {userInfo.city ? userInfo.city : "no data"}
                          </span>
                        </p>
                        <Button onClick={e => handleEdit(e)}>
                          <i
                            id="city"
                            className="fas fa-edit text-xl leading-normal text-gray-600"
                          />
                        </Button>
                      </div>
                    </div>
                  </TabContainer>
                )}
                {value === 1 && <TabContainer>{reservationList}</TabContainer>}
              </div>
            </div>

            <InputModal
              infoField={infoField}
              open={modalIsOpen}
              getUserData={getUserData}
              userId={user.id && user.id}
              close={() => setModalIsOpen(false)}
            />
          </div>
        </>
      ) : (
        <Redirect to="/login" />
      )}
    </>
  );
};

export default UserProfile;
