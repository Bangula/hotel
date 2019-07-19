import React from "react";
import { useSelector } from "react-redux";
import { joinToEvent } from "../../../services/http/endpoints/events";
import room1 from "@assets/images/rooms/room1.jpg";

import Alert from "react-s-alert";
import "react-s-alert/dist/s-alert-default.css";
import "react-s-alert/dist/s-alert-css-effects/slide.css";

import { makeStyles } from "@material-ui/core/styles";
import { WidthContext } from "@components/common/context/ContextProvider";

import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
  Button
} from "@material-ui/core";

const useStyles = makeStyles({
  card: {
    display: "flex"
  },
  media: {
    height: "100%",
    width: "30vw"
  },
  content: {
    paddin: "20px 20px"
  }
});

const Event = ({ event, join }) => {
  const { windowWidth } = React.useContext(WidthContext);
  const user = useSelector(state => state.user);
  const joinUserToEvent = async () => {
    const { data, error } = await joinToEvent(event.id);
    if (data) {
      console.log("joined to event", data);
      handleSuccess();
    } else if (error) {
      console.log(error);
    }
  };

  const classes = useStyles();

  const handleSuccess = () => {
    Alert.success(<i className="fas fa-check" />, {
      effect: "slide",
      timeout: 2000
    });
  };

  return (
    <div className="px-4 md:px-0">
      <Card
        className={`${classes.card} hover:shadow-2xl`}
        style={{ flexDirection: windowWidth < 1024 ? "column" : "row" }}
      >
        <div>
          <CardMedia
            className={`${classes.media} relative `}
            image={room1}
            title={event.title}
            style={{
              width: windowWidth < 1024 ? "100vw" : "30vw",
              height: windowWidth < 1024 ? "260px" : "100%"
            }}
          />
        </div>
        <div className={join ? "md:pl-16 pb-8" : null}>
          <CardContent className={classes.content}>
            <Typography gutterBottom variant="h5" component="h2" align="center">
              {event.title}
            </Typography>
            <Typography
              variant="body2"
              color="textSecondary"
              component="p"
              className="py-8"
            >
              {event.description}
            </Typography>
            <br />
            <div className="flex w-full justify-between">
              <div>
                <Typography variant="body2" color="textSecondary" component="p">
                  Starting at:
                  <br />
                  <span className="font-semibold">{event.started_at}</span>
                  <br />
                </Typography>
              </div>
              <div>
                <Typography variant="body2" color="textSecondary" component="p">
                  Capacity: <br />
                  <span className="font-semibold">{event.capacity}</span>
                </Typography>
              </div>
            </div>
          </CardContent>
          {join && user.isAuthenticated ? (
            <CardActions>
              <Button
                variant="contained"
                color="primary"
                onClick={joinUserToEvent}
              >
                JOIN
              </Button>
            </CardActions>
          ) : null}
        </div>
      </Card>
      <Alert />
    </div>
  );
};

export default Event;
