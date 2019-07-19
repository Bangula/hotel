import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import {
  Button,
  TextField,
  Container,
  CircularProgress
} from "@material-ui/core";
import { createRoomType, updateRoomType } from "@endpoints/rooms";

import Modal from "../Modal";
//initial values formik

const editUserSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "Minimum number of characters is 2")
    .max(5000)
    .required("Name is required"),
  bed_count: Yup.number()
    .min(1, "Minimum number of characters is 1")
    .max(5000)
    .required("Bed count is required"),
  max_persons: Yup.number()
    .min(1, "Minimum number of characters is 1")
    .max(5000)
    .required("Maximum number of persons is required"),
  price_adult: Yup.number()
    .min(1, "Minimum number of characters is 1")
    .max(5000)
    .required("Price for Adults is required"),
  price_child: Yup.number()
    .min(1, "Minimum number of characters is 1")
    .max(5000)
    .required("Price for Children is required")
});

const EditRoomType = ({ type, ...props }) => {
  //   const [type, setType] = useState({});

  const [openModal, setOpenModal] = React.useState(false);
  const [modalInfo1, setModalInfo1] = React.useState();
  const [modalInfo2, setModalInfo2] = React.useState();

  function handleClickOpenModal(userId) {
    setOpenModal(true);
  }

  function handleCloseModal() {
    setOpenModal(false);
  }

  const createType = async credentials => {
    const { data, error } = await createRoomType(credentials);
    if (data) {
      props.getAllRoomTypes();
      console.log("type created", data.data);
    } else if (error) {
      console.log(error.response);
    }
  };
  const updateType = async (credentials, id) => {
    const { data, error } = await updateRoomType(credentials, id);
    if (data) {
      props.getAllRoomTypes();
      console.log("type updated", data.data);
    } else if (error) {
      console.log(error.response);
    }
  };

  const initialValues = {
    name: type.name ? type.name : "",
    bed_count: type.bed_count ? type.bed_count : "",
    max_persons: type.max_persons ? type.max_persons : "",
    price_adult: type.price_adult ? type.price_adult : "",
    price_child: type.price_child ? type.price_child : ""
  };

  console.log("edit types props", type);

  return (
    <>
      {Object.keys(type).length || true ? (
        <Container maxWidth="md">
          <h1 className="large text-primary">Add or edit room type</h1>
          <Formik
            enableReinitialize
            onSubmit={(values, actions) => {
              console.log("Edit or create type", values);

              if (Object.keys(type).length && type.id) {
                handleClickOpenModal();
                setModalInfo1(values);
                setModalInfo2(type.id);
              } else {
                createType(values);
                actions.resetForm();
              }
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
                      return Object.keys(type).length && type.id
                        ? updateType(modalInfo1, modalInfo2)
                        : null;
                    }}
                    additionAction={() => props.setTypeForEdit({})} //da resetuje formu
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
                    label="Bed Count"
                    name="bed_count"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.bed_count}
                    error={
                      (errors.bed_count && touched.bed_count) || ""
                        ? true
                        : false
                    }
                  />

                  {(errors.bed_count && touched.bed_count) || "" ? (
                    <span className="text-danger">
                      {errors.bed_count || ""}
                    </span>
                  ) : null}

                  <TextField
                    margin="normal"
                    type="text"
                    fullWidth
                    label="Maximum Persons"
                    name="max_persons"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.max_persons}
                    error={
                      (errors.max_persons && touched.max_persons) || ""
                        ? true
                        : false
                    }
                  />

                  {(errors.max_persons && touched.max_persons) || "" ? (
                    <span className="text-danger">
                      {errors.max_persons || ""}
                    </span>
                  ) : null}

                  <TextField
                    margin="normal"
                    type="text"
                    fullWidth
                    label="Price for Adults"
                    name="price_adult"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.price_adult}
                    error={
                      (errors.price_adult && touched.price_adult) || ""
                        ? true
                        : false
                    }
                  />

                  {(errors.price_adult && touched.price_adult) || "" ? (
                    <span className="text-danger">
                      {errors.price_adult || ""}
                    </span>
                  ) : null}

                  <TextField
                    margin="normal"
                    type="text"
                    fullWidth
                    label="Price for Children"
                    name="price_child"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.price_child}
                    error={
                      (errors.price_child && touched.price_child) || ""
                        ? true
                        : false
                    }
                  />

                  {(errors.price_child && touched.price_child) || "" ? (
                    <span className="text-danger">
                      {errors.price_child || ""}
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
