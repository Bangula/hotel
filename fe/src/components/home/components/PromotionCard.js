import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Fab from "@material-ui/core/Fab";
import Link from "@material-ui/core/Link";

import bgImage from "@assets/images/special-offer-heading.png";

const useStyles = makeStyles({
  card: {},
  media: {
    height: 210,
    backgroundSize: "90% 200px"
  },
  fab: {
    left: "0",
    right: "0",
    margin: "0 auto",
    bottom: "24px"
  }
});

const PromotionCard = ({ item }) => {
  const classes = useStyles();

  return (
    <div className="w-full text-center px-2 md:px-8" style={{}}>
      <Card
        className={`${classes.card} hover:shadow-2xl text-center`}
        style={{ margin: "0 auto" }}
      >
        <CardMedia
          className={`${classes.media} relative bg-contain`}
          image={bgImage}
          title="Room 1"
        />

        <Fab
          variant="extended"
          aria-label="Add"
          color="primary"
          className={`${classes.fab} absolute mx-auto p-6`}
        >
          <span className="" style={{ color: "#fff" }} to="# ">
            {`$${item.price}`}
          </span>
        </Fab>

        <CardContent>
          <Typography gutterBottom variant="h5" component="h2" align="center">
            {item.name}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {item.description}
          </Typography>
        </CardContent>

        <CardActions>
          <Button size="small" color="primary">
            Learn More
          </Button>
        </CardActions>
      </Card>
    </div>
  );
};

export default PromotionCard;
