import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import {
  Button,
  TextField,
  Container,
  makeStyles,
  CircularProgress
} from "@material-ui/core";
import { getUser } from "@endpoints/users";
import { useSelector, useDispatch } from "react-redux";
import Modal from "../Modal";
//initial values formik

const phoneRegExp = /^(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)?$/;
const editUserSchema = Yup.object().shape({
  first_name: Yup.string()
    .min(2, "Minimum number of characters is 2")
    .max(50)
    .required("Name is required"),
  last_name: Yup.string()
    .min(2, "Minimum number of characters is 2")
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
    .required("Address is required")
});
const useStyles = makeStyles(theme => ({
  submit: {
    padding: 10,
    margin: theme.spacing(3, 0, 2)
  }
}));

const EditUser = props => {
  const dispatch = useDispatch();
  const [user, setUser] = useState({});
  const [invalidEmail, setInvalidEmail] = useState("");
  const [invalidFirstName, setInvalidFirstName] = useState("");
  const [invalidLastName, setInvalidLastName] = useState("");
  const [invalidPhone, setInvalidPhone] = useState("");
  const [invalidCity, setInvalidCity] = useState("");
  const [invalidAddress, setInvalidAddress] = useState("");

  const [invalidPassword, setInvalidPassword] = useState("");
  const [invalidPassword2, setInvalidPassword2] = useState("");
  const [openModal, setOpenModal] = React.useState(false);
  const [modalUser, setModalUser] = React.useState({});

  function handleClickOpenModal(userId) {
    setOpenModal(true);
  }

  function handleCloseModal() {
    setOpenModal(false);
  }

  const initialValues = {
    first_name: user.first_name ? user.first_name : "",
    last_name: user.last_name ? user.last_name : "",
    email: user.email ? user.email : "",
    phone_number: user.phone_number ? user.phone_number : "",
    city: user.city ? user.city : "",
    address: user.address ? user.address : ""
  };

  const getUserById = async userId => {
    const { data, error } = await getUser(userId);
    if (data) {
      console.log("single user fetched", data);
      setUser(data.data.data);
    } else if (error) {
      console.log(error.response);
    }
  };

  useEffect(() => {
    //props.match.params.userId
    if (Object.keys(props.match.params).length && props.match.params.userId)
      getUserById(props.match.params.userId);
  }, []);

  //Compoment has been reused for edit
  return (
    <>
      {!(Object.keys(props.match.params).length && props.match.params.userId)
        ? "renderuj input field"
        : "renderuj formu"}
      {Object.keys(user).length ? (
        <Container maxWidth="md">
          <h1 className="large text-primary mt-16">Edit Your Profile</h1>
          <Formik
            enableReinitialize
            onSubmit={async values => {
              console.log("Edit user", values);
              if (Object.keys(values).length) {
                handleClickOpenModal();
                setModalUser(values);
              }
              console.log(typeof values);
              // dispatch(register(values));
            }}
            initialValues={initialValues}
            validationSchema={editUserSchema}
          >
            {({
              handleChange,
              handleBlur,
              values,
              errors,
              touched,
              handleSubmit,
              ...formProps
            }) => {
              return (
                <Form>
                  <Modal
                    open={openModal}
                    handleClose={handleCloseModal}
                    userAction={() => console.log("user iz modala ", modalUser)}
                    modalHeader={"Update user"}
                    modalText={
                      "Are you shure you want to update this user's info?"
                    }
                  />
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

                  {(errors.last_name && touched.last_name) ||
                  invalidLastName ? (
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
                      (errors.city && touched.city) || invalidCity
                        ? true
                        : false
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

                  {/* OVDE MODAL */}
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    margin="normal"
                  >
                    Edit User's Info
                  </Button>
                </Form>
              );
            }}
          </Formik>

          <p className="text-right">
            <Link to="/admin/users">
              {" "}
              <Button variant="outlined" color="default">
                Go Back
              </Button>
            </Link>
          </p>
        </Container>
      ) : Object.keys(props.match.params).length &&
        props.match.params.userId ? (
        <CircularProgress />
      ) : null}
      {/* Ako nema parametara u ruteru da se ne vrti spinner */}
    </>
  );
};
//

export default EditUser;
