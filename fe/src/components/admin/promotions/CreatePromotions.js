import React, { useState, useEffect } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import {
  Button,
  TextField,
  Container,
  makeStyles,
  CircularProgress,
  Grid,
  FormControl,
  Select,
  MenuItem,
  InputLabel
} from "@material-ui/core";
import { MuiPickersUtilsProvider, DatePicker } from "@material-ui/pickers";
//import "date-fns";
import DateFnsUtils from "@date-io/date-fns";
import { getServices } from "@endpoints/services";

import Modal from "../Modal";
//initial values formik

const facilitiesSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "Minimum number of characters is 2")
    .max(5000)
    .required("Name is required"),
  description: Yup.string()
    .min(2, "Minimum number of characters is 2")
    .max(5000)
    .required("Description is required"),
  discount: Yup.number()
    .min(0, "Minimum number of characters is 1")
    .max(5000)
    .required("Discount price is required"),
  discount_children: Yup.number()
    .min(0, "Minimum number of characters is 1")
    .max(5000)
    .required("Discount for children price is required"),
  starting_at: Yup.date(),
  ending_at: Yup.date(),
  services: Yup.array(),
  facilities: Yup.array(),
  room_types: Yup.object()
});
const useStyles = makeStyles({
  grid: {
    width: "80%",
    margin: "0 auto",
    paddingBottom: "10px"
  }
});

