import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import clsx from "clsx";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { deepOrange, deepPurple, grey } from "@material-ui/core/colors";
import Dashboard from "./dashboard/Dashboard";
import Users from "./users/Users";
import Gallery from "./gallery/Gallery";
import CreateGallery from "./gallery/CreateGallery";
import Newsletter from "./Newsletter";
import AdminReviews from "./AdminReviews";
import EditUser from "./users/EditUser";
import Rooms from "./rooms/Rooms";
import RoomTypes from "./rooms/RoomTypes";
import CreateOrEditRoom from "./rooms/CreateOrEditRoom";
import Facilities from "./rooms/Facilities";
import Profile from "./myProfile/Profile";
import Subscribers from "./subscribers/Subscribers";
import Songs from "./songs/Songs";
import Events from "./events/Events";
import EventTypes from "./events/EventTypes";
import Reservations from "./reservations/Reservations";

import { useSelector, useDispatch } from "react-redux";

import Promotions from "./promotions/Promotions";

import {
  Avatar,
  Collapse,
  ListItemText,
  ListItemIcon,
  ListItem,
  List,
  Divider,
  Icon,
  AppBar,
  Toolbar,
  Typography,
  Drawer
} from "@material-ui/core";

import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";

import { WidthContext } from "@components/common/context/ContextProvider";

