import React, { useState, useEffect } from "react";

import {
  getAllSongs,
  createSong,
  deleteSong,
  updateSong,
  getSongById
} from "@endpoints/songs";

import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";

import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import TabContainer from "../subscribers/components/TabContainer";
import LinkTab from "../subscribers/components/LinkTab";
import CreateSong from "./components/CreateSong";

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

const Songs = () => {
  const [openModal, setOpenModal] = React.useState(false);
  const [value, setValue] = React.useState(0);
  const [currentPage, setCurrentPage] = useState(1); //for api
  const [totalPages, setTotalPages] = useState(1);

  const [songs, setSongs] = useState([]);
  const [songId, setSongId] = useState("");
  const [editId, setEditid] = useState("");

  useEffect(() => {
    getData(currentPage);
  }, []);

  async function getData(page) {
    const { data, error } = await getAllSongs(page);
    if (data) {
      console.log(data.data);
      setSongs(data.data.data);
      setTotalPages(data.data.meta.pagination.total_pages);
    } else if (error) {
      console.log(error.response);
    }
  }

  const deleteSongById = async id => {
    const { data, error } = await deleteSong(id);
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
    setSongId(id);
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
    <div className={classes.root2} style={{ marginTop: "100px" }}>
      <Alert />
      <AppBar position="static">
        <Tabs variant="fullWidth" value={value} onChange={handleChange}>
          <LinkTab label="All songs" href="/drafts" />
          <LinkTab label="Create new song" href="/trash" />
        </Tabs>
      </AppBar>
      {value === 0 && (
        <TabContainer>
          <div className="text-center">
            <Modal
              open={openModal}
              handleClose={handleCloseModal}
              userAction={() => deleteSongById(songId)}
              modalHeader={"Remove subscriber"}
              modalText={"Are you shure you want to delete this subscriber?"}
            />

            {songs.length ? (
              <>
                <Paper className={classes.root}>
                  <Table className={classes.table}>
                    <TableHead>
                      <TableRow>
                        <TableCell>Song name</TableCell>
                        <TableCell align="left">Artist</TableCell>

                        <TableCell align="right">Edit</TableCell>
                        <TableCell align="right">Delete</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {songs.map(song => (
                        <TableRow key={song.id}>
                          <TableCell component="th" scope="row">
                            {song.name}
                          </TableCell>
                          <TableCell
                            align="left"
                            style={{
                              fontWeight: "bold",
                              fontSize: "1rem",
                              fontStyle: "italic"
                            }}
                          >
                            {song.artist}
                          </TableCell>

                          <TableCell align="right">
                            <Button
                              onClick={() => handleEdit(song.id)}
                              variant="contained"
                              color="primary"
                              className={classes.button}
                            >
                              EDIT
                            </Button>
                          </TableCell>

                          <TableCell align="right">
                            <Button
                              onClick={() => handleClickOpenModal(song.id)}
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
          <CreateSong id={editId} />
        </TabContainer>
      )}
    </div>
  );
};

export default Songs;
