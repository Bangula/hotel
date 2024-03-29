import React, { useState, useEffect } from "react";
import { Formik, Form } from "formik";
import {
  Button,
  TextField,
  Container,
  makeStyles,
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
import { getRoomTypes } from "@endpoints/rooms";
import { createPromotion } from "@endpoints/promotions";

//initial values formik

// const facilitiesSchema = Yup.object().shape({
//   name: Yup.string()
//     .min(2, "Minimum number of characters is 2")
//     .max(5000)
//     .required("Name is required"),
//   description: Yup.string()
//     .min(2, "Minimum number of characters is 2")
//     .max(5000)
//     .required("Description is required"),
//   discount: Yup.number()
//     .min(0, "Minimum number of characters is 1")
//     .max(5000)
//     .required("Discount price is required"),
//   discount_children: Yup.number()
//     .min(0, "Minimum number of characters is 1")
//     .max(5000)
//     .required("Discount for children price is required"),
//   starting_at: Yup.date(),
//   ending_at: Yup.date(),
//   services: Yup.array(),
//   facilities: Yup.array(),
//   room_types: Yup.object()
// });
const useStyles = makeStyles({
  grid: {
    width: "80%",
    margin: "0 auto",
    paddingBottom: "10px"
  }
});

const CreateOrEditPromotion = () => {
  const classes = useStyles();

  const [services, setServices] = useState([]);
  const [selectedService, setSelectedService] = useState([]);
  const [roomTypes, setRoomTypes] = useState([]);
  const [selectedRoomType, setSelectedRoomType] = useState("");

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
  const initialValues = {
    name: "",
    // price: "",
    description: "",
    discount: "",
    discount_children: "",
    starting_at: startingAt,
    ending_at: endingAt,
    services: selectedService ? selectedService : "",
    facilities: ["y59ovgexpal8p6dr"],
    // room_types: { count: "1", room_type_id: "2" }
    room_types: selectedRoomType ? selectedRoomType : ""
  };

  const createSinglePromotion = async values => {
    const { data, error } = await createPromotion(values);
    if (data) {
      console.log("Promotion created");
    } else if (error) {
      console.log(error.response);
    }
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
  const getAllRoomTypes = async (page = 1) => {
    const { data, error } = await getRoomTypes(page);
    if (data) {
      setRoomTypes(data.data.data);
      console.log("Room Types fethed", data.data);
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
    getAllRoomTypes();
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
              createSinglePromotion(values);
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
              console.log("room type", values.room_types);
              if (values.room_types !== "") {
                setSelectedRoomType(values.room_types);
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
                    error={(errors.name && touched.name) || "" ? true : false}
                  />
                  {(errors.name && touched.name) || "" ? (
                    <span className="text-danger">{errors.name || ""}</span>
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
                      (errors.description && touched.description) || ""
                        ? true
                        : false
                    }
                  />
                  {(errors.description && touched.description) || "" ? (
                    <span className="text-danger">
                      {errors.description || ""}
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
                      (errors.discount && touched.discount) || "" ? true : false
                    }
                  />
                  {(errors.discount && touched.discount) || "" ? (
                    <span className="text-danger">{errors.discount || ""}</span>
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
                      ""
                        ? true
                        : false
                    }
                  />
                  {(errors.discount_children && touched.discount_children) ||
                  "" ? (
                    <span className="text-danger">
                      {errors.discount_children || ""}
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
                      Select Services
                    </InputLabel>
                    <Select
                      className="mb-8"
                      value={values.services}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      inputProps={{
                        name: "services",
                        id: "age-simple"
                      }}
                      error={
                        (errors.services && touched.services) || ""
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
                    {(errors.services && touched.services) || "" ? (
                      <span className="text-danger">
                        {errors.services || ""}
                      </span>
                    ) : null}{" "}
                  </FormControl>

                  <FormControl className="w-full ">
                    <InputLabel htmlFor="simple">Select Room Types</InputLabel>
                    <Select
                      className="mb-8"
                      value={values.room_types}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      inputProps={{
                        name: "room_types",
                        id: "simple"
                      }}
                      error={
                        (errors.room_types && touched.room_types) || ""
                          ? true
                          : false
                      }
                    >
                      {roomTypes.length
                        ? roomTypes.map(type => {
                            return (
                              <MenuItem value={type.id} key={type.id}>
                                {type.name}
                              </MenuItem>
                            );
                          })
                        : null}
                    </Select>
                    {/* {(errors.services && touched.services) || "" ? (
                      <span className="text-danger">
                        {errors.services || ""}
                      </span>
                    ) : null}{" "} */}
                  </FormControl>

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
