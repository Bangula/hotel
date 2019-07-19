import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import {
  Button,
  TextField,
  Container,
  CircularProgress
} from "@material-ui/core";
import { createFacility, updateFacility } from "@endpoints/rooms";

import Modal from "../Modal";
//initial values formik

const facilitiesSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "Minimum number of characters is 2")
    .max(5000)
    .required("Name is required"),

  price: Yup.number()
    .min(0, "Minimum number of characters is 1")
    .max(5000)
    .required("Price for Facilities is required")
});

const CreateOrEditFacilities = ({ facility, ...props }) => {
  const [openModal, setOpenModal] = React.useState(false);
  const [modalInfo1, setModalInfo1] = React.useState();
  const [modalInfo2, setModalInfo2] = React.useState();

  function handleClickOpenModal() {
    setOpenModal(true);
  }

  function handleCloseModal() {
    setOpenModal(false);
  }

  const createSignleFacility = async credentials => {
    const { data, error } = await createFacility(credentials);
    if (data) {
      props.getAllFacilities();
      console.log("facility created", data.data);
    } else if (error) {
      console.log(error.response);
    }
  };

  const updateSingleFacility = async (credentials, id) => {
    const { data, error } = await updateFacility(credentials, id);
    if (data) {
      props.getAllFacilities();
      console.log("facility updated", data.data);
    } else if (error) {
      console.log(error.response);
    }
  };

  //component only recives props

  const initialValues = {
    name: facility.name ? facility.name : "",
    price: facility.price ? facility.price : ""
  };

  console.log("edit facility props", facility);

  return (
    <>
      {Object.keys(facility).length || true ? (
        <Container maxWidth="md">
          <h1 className="large text-primary">Add or edit room type</h1>
          <Formik
            enableReinitialize
            onSubmit={(values, actions) => {
              console.log("Edit or create facility", values);

              if (Object.keys(facility).length && facility.id) {
                handleClickOpenModal();
                setModalInfo1(values);
                setModalInfo2(facility.id);
              } else {
                createSignleFacility(values);
                actions.resetForm();
              }
            }}
            initialValues={initialValues}
            validationSchema={facilitiesSchema}
          >
            {({
              handleChange,
              handleBlur,
              values,
              errors,
              touched,
              handleSubmit,
              resetForm,
              ...formProps
            }) => {
              return (
                <Form>
                  <Modal
                    open={openModal}
                    handleClose={handleCloseModal}
                    // props.setTypeForEdit();
                    userAction={() => {
                      return Object.keys(facility).length && facility.id
                        ? updateSingleFacility(modalInfo1, modalInfo2)
                        : null;
                    }}
                    additionAction={() => props.setFacilityForEdit({})} //da resetuje formu
                    modalHeader={"Update type"}
                    modalText={"Are you shure you want to update this type?"}
                  />
                  <TextField
                    margin="normal"
                    type="text"
                    fullWidth
                    label=" Name"
                    name="name"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.name}
                    error={(errors.name && touched.name) || "" ? true : false}
                  />

                  {(errors.name && touched.name) || "" ? (
                    <span className="text-danger">{errors.name || ""}</span>
                  ) : null}

                  <TextField
                    margin="normal"
                    type="text"
                    fullWidth
                    label="Facility Price"
                    name="price"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.price}
                    error={(errors.price && touched.price) || "" ? true : false}
                  />

                  {(errors.price && touched.price) || "" ? (
                    <span className="text-danger">{errors.price || ""}</span>
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
        <CircularProgress />
      ) : null}
      {/* Ako nema parametara u ruteru da se ne vrti spinner */}
    </>
  );
};
//

export default CreateOrEditFacilities;
