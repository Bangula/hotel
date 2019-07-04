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
  name: Yup.string()
    .min(2, "Minimum number of characters is 2")
    .max(50)
    .required("Name is required"),
  bed_count: Yup.number()
    .min(1, "Minimum number of characters is 1")
    .max(50)
    .required("Bed count is required"),
  max_persons: Yup.number()
    .min(1, "Minimum number of characters is 1")
    .max(50)
    .required("Maximum number of persons is required"),
  price_adult: Yup.number()
    .min(1, "Minimum number of characters is 1")
    .max(50)
    .required("Price for Adults is required"),
  price_child: Yup.number()
    .min(1, "Minimum number of characters is 1")
    .max(50)
    .required("Price for Children is required")
});
const useStyles = makeStyles(theme => ({
  submit: {
    padding: 10,
    margin: theme.spacing(3, 0, 2)
  }
}));

const EditRoomType = props => {
  const dispatch = useDispatch();
  const [type, setType] = useState({});
  const [invalidEmail, setInvalidEmail] = useState("");
  const [invalidFirstName, setInvalidFirstName] = useState("");
  const [invalidLastName, setInvalidLastName] = useState("");
  const [invalidPhone, setInvalidPhone] = useState("");
  const [invalidCity, setInvalidCity] = useState("");
  const [invalidAddress, setInvalidAddress] = useState("");

  const [openModal, setOpenModal] = React.useState(false);
  const [modalUser, setModalUser] = React.useState({});

  function handleClickOpenModal(userId) {
    setOpenModal(true);
  }

  function handleCloseModal() {
    setOpenModal(false);
  }

  //component only recives props

  const initialValues = {
    name: type.name ? type.name : "",
    bed_count: type.bed_count ? type.bed_count : "",
    max_persons: type.max_persons ? type.max_persons : "",
    price_adult: type.price_adult ? type.price_adult : "",
    price_child: type.price_child ? type.price_child : ""
  };

  //   const getUserById = async userId => {
  //     const { data, error } = await getUser(userId);
  //     if (data) {
  //       console.log("single user fetched", data.data.data);
  //       setUser(data.data.data);
  //     }
  //   };

  //   useEffect(() => {
  //     //props.match.params.userId
  //     if (Object.keys(props.match.params).length && props.match.params.userId)
  //       getUserById(props.match.params.userId);
  //   }, []);

  return (
    <>
      {Object.keys(props.type).length ? (
        <Container maxWidth="md">
          <h1 className="large text-primary">Edit Your Profile</h1>
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
                    Submit
                  </Button>
                </Form>
              );
            }}
          </Formik>
        </Container>
      ) : <CircularProgress /> ? (
        //Object.keys(props.match).length && props.match.params.userId
        <CircularProgress />
      ) : null}
      {/* Ako nema parametara u ruteru da se ne vrti spinner */}
    </>
  );
};
//

export default EditRoomType;
