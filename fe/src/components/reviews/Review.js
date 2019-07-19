import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { WidthContext } from "@components/common/context/ContextProvider";

import {
  Card,
  CardActions,
  CardContent,
  Typography,
  Button,
  Divider
} from "@material-ui/core";

const useStyles = makeStyles({
  card: {
    // maxWidth: "100%"
  },
  media: {
    height: 210
  },
  fab: {
    left: "50%",
    transform: "translate(-50%,-50%)"
  }
});
const Review = ({
  hotel_rate,
  room_rate,
  accommodation_rate,
  comment,
  user,
  ...props
}) => {
  const { windowWidth } = React.useContext(WidthContext);
  const classes = useStyles();
  // console.log("REVIEW PROPS", hotel_rate, room_rate, accommodation_rate);
  const averageRating = (hotel_rate + room_rate + accommodation_rate) / 3;
  //  console.log(averageRating);

  return (
    <Card className={`${classes.card} hover:shadow-2xl mb-6`}>
      <CardContent className="flex justify-between">
        <Typography variant="h5" component="h2" align="left">
          {user ? user.data.first_name : "No name"}
        </Typography>
        <Typography
          variant="h5"
          color="textSecondary"
          component="h2"
          align="right"
          gutterBottom
        >
          Average rating : {Math.ceil(averageRating * 100) / 100}
        </Typography>
      </CardContent>

      <Divider variant="middle" />

      <CardContent className="flex flex-col  justify-between">
        <div className="flex justify-between items-center">
          <Typography variant="h5" component="h2" align="left">
            Hotel Rate
          </Typography>
          <meter
            min="0"
            max="10"
            optimum="10"
            low="4"
            high="7"
            value={hotel_rate * 2}
            className="w-9/12"
          />
        </div>
        <div className="flex justify-between items-center">
          <Typography variant="h5" component="h2" align="left">
            Room Rate
          </Typography>
          <meter
            min="0"
            max="10"
            optimum="10"
            low="4"
            high="7"
            value={room_rate * 2}
            className="w-9/12"
          />
        </div>
        <div className="flex justify-between items-center">
          <Typography
            variant="h5"
            component="h2"
            align="left"
            style={{ overflowWrap: "break-word" }}
          >
            Acomodation Rate
          </Typography>

          <meter
            min="0"
            max="10"
            optimum="10"
            low="4"
            high="7"
            value={accommodation_rate * 2}
            className="w-9/12"
          />
        </div>
      </CardContent>

      <Divider variant="middle" />

      <CardContent className="flex flex-wrap justify-between">
        <Typography variant="h5" component="h2" align="left">
          Comment :
        </Typography>
        <Typography
          variant="body2"
          color="textSecondary"
          component="p"
          className="w-full mt-0 mt-4 md:w-9/12 text-justify"
        >
          {comment}
        </Typography>
      </CardContent>
      <Divider variant="fullWidth" />

      <CardActions className="flex justify-end pt-6">
        <Button size="small" variant="outlined" color="primary">
          More Details
        </Button>
      </CardActions>
    </Card>
  );
};

export default Review;
