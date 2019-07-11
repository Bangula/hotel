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
  CircularProgress
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

function Users() {
  const [openModal, setOpenModal] = React.useState(false);
  const [modalUser, setModalUser] = React.useState("");
  const [currentPage, setCurrentPage] = useState(1); //for api
  const [totalPages, setTotalPages] = useState(1);
  const [users, setUsers] = useState([]);

  const [userRoleId, setUserRoleId] = useState("");
  const [selectedRole, setSelectedRole] = useState("");
  const [allRoles, setAllRoles] = useState([]);
  const [roleModalStatus, setRoleModalStatus] = useState(false);

  useEffect(() => {
    getRoles();
  }, []);

  async function getRoles() {
    const { data, error } = await getAllRoles();
    if (data) {
      console.log(data);
      setAllRoles(data.data.data);
    } else if (error) {
      console.log(error);
    }
  }
  const roleList = allRoles.length
    ? allRoles.map(item => {
        return (
          <MenuItem value={item.id} key={item.id}>
            {item.name}
          </MenuItem>
        );
      })
    : null;

  function handleClickOpenModal(userId) {
    setModalUser(userId);
    setOpenModal(true);
  }

  function handleCloseModal() {
    setOpenModal(false);
  }
  const classes = useStyles();

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
      getUsersPerPageHandle(currentPage);
      handleCloseModal();
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

  const handleRoleChange = id => {
    setRoleModalStatus(true);
    setUserRoleId(id);
    console.log(id);
  };
  const handleRoleAdd = async () => {
    setRoleModalStatus(false);
    const { data, error } = await assignRoleToUser({
      user_id: userRoleId,
      roles_ids: selectedRole
    });
    if (data) {
      console.log(data);
    } else if (error) {
      console.log(error.response);
    }
    console.log(userRoleId);
  };

  return (
    <div className="text-center">
      <Modal
        open={openModal}
        handleClose={handleCloseModal}
        userAction={() => deleteSingleUser(modalUser)}
        modalHeader={"Delete User"}
        modalText={"Are you shure you want to delete this user?"}
      />
      <RoleModal open={roleModalStatus}>
        <div className="px-8 py-4">
          <h1 className="text-center text-gray-600 italic py-4 text-lg">
            Assign role to user
          </h1>
          <div className="flex justify-start">
            <p className="text-center text-gray-600 italic mr-4">Select role</p>
            <Select
              value={selectedRole}
              onChange={e => setSelectedRole(e.target.value)}
            >
              {roleList}
            </Select>
          </div>
          <div className="flex justify-end">
            <Button
              variant="contained"
              color="secondary"
              onClick={() => setRoleModalStatus(false)}
            >
              Close
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={handleRoleAdd}
              style={{ marginLeft: "10px" }}
            >
              Add role
            </Button>
          </div>
        </div>
      </RoleModal>
      ;
      {users.length ? (
        <>
          <div className="from-top" />
          <Paper className={classes.root}>
            <Table className={classes.table}>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell align="left">Lastname</TableCell>
                  <TableCell align="left">Email</TableCell>
                  <TableCell size="small" align="left">
                    Add role to user
                  </TableCell>
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
                      <Button
                        variant="contained"
                        color="primary"
                        className={classes.button}
                        onClick={() => handleRoleChange(user.id)}
                      >
                        ADD ROLE
                      </Button>
                    </TableCell>
                    <TableCell align="left">
                      {" "}
                      <Link to={`/admin/users/edit/${user.id}`}>
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
                        onClick={() => handleClickOpenModal(user.id)}
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

export default Users;
