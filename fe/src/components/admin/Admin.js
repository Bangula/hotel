import React from "react";
import Button from "@material-ui/core/Button";
import clsx from "clsx";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { deepOrange, deepPurple, grey } from "@material-ui/core/colors";
import Dashboard from "./Dashboard";
import Users from "./users/Users";
import Gallery from "./gallery/Gallery";
import Newsletter from "./Newsletter";
import Reviews from "./Reviews";
import EditUser from "./users/EditUser";

import {
  Avatar,
  Collapse,
  ListItemText,
  ListItemIcon,
  ListItem,
  List,
  Divider,
  Icon,
  Paper,
  CssBaseline,
  AppBar,
  Toolbar,
  Typography,
  Drawer
} from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";

import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";

import { Switch, Route, NavLink } from "react-router-dom";
const drawerWidth = 240;
const useStyles = makeStyles(theme => ({
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
  submenu: { backgroundColor: grey[300] },
  appBar: {
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  hide: {
    display: "none"
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0
  },
  drawerPaper: {
    width: drawerWidth
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: "0 8px",
    ...theme.mixins.toolbar,
    justifyContent: "flex-end"
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    marginLeft: -drawerWidth
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    }),
    marginLeft: 0
  }
}));

const Admin = props => {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(true);
  const [openProfile, setOpenProfile] = React.useState(false);
  const [openUsers, setOpenUsers] = React.useState(false);
  const [openGallery, setOpenGallery] = React.useState(false);

  function handleDrawerOpen() {
    setOpen(true);
  }

  function handleDrawerClose() {
    setOpen(false);
  }

  return (
    <>
      <div className="user-header" />
      <div className="h-screen flex">
        {/* <CssBaseline /> */}
        <AppBar
          // position="fixed"
          className={clsx(classes.appBar, {
            [classes.appBarShift]: open
          })}
        >
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="Open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              className={clsx(classes.menuButton, open && classes.hide)}
            >
              <MenuIcon />
            </IconButton>

            <ListItem button>
              <ListItemIcon>
                <Avatar className={classes.purpleAvatar}>OP</Avatar>
              </ListItemIcon>
              <ListItemText primary="Users Name " />
            </ListItem>
          </Toolbar>
        </AppBar>
        <Drawer
          className={classes.drawer}
          variant="persistent"
          anchor="left"
          open={open}
          classes={{
            paper: classes.drawerPaper
          }}
        >
          <div className={classes.drawerHeader}>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === "ltr" ? (
                <ChevronLeftIcon />
              ) : (
                <ChevronRightIcon />
              )}
            </IconButton>
          </div>
          <Divider />

          {/* odavde krece lista nav menija  */}
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
            {/* //////////////////////////// end dashboard ///////////////////////////// */}

            <Divider component="li" variant="middle" />

            <ListItem button onClick={() => setOpenUsers(!openUsers)}>
              <ListItemIcon>
                <Icon
                  className={clsx(classes.icon, "fas fa-users")}
                  color="action"
                />
              </ListItemIcon>
              <ListItemText primary="Users " />
              {openUsers ? <ExpandLess /> : <ExpandMore />}
            </ListItem>

            <Divider component="li" variant="middle" />

            <Collapse
              in={openUsers}
              timeout="auto"
              unmountOnExit
              className={classes.nested}
            >
              <List component="div" className={classes.submenu}>
                <NavLink to="/admin/users" activeClassName="admin-link">
                  <ListItem button>
                    <ListItemText primary="Users" />
                  </ListItem>
                </NavLink>
                <NavLink to="/admin/users/edit" activeClassName="admin-link">
                  <ListItem button>
                    <ListItemText primary="Edit User" />
                  </ListItem>
                </NavLink>
              </List>
            </Collapse>

            {/* end users  */}

            <NavLink to="/admin/gallery">
              <ListItem button onClick={() => setOpenGallery(!openGallery)}>
                <ListItemIcon>
                  <Icon
                    className={clsx(classes.icon, "far fa-images")}
                    color="action"
                  />
                </ListItemIcon>
                <ListItemText primary="Gallery" />
                {openGallery ? <ExpandLess /> : <ExpandMore />}
              </ListItem>
            </NavLink>

            <Divider component="li" variant="middle" />

            <Divider component="li" variant="middle" />

            <Collapse
              in={openGallery}
              timeout="auto"
              unmountOnExit
              className={classes.nested}
            >
              <List component="div" className={classes.submenu}>
                <NavLink to="#" activeClassName="admin-link">
                  <ListItem button>
                    <ListItemText primary="All galleries" />
                  </ListItem>
                </NavLink>
                <ListItem button>
                  <ListItemText primary="Edit Gallery" />
                </ListItem>
              </List>
            </Collapse>

            {/* ////////////////////// end gallery ///////// */}

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
          <Divider />
        </Drawer>
        <main
          className={clsx(classes.content, {
            [classes.contentShift]: open
          })}
        >
          <div
            style={{ flex: 1, flexDirection: "column", textAlign: "center" }}
          >
            <Switch>
              <Route exact path={`/admin/dashboard`} component={Dashboard} />
              <Route exact path={`/admin/users`} component={Users} />
              <Route exact path={`/admin/users/edit`} component={EditUser} />
              <Route
                exact
                path={`/admin/users/edit/:userId`}
                component={EditUser}
              />

              <Route exact path={`/admin/gallery`} component={Gallery} />
              <Route exact path={`/admin/newsletter`} component={Newsletter} />
              <Route exact path={`/admin/reviews`} component={Reviews} />
            </Switch>
          </div>
        </main>
      </div>
    </>
  );
};

export default Admin;