const CreateOrEditPromotion = props => {
  const classes = useStyles();

  const [services, setServices] = useState([]);
  const [selectedService, setSelectedService] = useState([]);

  const [invalidName, setInvalidName] = useState("");
  const [invalidDescription, setInvalidDescription] = useState("");
  const [invalidStartingAt, setInvalidStartingAt] = useState("");
  const [invalidDiscount, setInvalidDiscount] = useState("");
  const [invalidDiscountChildren, setInvalidDiscountChildren] = useState("");
  const [invalidService, setInvalidService] = useState("");
  const [openModal, setOpenModal] = React.useState(false);
  const [modalInfo1, setModalInfo1] = React.useState();
  const [modalInfo2, setModalInfo2] = React.useState();
  //Started At
  const [startingAt, setStartingAt] = React.useState(
    new Date("2019-08-18T21:11:54")
  );
  const [endingAt, setEndingAt] = React.useState(
    new Date("2014-08-20T21:11:54")
  );
  function handleStartingAtChange(date) {
    setStartingAt(date);
  }
  function handleEndingAtChange(date) {
    setEndingAt(date);
  }

  function handleClickOpenModal() {
    setOpenModal(true);
  }

  function handleCloseModal() {
    setOpenModal(false);
  }

  const initialValues = {
    name: "",
    price: "",
    description: "",
    discount: "",
    discount_children: "",
    starting_at: startingAt,
    ending_at: endingAt,
    services: selectedService ? selectedService : "",
    facilities: ["y59ovgexpal8p6dr"],
    room_types: { count: "1", room_type_id: "2" }
  };

  const getAllServices = async () => {
    const { data, error } = await getServices();
    if (data) {
      setServices(data.data.data);
      console.log("services fethed", data.data);
    } else if (error) {
      console.log(error.response);
    }
  };

  // const updateSingleFacility = async (credentials, id) => {
  //   const { data, error } = await updateFacility(credentials, id);
  //   if (data) {
  //     props.getAllFacilities();
  //     console.log("facility updated", data.data);
  //   } else if (error) {
  //     console.log(error.response);
  //   }
  // };

  //console.log("edit facility props", facility);
  useEffect(() => {
    getAllServices();
  }, []);

  return (
    <>
      {
        //Object.keys(facility).length || true ? (
        <Container maxWidth="md">
          <h1 className="large text-primary">Add or edit room type</h1>
          <Formik
            enableReinitialize
            onSubmit={(values, actions) => {
              console.log("Edit or create facility", values);

              // if (Object.keys(facility).length && facility.id) {
              //   handleClickOpenModal();
              //   setModalInfo1(values);
              //   setModalInfo2(facility.id);
              // } else {
              //   createSignleFacility(values);
              //   actions.resetForm();
              // }
            }}
            initialValues={initialValues}
            // validationSchema={facilitiesSchema}
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
              if (values.services !== "") {
                setSelectedService(values.services);
              }
              // if (values.room_type_id !== "") {
              //   setRoomTypeId(values.room_type_id);
              // }

              return (
                <Form>
                  {/* <Modal
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
                  /> */}
                  <TextField
                    margin="normal"
                    type="text"
                    fullWidth
                    label=" Name"
                    name="name"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.name}
                    error={
                      (errors.name && touched.name) || invalidName
                        ? true
                        : false
                    }
                  />

                  {(errors.name && touched.name) || invalidName ? (
                    <span className="text-danger">
                      {errors.name || invalidName}
                    </span>
                  ) : null}
                  <TextField
                    margin="normal"
                    type="text"
                    fullWidth
                    label="Description"
                    name="description"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.description}
                    error={
                      (errors.description && touched.description) ||
                      invalidDescription
                        ? true
                        : false
                    }
                  />

                  {(errors.description && touched.description) ||
                  invalidDescription ? (
                    <span className="text-danger">
                      {errors.description || invalidDescription}
                    </span>
                  ) : null}

                  <TextField
                    margin="normal"
                    type="text"
                    fullWidth
                    label="Discount Price"
                    name="discount"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.discount}
                    error={
                      (errors.discount && touched.discount) || invalidDiscount
                        ? true
                        : false
                    }
                  />

                  {(errors.discount && touched.discount) || invalidDiscount ? (
                    <span className="text-danger">
                      {errors.discount || invalidDiscount}
                    </span>
                  ) : null}

                  <TextField
                    margin="normal"
                    type="text"
                    fullWidth
                    label="Discount Price for Children"
                    name="discount_children"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.discount_children}
                    error={
                      (errors.discount_children && touched.discount_children) ||
                      invalidDiscountChildren
                        ? true
                        : false
                    }
                  />

                  {(errors.discount_children && touched.discount_children) ||
                  invalidDiscountChildren ? (
                    <span className="text-danger">
                      {errors.discount_children || invalidDiscountChildren}
                    </span>
                  ) : null}

                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <Grid
                      container
                      className={classes.grid}
                      justify="space-between"
                    >
                      <DatePicker
                        margin="normal"
                        id="mui-pickers-date"
                        label="Starting At"
                        value={startingAt}
                        onChange={handleStartingAtChange}
                      />
                      <DatePicker
                        margin="normal"
                        id="mui-pickers-date"
                        label="Ending At"
                        value={endingAt}
                        onChange={handleEndingAtChange}
                      />
                    </Grid>
                  </MuiPickersUtilsProvider>

                  <FormControl className="w-full ">
                    <InputLabel htmlFor="age-simple">
                      Select Room Type
                    </InputLabel>
                    <Select
                      className="mb-8"
                      value={selectedService}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      inputProps={{
                        name: "services",
                        id: "age-simple"
                      }}
                      error={
                        (errors.services && touched.services) || invalidService
                          ? true
                          : false
                      }
                    >
                      {services.length
                        ? services.map(service => {
                            return (
                              <MenuItem value={service.id} key={service.id}>
                                {service.name}
                              </MenuItem>
                            );
                          })
                        : null}
                    </Select>
                    {(errors.services && touched.services) || invalidService ? (
                      <span className="text-danger">
                        {errors.services || invalidService}
                      </span>
                    ) : null}{" "}
                  </FormControl>
                  {/* end select */}

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
        // ) : <CircularProgress /> ? (
        //   <CircularProgress />
        // ) : null}
      }
    </>
  );
};
//

export default CreateOrEditPromotion;
