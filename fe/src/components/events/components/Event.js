import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { joinToEvent } from "../../../services/http/endpoints/events";
import room1 from "@assets/images/rooms/room1.jpg";

import Alert from "react-s-alert";
import "react-s-alert/dist/s-alert-default.css";
import "react-s-alert/dist/s-alert-css-effects/slide.css";

import { makeStyles } from "@material-ui/core/styles";

import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Fab
} from "@material-ui/core";

const useStyles = makeStyles({
  card: {
    display: "flex"
  },
  media: {
    height: "100%",
    width: "40vh"
  },
  content: {
    paddin: "20px 20px"
  }
});
const Event = ({ event, join }) => {
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
  const handleError = () => {
    Alert.error("Error!");
  };

  return (
    <div className="">
      <Card className={`${classes.card} hover:shadow-2xl`}>
        <div>
          <CardMedia
            className={`${classes.media} relative `}
            image={room1}
            title={event.title}
          />
        </div>
        <div className={join ? "pl-16 pb-8" : null}>
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
