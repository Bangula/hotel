import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { makeStyles, Button } from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";

import { getUsersPerPage } from "@endpoints/users";
import ReactTable from "react-table";
import "react-table/react-table.css";
import "@zendeskgarden/react-pagination/dist/styles.css";

import { ThemeProvider } from "@zendeskgarden/react-theming";
import { Pagination } from "@zendeskgarden/react-pagination";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

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
  useEffect(() => {
    getUsersPerPageHandle(currentPage);
  }, [currentPage]);

  console.log("users", users);

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
