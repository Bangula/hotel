import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Formik, Form } from "formik";
import * as Yup from "yup";

import { useSelector, useDispatch } from "react-redux";
import { login, getProfile } from "@actions/authActions";
import { Button, TextField, Container } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  submit: {
    padding: 10,
    margin: theme.spacing(3, 0, 2)
  }
}));

const Login = props => {
  useEffect(() => {
    document.title = "Quantox Hotel - Login";
  }, []);
  // const responseErrors = useSelector(state => state.user.responseErrors);
  // const dispatch = useDispatch();

  const errors = useSelector(state => state.user.serverErrors);

  const dispatch = useDispatch();
  const initialValues = {
    email: "",
    password: ""
  };

  const loginSchema = Yup.object().shape({
    email: Yup.string()
      .label("Email")
      .email()
      .required(),
    password: Yup.string()
      .required("Password is required")
      .min(5, "Password must be at least 6 characters")
      .max(50, "Too LONG!.")
  });

  // useEffect(() => {
  //   if (Object.keys(responseErrors).length) {
  //     if (responseErrors.email) {
  //       set""(responseErrors.email);
  //     }
  //     if (responseErrors.password) {
  //       set""(responseErrors.password);
  //     }
  //   }
  // }, [responseErrors]);

  const classes = useStyles();
  return (
    <>
      <div className="header-image" />
      <h1 className="home-header text-center text-2xl text-gray-600 z-50 mb-16">
        <i className="fas fa-user mr-4" /> Sign into Your Account
      </h1>
      <Container maxWidth="md">
        {errors.login ? (
          <h1 className="py-4 text-red-800 text-center">{errors.login}</h1>
        ) : null}

        <Formik
          onSubmit={async values => {
            try {
              await dispatch(login(values, props.history));
              await dispatch(getProfile());
            } catch (err) {
              console.log(err.response);
            }
          }}
          initialValues={initialValues}
          validationSchema={loginSchema}
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

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  margin="normal"
                  className={classes.submit}
                >
                  Log In
                </Button>
              </Form>
            );
          }}
        </Formik>

        <p className="text-right">
          Don't have an account?{" "}
          <Link to="/register">
            <Button variant="outlined" color="default">
              Sign Up
            </Button>
          </Link>
        </p>
      </Container>
      <div className="w-full h-32" />
    </>
  );
};

export default Login;
