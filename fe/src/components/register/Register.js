import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Formik, Form } from "formik";
import * as Yup from "yup";

import { useSelector, useDispatch } from "react-redux";

import { register } from "@actions/authActions";
import { Button, TextField, Container, Snackbar } from "@material-ui/core";

import { makeStyles } from "@material-ui/core/styles";
import green from "@material-ui/core/colors/green";

const useStyles = makeStyles(theme => ({
  submit: {
    padding: 10,
    margin: theme.spacing(3, 0, 2)
  }
}));

const Register = props => {
  // const responseErrors = useSelector(state => state.user.responseErrors);
  const dispatch = useDispatch();

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
  const [invalidEmail, setInvalidEmail] = useState("");
  const [invalidFirstName, setInvalidFirstName] = useState("");
  const [invalidLastName, setInvalidLastName] = useState("");
  const [invalidPhone, setInvalidPhone] = useState("");
  const [invalidCity, setInvalidCity] = useState("");
  const [invalidAddress, setInvalidAddress] = useState("");

  const [invalidPassword, setInvalidPassword] = useState("");
  const [invalidPassword2, setInvalidPassword2] = useState("");

  // useEffect(() => {
  //   if (Object.keys(responseErrors).length) {
  //     if (responseErrors.email) {
  //       setInvalidEmail(responseErrors.email);
  //     }
  //     if (responseErrors.password) {
  //       setInvalidPassword(responseErrors.password);
  //     }
  //   }
  // }, [responseErrors]);

  const classes = useStyles();
  console.log("LOGIN PROPS", props);
  return (
    <>
      <div className="header-image" />
      <Container maxWidth="md">
        <h1 className="large text-primary">Sign In</h1>
        <p className="lead">
          <i className="fas fa-user" /> Sign into Your Account
        </p>

        <Formik
          onSubmit={async values => {
            console.log("Register", values);
            dispatch(register(values));
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
                    (errors.first_name && touched.first_name) ||
                    invalidFirstName
                      ? true
                      : false
                  }
                />

                {(errors.first_name && touched.first_name) ||
                invalidFirstName ? (
                  <span className="text-danger">
                    {errors.first_name || invalidFirstName}
                  </span>
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
                    (errors.last_name && touched.last_name) || invalidLastName
                      ? true
                      : false
                  }
                />

                {(errors.last_name && touched.last_name) || invalidLastName ? (
                  <span className="text-danger">
                    {errors.last_name || invalidLastName}
                  </span>
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
                  error={
                    (errors.email && touched.email) || invalidEmail
                      ? true
                      : false
                  }
                />

                {(errors.email && touched.email) || invalidEmail ? (
                  <span className="text-danger">
                    {errors.email || invalidEmail}
                  </span>
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
                    (errors.phone_number && touched.phone_number) ||
                    invalidPhone
                      ? true
                      : false
                  }
                />

                {(errors.phone_number && touched.phone_number) ||
                invalidPhone ? (
                  <span className="text-danger">
                    {errors.phone_number || invalidPhone}
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
                  error={
                    (errors.city && touched.city) || invalidCity ? true : false
                  }
                />

                {(errors.city && touched.city) || invalidCity ? (
                  <span className="text-danger">
                    {errors.city || invalidCity}
                  </span>
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
                    (errors.address && touched.address) || invalidAddress
                      ? true
                      : false
                  }
                />

                {(errors.address && touched.address) || invalidAddress ? (
                  <span className="text-danger">
                    {errors.address || invalidAddress}
                  </span>
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
                    (errors.password && touched.password) || invalidPassword
                      ? true
                      : false
                  }
                />

                {(errors.password && touched.password) || invalidPassword ? (
                  <span className="text-danger">
                    {errors.password || invalidPassword}
                  </span>
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
                    (errors.password2 && touched.password2) || invalidPassword2
                      ? true
                      : false
                  }
                />

                {(errors.password2 && touched.password2) || invalidPassword2 ? (
                  <span className="text-danger">
                    {errors.password2 || invalidPassword2}
                  </span>
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
    </>
  );
};

export default Register;
