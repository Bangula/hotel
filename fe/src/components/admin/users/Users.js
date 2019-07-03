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

import { getUsersPerPage, deleteUser } from "@endpoints/users";

import "@zendeskgarden/react-pagination/dist/styles.css";
import { ThemeProvider } from "@zendeskgarden/react-theming";
import { Pagination } from "@zendeskgarden/react-pagination";

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.paper
  }
}));

function Users() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const [currentPage, setCurrentPage] = useState(1); //for api
  const [totalPages, setTotalPages] = useState(1);
  const [users, setUsers] = useState([]);

  const getUsersPerPageHandle = async page => {
    const { data, error } = await getUsersPerPage(page);
    if (data) {
      console.log("users fetched", data.data);
      setUsers(data.data.data);
      setTotalPages(data.data.meta.pagination.total_pages);
    } else if (error) {
      console.log(error.response);
    }
  };

  const deleteSingleUser = async userId => {
    const { data, error } = await deleteUser(userId);
    if (data) {
      console.log("user deleted", data.data);
      getUsersPerPageHandle(currentPage);
      // setUsers(data.data.data);
      // setTotalPages(data.data.meta.pagination.total_pages);
    } else if (error) {
      console.log(error.response);
    }
  };

  //Kada se menja strana paginacije
  useEffect(() => {
    if (users.length) getUsersPerPageHandle(currentPage);
  }, [currentPage]);

  //Inicijalno ucitavanje
  useEffect(() => {
    if (!users.length) getUsersPerPageHandle(currentPage);
  }, []);

  return (
    <div className="text-center">
      {users.length ? (
        <>
          <Paper className={classes.root}>
            <Table className={classes.table}>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell align="left">Lastname</TableCell>
                  <TableCell align="left">Email</TableCell>
                  <TableCell size="small" align="left">
                    Edit User
                  </TableCell>
                  <TableCell align="left">Delete User</TableCell>
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
                    <TableCell align="left">
                      {" "}
                      <Link to={`/admin/edit-user/${user.id}`}>
                        <Button
                          variant="contained"
                          color="primary"
                          className={classes.button}
                        >
                          Edit User
                        </Button>
                      </Link>
                    </TableCell>

                    <TableCell align="left">
                      {" "}
                      <Button
                        onClick={() => deleteSingleUser(user.id)}
                        variant="contained"
                        color="secondary"
                        className={classes.button}
                      >
                        Delete user
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

export default Users;