import { Switch, Route, NavLink, Link, Redirect } from "react-router-dom";
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
  const [openRooms, setOpenRooms] = React.useState(false);
  const [openPromotions, setOpenPromotions] = React.useState(false);
  const [openEvents, setOpenEvents] = React.useState(false);

  const { windowWidth } = React.useContext(WidthContext);

  const dispatch = useDispatch();

  const isAdmin = useSelector(state => state.user.isAdmin);
  const userName = useSelector(state => state.user.info.data.first_name);

  //for nav menu
  useEffect(() => {
    if (props.location.pathname === "/admin") {
      props.history.push("/admin/dashboard");
    }

    if (windowWidth < 768) {
      setOpen(false);
    } else {
      setOpen(true);
    }
  }, [windowWidth]);

  function handleDrawerOpen() {
    setOpen(true);
  }

  function handleDrawerClose() {
    setOpen(false);
  }
  console.log("admin props", props);
  return (
    <>
      {isAdmin ? (
        <>
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
                    <Avatar className={classes.purpleAvatar}>
                      <i className="fas fa-user" />
                    </Avatar>
                  </ListItemIcon>
                  <ListItemText primary={userName} />
                </ListItem>
                <div className="hidden md:block w-2/12">
                  <p
                    style={{ transition: "all 0.1s" }}
                    className="mx-4 py-2 rounded-lg "
                  >
                    v 1.0.3
                  </p>
                </div>
                <div className="hidden md:block w-2/12">
                  <Link
                    style={{ transition: "all 0.1s" }}
                    to="/"
                    className="px-4 py-2 bg-red-600 rounded-lg hover:bg-red-400"
                  >
                    CLOSE PANEL
                  </Link>
                </div>
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
                    <Avatar className={classes.purpleAvatar}>
                      <i className="fas fa-user" />
                    </Avatar>
                  </ListItemIcon>
                  <ListItemText primary={userName} />
                  {openProfile ? <ExpandLess /> : <ExpandMore />}
                </ListItem>

                <Divider component="li" variant="middle" />

                <Collapse
                  in={openProfile}
                  timeout="auto"
                  unmountOnExit
                  className={classes.nested}
                >
                  <NavLink to="/admin/myprofile">
                    <List component="div" className={classes.submenu}>
                      <ListItem button>
                        <ListItemText primary="My Profile" />
                      </ListItem>
                    </List>
                  </NavLink>
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
                    {/* <NavLink
                      to="/admin/users/edit"
                      activeClassName="admin-link"
                    >
                      <ListItem button>
                        <ListItemText primary="Edit User" />
                      </ListItem>
                    </NavLink> */}
                  </List>
                </Collapse>

                {/* end users  */}

                <ListItem button onClick={() => setOpenRooms(!openRooms)}>
                  <ListItemIcon>
                    <Icon
                      className={clsx(classes.icon, "far fa-building")}
                      color="action"
                    />
                  </ListItemIcon>
                  <ListItemText primary="Rooms" />
                  {openRooms ? <ExpandLess /> : <ExpandMore />}
                </ListItem>

                <Divider component="li" variant="middle" />
                <Collapse
                  in={openRooms}
                  timeout="auto"
                  unmountOnExit
                  className={classes.nested}
                >
                  <List component="div" className={classes.submenu}>
                    <NavLink
                      exact
                      to="/admin/rooms"
                      activeClassName="admin-link"
                    >
                      <ListItem button>
                        <ListItemText primary="All Rooms" />
                      </ListItem>
                    </NavLink>
                    <NavLink
                      to="/admin/rooms/create"
                      activeClassName="admin-link"
                    >
                      <ListItem button>
                        <ListItemText primary="Create Room" />
                      </ListItem>
                    </NavLink>
                    <NavLink
                      to="/admin/rooms/types"
                      activeClassName="admin-link"
                    >
                      <ListItem button>
                        <ListItemText primary="Room Types" />
                      </ListItem>
                    </NavLink>
                    <NavLink
                      to="/admin/rooms/facilities"
                      activeClassName="admin-link"
                    >
                      <ListItem button>
                        <ListItemText primary="Room Facilities" />
                      </ListItem>
                    </NavLink>
                  </List>
                </Collapse>
                {/* ////////////////////// end ROOMS ///////////////////////////*/}

                <NavLink
                  exact
                  to="/admin/promotions"
                  activeClassName="admin-link"
                >
                  <ListItem button>
                    <ListItemIcon>
                      <Icon
                        className={clsx(classes.icon, "fas fa-ad")}
                        color="action"
                      />
                    </ListItemIcon>
                    <ListItemText primary="Promotions" />
                  </ListItem>
                </NavLink>

                <Divider component="li" variant="middle" />

                {/* //////////////////////// END PROMOTIONS//////////////////// */}

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

                <Divider component="li" variant="middle" />

                <Collapse
                  in={openGallery}
                  timeout="auto"
                  unmountOnExit
                  className={classes.nested}
                >
                  <List component="div" className={classes.submenu}>
                    <NavLink
                      exact
                      to="/admin/gallery"
                      activeClassName="admin-link"
                    >
                      <ListItem button>
                        <ListItemText primary="All galleries" />
                      </ListItem>
                    </NavLink>

                    <NavLink
                      to="/admin/gallery/create"
                      activeClassName="admin-link"
                    >
                      <ListItem button>
                        <ListItemText primary="Create Gallery" />
                      </ListItem>
                    </NavLink>

                    <ListItem button>
                      <ListItemText primary="Edit Gallery" />
                    </ListItem>
                  </List>
                </Collapse>

                {/* ////////////////////// end gallery ///////// */}

                <ListItem
                  button
                  button
                  onClick={() => setOpenEvents(!openEvents)}
                >
                  <ListItemIcon>
                    <Icon
                      className={clsx(classes.icon, "far fa-calendar-alt")}
                      color="action"
                    />
                  </ListItemIcon>
                  <ListItemText primary="Events" />
                  {openEvents ? <ExpandLess /> : <ExpandMore />}
                </ListItem>

                <Divider component="li" variant="middle" />

                <Collapse
                  in={openEvents}
                  timeout="auto"
                  unmountOnExit
                  className={classes.nested}
                >
                  <List component="div" className={classes.submenu}>
                    <NavLink
                      exact
                      to="/admin/events"
                      activeClassName="admin-link"
                    >
                      <ListItem button>
                        <ListItemText primary="All Events" />
                      </ListItem>
                    </NavLink>

                    <NavLink
                      to="/admin/events/types"
                      activeClassName="admin-link"
                    >
                      <ListItem button>
                        <ListItemText primary="Event Types" />
                      </ListItem>
                    </NavLink>
                  </List>
                </Collapse>

                <NavLink
                  exact
                  to="/admin/reservations"
                  activeClassName="admin-link"
                >
                  <ListItem button>
                    <ListItemIcon>
                      <Icon
                        className={clsx(classes.icon, "far fa-calendar-check")}
                        color="action"
                      />
                    </ListItemIcon>
                    <ListItemText primary="Reservations" />
                  </ListItem>
                </NavLink>

                {/* ///////// end events//////// */}
                <NavLink
                  exact
                  to="/admin/subscribers"
                  activeClassName="admin-link"
                >
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
                {/* END NEWSLETTER */}

                <NavLink exact to="/admin/reviews" activeClassName="admin-link">
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
                {/* END REVIEWS  */}
                <NavLink exact to="/admin/songs" activeClassName="admin-link">
                  <ListItem button>
                    <ListItemIcon>
                      <Icon
                        className={clsx(classes.icon, "fas fa-music")}
                        color="action"
                      />
                    </ListItemIcon>
                    <ListItemText primary="Songs" />
                  </ListItem>
                </NavLink>
                {/* END SONGS  */}
                <ListItem
                  button
                  onClick={() => {
                    dispatch({ type: "LOGOUT_USER" });
                    props.history.replace("/");
                  }}
                >
                  <ListItemIcon>
                    <Icon
                      className={clsx(classes.icon, "fas fa-sign-out-alt")}
                      color="action"
                    />
                  </ListItemIcon>
                  <ListItemText primary="Logout" />
                </ListItem>

                {windowWidth < 768 ? (
                  <ListItem
                    button
                    onClick={() => {
                      props.history.push("/");
                    }}
                  >
                    <ListItemIcon>
                      <Icon
                        className={clsx(classes.icon, "fas fa-sign-out-alt")}
                        color="action"
                      />
                    </ListItemIcon>
                    <ListItemText primary="Close panel" />
                  </ListItem>
                ) : null}
              </List>
              <Divider />
            </Drawer>
            <main
              className={clsx(classes.content, {
                [classes.contentShift]: open
              })}
            >
              <div
                style={{
                  flex: 1,
                  flexDirection: "column",
                  textAlign: "center"
                }}
              >
                <Switch>
                  <Route exact path={`/admin/myprofile`} component={Profile} />
                  <Route
                    exact
                    path={`/admin/dashboard`}
                    component={Dashboard}
                  />
                  <Route exact path={`/admin/users`} component={Users} />
                  <Route
                    exact
                    path={`/admin/users/edit`}
                    component={EditUser}
                  />
                  <Route
                    exact
                    path={`/admin/users/edit/:userId`}
                    component={EditUser}
                  />

                  <Route exact path={`/admin/rooms`} component={Rooms} />
                  <Route
                    exact
                    path={`/admin/rooms/create`}
                    component={CreateOrEditRoom}
                  />
                  <Route
                    exact
                    path={`/admin/rooms/edit/:roomId`}
                    component={CreateOrEditRoom}
                  />
                  <Route
                    exact
                    path={`/admin/rooms/types`}
                    component={RoomTypes}
                  />
                  <Route
                    exact
                    path={`/admin/rooms/facilities`}
                    component={Facilities}
                  />
                  <Route exact path={`/admin/gallery`} component={Gallery} />
                  <Route
                    exact
                    path={`/admin/gallery/create`}
                    component={CreateGallery}
                  />
                  <Route
                    exact
                    path={`/admin/newsletter`}
                    component={Newsletter}
                  />
                  <Route
                    exact
                    path={`/admin/reviews`}
                    component={AdminReviews}
                  />

                  <Route
                    exact
                    path={`/admin/promotions`}
                    component={Promotions}
                  />

                  <Route
                    exact
                    path={`/admin/subscribers`}
                    component={Subscribers}
                  />
                  <Route exact path={`/admin/events`} component={Events} />
                  <Route
                    exact
                    path={`/admin/reservations`}
                    component={Reservations}
                  />

                  <Route
                    exact
                    path={`/admin/events/types`}
                    component={EventTypes}
                  />
                  <Route exact path={`/admin/songs`} component={Songs} />
                </Switch>
              </div>
            </main>
          </div>
        </>
      ) : (
        <Redirect to="/login" />
      )}
    </>
  );
};

export default Admin;
