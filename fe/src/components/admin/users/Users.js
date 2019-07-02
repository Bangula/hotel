import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  makeStyles,
  AppBar,
  Tabs,
  Tab,
  Typography,
  Button
} from "@material-ui/core";

import { getUsersPerPage } from "@endpoints/users";
import ReactTable from "react-table";
import "react-table/react-table.css";
function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {props.children}
    </Typography>
  );
}

function LinkTab(props) {
  return (
    <Tab
      component="a"
      onClick={event => {
        event.preventDefault();
      }}
      {...props}
    />
  );
}

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.paper
  }
}));

function Users() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [users, setUsers] = useState([]);

  function handleChange(event, newValue) {
    setValue(newValue);
  }
  const getUsersPerPageHandle = async page => {
    const { data, error } = await getUsersPerPage(page);
    if (data) {
      console.log("users fetched", data.data);
      setUsers(data.data.data);
    } else if (error) {
      console.log(error.response);
    }
  };
  useEffect(() => {
    getUsersPerPageHandle(currentPage);
  }, []);
  return (
    <div>
      List of all users
      <ReactTable
        data={users}
        columns={[
          {
            Header: "Name",
            columns: [
              {
                Header: "First Name",
                accessor: "first_name"
              },
              {
                Header: "Last Name",
                accessor: "last_name"
              }
            ]
          },
          {
            Header: "Info",
            columns: [
              {
                Header: "Email",
                accessor: "email"
              }
            ]
          },
          {
            Header: "Actions",
            columns: [
              {
                Header: "Edit",
                id: "editUser",
                accessor: data => (
                  <Link to={`/admin/edit-user/${data.id}`}>
                    <Button
                      variant="contained"
                      color="primary"
                      className={classes.button}
                    >
                      Edit :{data.id}
                    </Button>
                  </Link>
                )
              },
              {
                Header: "Delete",
                id: "id",
                accessor: data => (
                  <Button
                    variant="contained"
                    color="secondary"
                    className={classes.button}
                  >
                    Delete user
                  </Button>
                )
              }
            ]
          }
        ]}
        defaultSorted={[
          {
            id: "age",
            desc: true
          }
        ]}
        defaultPageSize={10}
        onPageChange={page => setCurrentPage(page)}
        className="-striped -highlight"
      />
    </div>
  );
}

export default Users;
