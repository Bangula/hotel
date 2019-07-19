import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Formik, Form } from "formik";
import * as Yup from "yup";

import { useSelector, useDispatch } from "react-redux";

import { register } from "@actions/authActions";
import { Button, TextField, Container } from "@material-ui/core";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  submit: {
    padding: 10,
    margin: theme.spacing(3, 0, 2)
  }
}));

const Register = props => {
  // const responseErrors = useSelector(state => state.user.responseErrors);
  const dispatch = useDispatch();
  const errors = useSelector(state => state.user.serverErrors);

  const initialValues = {
    first_name: "",
    last_name: "",
    email: "",
    phone_number: "",
    city: "",
    address: "",
    password: "",
    password2: ""
  };

  //const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
  const phoneRegExp = /^(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)?$/;

  const registerSchema = Yup.object().shape({
    first_name: Yup.string()
      .min(6)
      .max(50)
      .required("Name is required"),
    last_name: Yup.string()
      .min(6)
      .max(50)
      .required("Last Name is required"),
    email: Yup.string()
      .label("Email")
      .email()
      .required("Email is required"),
    phone_number: Yup.string()
      .matches(phoneRegExp, "Phone number is not valid")
      .required("Phone is required"),
    city: Yup.string()
      .min(2)
      .max(60)
      .required("City is required"),
    address: Yup.string()
      .min(2)
      .max(200)
      .required("Address is required"),
    password: Yup.string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters")
      .max(50, "We prefer insecure system, try a shorter password."),

    password2: Yup.string()
      .required("Confirm password is required")
      .test("passwords-match", "Passwords must match", function(value) {
        return this.parent.password === value;
      })
  });

  useEffect(() => {
    document.title = "Quantox Hotel - Register";
  }, []);

  const classes = useStyles();
  console.log("LOGIN PROPS", props);
  return (
    <>
      <div className="header-image" />
      <h1 className="home-header text-center text-2xl text-gray-600 z-50 mb-16">
        <i className="fas fa-user mr-4" />
        Create new account
      </h1>
      <Container maxWidth="md">
        {errors.register ? (
          <h1 className="py-4 text-red-800 text-center">{errors.register}</h1>
        ) : null}

        <Formik
          onSubmit={async values => {
            console.log("Register", values);
            dispatch(register(values, props.history));
          }}
          initialValues={initialValues}
          validationSchema={registerSchema}
        >
          {({
            handleChange,
            handleBlur,
            values,
            errors,
            touched,
            ...props
          }) => {
            return (
              <Form>
                <TextField
                  margin="normal"
                  type="text"
                  fullWidth
                  label="First Name"
                  name="first_name"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.first_name}
                  error={
                    (errors.first_name && touched.first_name) || ""
                      ? true
                      : false
                  }
                />

                {(errors.first_name && touched.first_name) || "" ? (
                  <span className="text-danger">{errors.first_name || ""}</span>
                ) : null}

                <TextField
                  margin="normal"
                  type="text"
                  fullWidth
                  label="Last Name"
                  name="last_name"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.last_name}
                  error={
                    (errors.last_name && touched.last_name) || "" ? true : false
                  }
                />

                {(errors.last_name && touched.last_name) || "" ? (
                  <span className="text-danger">{errors.last_name || ""}</span>
                ) : null}

                <TextField
                  margin="normal"
                  type="email"
                  fullWidth
                  label="Email Address"
                  name="email"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.email}
                  error={(errors.email && touched.email) || "" ? true : false}
                />

                {(errors.email && touched.email) || "" ? (
                  <span className="text-danger">{errors.email || ""}</span>
                ) : null}

                <TextField
                  margin="normal"
                  type="text"
                  fullWidth
                  label="Phone Number"
                  name="phone_number"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.phone_number}
                  error={
                    (errors.phone_number && touched.phone_number) || ""
                      ? true
                      : false
                  }
                />

                {(errors.phone_number && touched.phone_number) || "" ? (
                  <span className="text-danger">
                    {errors.phone_number || ""}
                  </span>
                ) : null}

                <TextField
                  margin="normal"
                  type="text"
                  fullWidth
                  label="City"
                  name="city"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.city}
                  error={(errors.city && touched.city) || "" ? true : false}
                />

                {(errors.city && touched.city) || "" ? (
                  <span className="text-danger">{errors.city || ""}</span>
                ) : null}

                <TextField
                  margin="normal"
                  type="text"
                  fullWidth
                  label="Address"
                  name="address"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.address}
                  error={
                    (errors.address && touched.address) || "" ? true : false
                  }
                />

                {(errors.address && touched.address) || "" ? (
                  <span className="text-danger">{errors.address || ""}</span>
                ) : null}

                <TextField
                  type="password"
                  name="password"
                  margin="normal"
                  fullWidth
                  label="Password"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.password}
                  error={
                    (errors.password && touched.password) || "" ? true : false
                  }
                />

                {(errors.password && touched.password) || "" ? (
                  <span className="text-danger">{errors.password || ""}</span>
                ) : null}

                <TextField
                  type="password"
                  name="password2"
                  margin="normal"
                  fullWidth
                  label="Confirm Password"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.password2}
                  error={
                    (errors.password2 && touched.password2) || "" ? true : false
                  }
                />

                {(errors.password2 && touched.password2) || "" ? (
                  <span className="text-danger">{errors.password2 || ""}</span>
                ) : null}

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  margin="normal"
                  className={classes.submit}
                >
                  Register
                </Button>
              </Form>
            );
          }}
        </Formik>

        <p className="text-right">
          You have account?{" "}
          <Link to="/login">
            {" "}
            <Button variant="outlined" color="default">
              Log In
            </Button>
          </Link>
        </p>
      </Container>
      <div className="w-full h-32" />
    </>
  );
};

export default Register;
