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
  Card,
  Divider,
  CardContent,
  Typography
} from "@material-ui/core";

import { getUsersPerPage, deleteUser } from "@endpoints/users";
import { getAllRoles, assignRoleToUser } from "@endpoints/roles";
import RoleModal from "../../common/modal";

import "@zendeskgarden/react-pagination/dist/styles.css";
import { ThemeProvider } from "@zendeskgarden/react-theming";
import { Pagination } from "@zendeskgarden/react-pagination";

import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";

import Modal from "../Modal";

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.paper
  }
}));

function NewUsers() {
  const [totalPages, setTotalPages] = useState(null);
  const [users, setUsers] = useState([]);

  const classes = useStyles();

  const setPages = async (page = 1) => {
    const { data, error } = await getUsersPerPage(page);
    if (data) {
      console.log("users fetched", data.data);
      //   setUsers(data.data.data);
      await setTotalPages(data.data.meta.pagination.total_pages);
    } else if (error) {
      console.log(error.response);
    }
  };
  const getUsersPerPageHandle = async page => {
    const { data, error } = await getUsersPerPage(page);
    if (data) {
      console.log("users fetched", data.data);
      setUsers(data.data.data);
      // setTotalPages(data.data.meta.pagination.total_pages);
    } else if (error) {
      console.log(error.response);
    }
  };

  //Inicijalno ucitavanje s tim da ucitava poslednju stranicu
  useEffect(() => {
    if (!users.length) setPages(1);
  }, []);
  useEffect(() => {
    if (totalPages) getUsersPerPageHandle(totalPages);
  }, [totalPages]);
  return (
    <div className="text-center w-full">
      {users.length ? (
        <>
          <div className="from-top " />
          <Card className="md:w-11/12 w-full mx-auto">
            <Paper className={classes.root}>
              <CardContent className="flex  justify-end items-center">
                <Typography
                  variant="body2"
                  color="textSecondary"
                  component="p"
                  style={{ marginRight: "auto" }}
                >
                  latest registered users
                </Typography>
                <Link to="/admin/users">
                  <Button variant="contained">
                    Users
                    <i className="pl-4 text-lg far fa-arrow-alt-circle-right " />
                  </Button>
                </Link>

                <Divider style={{ marginTop: "10px" }} />
              </CardContent>
              <Table className="">
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell align="left">Lastname</TableCell>
                    <TableCell align="left">Email</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {users.map(user => (
                    <TableRow key={user.id}>
                      <TableCell component="th" scope="row">
                        {user.first_name}
                      </TableCell>
                      <TableCell align="left">{user.last_name}</TableCell>
                      <TableCell align="left">{user.email}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Paper>
          </Card>
        </>
      ) : (
        <CircularProgress />
      )}
    </div>
  );
}

export default NewUsers;
