import React from "react";
import { Link } from "react-router-dom";

import room1 from "@assets/images/rooms/room1.jpg";

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
    width: 400
  }
});
const Event = ({ event }) => {
  const classes = useStyles();
  console.log(event);
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
        <div>
          <CardContent>
            <Typography
              gutterBottom
              variant="h5"
              component="h2"
              align="center"
            />
            <Typography variant="body2" color="textSecondary" component="p">
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
                {/* <Typography variant="body2" color="textSecondary" component="p">
                  Location: <br />
                </Typography> */}
              </div>
              <div>
                {/* <Typography variant="body2" color="textSecondary" component="p">
                  Category:
                </Typography> */}
                <Typography variant="body2" color="textSecondary" component="p">
                  Capacity: <br />
                  <span className="font-semibold">{event.capacity}</span>
                </Typography>
              </div>
            </div>
          </CardContent>

          <CardActions>
            <Button variant="contained" color="primary">
              JOIN
            </Button>
          </CardActions>
        </div>
      </Card>
    </div>
  );
};

export default Event;
