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
// import TabContainer from "./components/TabContainer";
// import LinkTab from "./components/LinkTab";

// import NewCampaign from "./components/NewCampaign";

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

const Songs = () => {
  return <div />;
};

export default Songs;
