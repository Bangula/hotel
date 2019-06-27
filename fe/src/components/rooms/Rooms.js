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
    maxWidth: 370
  },
  media: {
    height: 210
  },
  fab: {
    left: "50%",
    transform: "translate(-50%,-50%)"
  }
});

const Rooms = () => {
  const classes = useStyles();
  return (
    <>
      <div className="header-image" />

      <div className="container mx-auto flex flex-wrap">
        <div className="w-2/3 flex flex-wrap justify-around">
          <Card className={`${classes.card} hover:shadow-2xl`}>
            <CardMedia
              className={`${classes.media} relative `}
              image={room1}
              title="Room 1"
            />

            <Fab
              variant="extended"
              aria-label="Add"
              color="primary"
              className={`${classes.fab} absolute mx-auto p-6`}
            >
              <Link to="# "> $70/Night</Link>
            </Fab>

            <CardContent>
              <Typography
                gutterBottom
                variant="h5"
                component="h2"
                align="center"
              >
                Deluxe Black Room
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                A spacious deluxe room which has a double bed and a single bed.
                Ideal for any...
              </Typography>
            </CardContent>

            <CardActions>
              <Button size="small" color="primary">
                Share
              </Button>
              <Button size="small" color="primary">
                Learn More
              </Button>
            </CardActions>
          </Card>

          <Card className={classes.card}>
            <CardActionArea>
              <CardMedia
                className={classes.media}
                image={room1}
                title="Room 1"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  Lizard
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  Lizards are a widespread group of squamate reptiles, with over
                  6,000 species, ranging across all continents except Antarctica
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions>
              <Button size="small" color="primary">
                Share
              </Button>
              <Button size="small" color="primary">
                Learn More
              </Button>
            </CardActions>
          </Card>
        </div>
        <div className="w-1/3">2</div>
      </div>
    </>
  );
};

export default Rooms;
