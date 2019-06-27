import React from "react";
import roomHeader from "@assets/images/rooms_header.jpg";
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
  }
});

const Rooms = () => {
  const classes = useStyles();
  return (
    <>
      <div className="header-image">
        {/* <img src={roomHeader} alt="room header" className="pb-8" /> */}
      </div>

      <div className="container mx-auto flex flex-wrap">
        <div className="w-2/3 flex flex-wrap justify-around">
          <Card className={classes.card}>
            <CardActionArea>
              <CardMedia
                className={classes.media}
                image={room1}
                title="Room 1"
              />
              <Fab
                variant="extended"
                size="small"
                color="primary"
                aria-label="Add"
                // className={classes.margin}
              >
                Extended
              </Fab>
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  Deluxe Black Room
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
