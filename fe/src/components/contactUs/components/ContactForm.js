import React from "react";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { Field, Formik, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

const useStyles = makeStyles(theme => ({
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: "100%"
  }
}));

const ContactForm = () => {
  const classes = useStyles();

  const Schema = Yup.object().shape({
    name: Yup.string()
      .label("Name")
      .min(3, "Name is to short")
      .max(20, "Too LONG!.")
      .required("Name is required"),
    email: Yup.string()
      .email("Must be a vaild email")
      .required("Email is required"),
    message: Yup.string()
      .required("Message is required")
      .min(5, "Message to short")
      .max(200, "Too LONG!.")
  });

  const initialValues = {
    name: "",
    message: "",
    email: ""
  };

  return (
    <div>
      <h1 className="home-header  text-3xl text-gray-600 text-center">
        Send Us A Message
      </h1>
      <Formik
        initialValues={initialValues}
        validationSchema={Schema}
        onSubmit={values => {
          console.log(values);
        }}
        render={props => (
          <Form>
            <Field name="name">
              {({ field }) => (
                <TextField
                  id="standard-textarea"
                  label="Your Name"
                  className={classes.textField}
                  margin="normal"
                  {...field}
                />
              )}
            </Field>
            <ErrorMessage name="name">
              {mssg => (
                <small className="block text-center text-red-600">{mssg}</small>
              )}
            </ErrorMessage>

            <Field name="email">
              {({ field }) => (
                <TextField
                  id="standard-textarea"
                  label="Your Email"
                  className={classes.textField}
                  margin="normal"
                  {...field}
                />
              )}
            </Field>
            <ErrorMessage name="email">
              {mssg => (
                <small className="block text-center text-red-600">{mssg}</small>
              )}
            </ErrorMessage>

            <Field name="message">
              {({ field }) => (
                <TextField
                  id="standard-textarea"
                  label="Message..."
                  className={classes.textField}
                  multiline
                  margin="normal"
                  {...field}
                />
              )}
            </Field>
            <ErrorMessage name="message">
              {mssg => (
                <small className="block text-center text-red-600">{mssg}</small>
              )}
            </ErrorMessage>
            <div className="mt-4 flex justify-end">
              <Button
                variant="contained"
                color="primary"
                type="submit"
                className="mt-4"
              >
                Send
              </Button>
            </div>
          </Form>
        )}
      />
      {/* <form onSubmit={handleSubmit}>
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
        <div className="mt-4 flex justify-end">
          <Button
            variant="contained"
            color="primary"
            type="submit"
            className="mt-4"
          >
            Send
          </Button>
        </div>
      </form> */}
    </div>
  );
};

export default ContactForm;
