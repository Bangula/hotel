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
  Card,
  Divider,
  CardContent,
  Typography
} from "@material-ui/core";

import { getUsersPerPage } from "@endpoints/users";

import "@zendeskgarden/react-pagination/dist/styles.css";

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
  }, [users]);
  useEffect(() => {
    if (totalPages) getUsersPerPageHandle(totalPages);
  }, [totalPages]);
  return (
    <div className="text-center w-full">
      {users.length ? (
        <>
          <div className="from-top " />
          <Card className="w-11/12 mx-auto">
            <Paper className={classes.root}>
              <CardContent className="flex justify-center">
                <TableHead style={{ margin: "0 auto" }}>
                  <TableRow>
                    <TableCell align="left">New :{users.length}</TableCell>

                    <TableCell />

                    <TableCell align="right">
                      <Typography
                        variant="body2"
                        color="textSecondary"
                        component="p"
                        className="flex justify-center items-center"
                      >
                        Latest Users
                      </Typography>
                    </TableCell>
                    <TableCell align="left" />
                    <TableCell align="left" />

                    <TableCell align="left">
                      <Link to="/admin/users">
                        <Button
                          variant="contained"
                          style={{ marginLeft: "66px" }}
                        >
                          Users
                          <i className="pl-4 text-lg far fa-arrow-alt-circle-right " />
                        </Button>
                      </Link>
                    </TableCell>
                  </TableRow>
                </TableHead>

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
