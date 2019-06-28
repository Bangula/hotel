import React from "react";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles(theme => ({
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: "100%"
  }
}));

const ContactForm = () => {
  const handleSubmit = e => {
    e.preventDefault();
  };
  const classes = useStyles();

  return (
    <div>
      <h1 className="home-header  text-3xl text-gray-600 text-center">
        Send Us A Message
      </h1>
      <form onSubmit={handleSubmit}>
        <TextField
          id="standard-textarea"
          label="Your Name"
          className={classes.textField}
          margin="normal"
        />
        <TextField
          id="standard-textarea"
          label="Message..."
          multiline
          className={classes.textField}
          margin="normal"
        />
        <Button
          variant="contained"
          color="primary"
          type="submit"
          className="mt-4"
        >
          Send
        </Button>
      </form>
    </div>
  );
};

export default ContactForm;
