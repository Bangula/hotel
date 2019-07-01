import React from "react";
import Button from "@material-ui/core/Button";
import clsx from "clsx";

import Paper from "@material-ui/core/Paper";
import Icon from "@material-ui/core/Icon";
import Divider from "@material-ui/core/Divider";

import ListSubheader from "@material-ui/core/ListSubheader";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";

import InboxIcon from "@material-ui/icons/MoveToInbox";
import DraftsIcon from "@material-ui/icons/Drafts";
import SendIcon from "@material-ui/icons/Send";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import StarBorder from "@material-ui/icons/StarBorder";

import { makeStyles } from "@material-ui/core/styles";
import { deepOrange, deepPurple, grey } from "@material-ui/core/colors";
import Collapse from "@material-ui/core/Collapse";
import Avatar from "@material-ui/core/Avatar";

const useStyles = makeStyles({
  avatar: {},
  orangeAvatar: {
    margin: 0,
    color: "#fff",
    backgroundColor: deepOrange[500]
  },
  purpleAvatar: {
    margin: 0,
    padding: 0,
    color: "#fff",
    backgroundColor: deepPurple[500]
  },
  nested: {
    paddingLeft: 20,
    backgroundColor: grey[400]
  },
  submenu: { backgroundColor: grey[300] }
});

const Admin = () => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [openProfile, setOpenProfile] = React.useState(false);

  function handleClick() {
    setOpen(!open);
  }
  return (
    <>
      <div className="user-header" />
      <div className="h-screen">
        <Paper className="w-1/6 h-full">
          <List
            component="nav"
            aria-labelledby="nested-list-subheader"
            className={classes.root}
          >
            <ListItem button onClick={() => setOpenProfile(!openProfile)}>
              <ListItemIcon>
                <Avatar className={classes.purpleAvatar}>OP</Avatar>
              </ListItemIcon>
              <ListItemText primary="Users Name " />
              {openProfile ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Divider component="li" variant="middle" />

            <Collapse
              in={openProfile}
              timeout="auto"
              unmountOnExit
              className={classes.nested}
            >
              <List component="div" className={classes.submenu}>
                <ListItem button>
                  <ListItemText primary="My Profile" />
                </ListItem>
                <ListItem button>
                  <ListItemText primary="Edit Profile" />
                </ListItem>
              </List>
            </Collapse>
            {/* ///////////////////////////////////////////////// profile */}
            <ListItem button>
              <ListItemIcon>
                <Icon
                  className={clsx(classes.icon, "fas fa-columns")}
                  color="action"
                />
              </ListItemIcon>
              <ListItemText primary="Dashboard" />
            </ListItem>

            <Divider component="li" variant="middle" />

            <ListItem button>
              <ListItemIcon>
                <Icon
                  className={clsx(classes.icon, "fas fa-users")}
                  color="action"
                />
              </ListItemIcon>
              <ListItemText primary="Users" />
            </ListItem>

            <ListItem button>
              <ListItemIcon>
                <Icon
                  className={clsx(classes.icon, "far fa-images")}
                  color="action"
                />
              </ListItemIcon>
              <ListItemText primary="Gallery" />
            </ListItem>
            <ListItem button>
              <ListItemIcon>
                <Icon
                  className={clsx(classes.icon, "fas fa-mail-bulk")}
                  color="action"
                />
              </ListItemIcon>
              <ListItemText primary="Newsletter" />
            </ListItem>
            <ListItem button>
              <ListItemIcon>
                <Icon
                  className={clsx(classes.icon, "fas fa-star")}
                  color="action"
                />
              </ListItemIcon>
              <ListItemText primary="Reviews" />
            </ListItem>
            <ListItem button>
              <ListItemIcon>
                <Icon
                  className={clsx(classes.icon, "fas fa-sign-out-alt")}
                  color="action"
                />
              </ListItemIcon>
              <ListItemText primary="Logout" />
            </ListItem>
          </List>
        </Paper>
      </div>
    </>
  );
};

export default Admin;
