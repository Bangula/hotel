import React from "react";
import Button from "@material-ui/core/Button";
import clsx from "clsx";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import { makeStyles } from "@material-ui/core/styles";
import { deepOrange, deepPurple, grey } from "@material-ui/core/colors";
import Dashboard from "./Dashboard";
import Users from "./users/Users";
import Gallery from "./Gallery";
import Newsletter from "./Newsletter";
import Reviews from "./Reviews";

import {
  Avatar,
  Collapse,
  ListItemText,
  ListItemIcon,
  ListItem,
  List,
  Divider,
  Icon,
  Paper
} from "@material-ui/core";

import { Switch, Route, NavLink } from "react-router-dom";

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

const Admin = props => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [openProfile, setOpenProfile] = React.useState(false);

  return (
    <>
      <div className="user-header" />
      <div className="h-screen flex">
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

            <NavLink to="/admin/dashboard">
              <ListItem button>
                <ListItemIcon>
                  <Icon
                    className={clsx(classes.icon, "fas fa-columns")}
                    color="action"
                  />
                </ListItemIcon>
                <ListItemText primary="Dashboard" />
              </ListItem>
            </NavLink>

            <Divider component="li" variant="middle" />
            <NavLink to="/admin/users" activeClassName="admin-link">
              <ListItem button>
                <ListItemIcon>
                  <Icon
                    className={clsx(classes.icon, "fas fa-users")}
                    color="action"
                  />
                </ListItemIcon>
                <ListItemText primary="Users" />
              </ListItem>
            </NavLink>

            <NavLink to="/admin/gallery">
              <ListItem button>
                <ListItemIcon>
                  <Icon
                    className={clsx(classes.icon, "far fa-images")}
                    color="action"
                  />
                </ListItemIcon>
                <ListItemText primary="Gallery" />
              </ListItem>
            </NavLink>

            <NavLink to="/admin/newsletter">
              <ListItem button>
                <ListItemIcon>
                  <Icon
                    className={clsx(classes.icon, "fas fa-mail-bulk")}
                    color="action"
                  />
                </ListItemIcon>
                <ListItemText primary="Newsletter" />
              </ListItem>
            </NavLink>

            <NavLink to="/admin/reviews">
              <ListItem button>
                <ListItemIcon>
                  <Icon
                    className={clsx(classes.icon, "fas fa-star")}
                    color="action"
                  />
                </ListItemIcon>
                <ListItemText primary="Reviews" />
              </ListItem>
            </NavLink>

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

        <div style={{ flex: 1 }}>
          <Switch>
            <Route path={`/admin/dashboard`} component={Dashboard} />
            <Route path={`/admin/users`} component={Users} />
            <Route path={`/admin/gallery`} component={Gallery} />
            <Route path={`/admin/newsletter`} component={Newsletter} />
            <Route path={`/admin/reviews`} component={Reviews} />
          </Switch>
        </div>
      </div>
    </>
  );
};

export default Admin;
