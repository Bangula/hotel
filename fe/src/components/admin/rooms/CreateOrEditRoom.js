import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import {
  Button,
  TextField,
  Container,
  makeStyles,
  CircularProgress,
  Checkbox,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  FormControlLabel,
  FormGroup,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper
} from "@material-ui/core";

import {
  createRoom,
  updateRoom,
  getRoomTypes,
  getFacilities,
  getRoom
} from "@endpoints/rooms";
import { useSelector, useDispatch } from "react-redux";
import Dropzone, { useDropzone } from "react-dropzone";

import Modal from "../Modal";
//initial values formik

const createOrEditRoomSchema = Yup.object().shape({
  pictures: Yup.array(),
  room_number: Yup.number()
    .min(1, "Minimum number of characters is 1")
    .max(5000)
    .required("Room Number is required"),
  room_type_id: Yup.string().required("Room Type is required"),

  facilities: Yup.array()
});
const useStyles = makeStyles(theme => ({
  submit: {
    padding: 10,
    margin: theme.spacing(3, 0, 2)
  }
}));

const CreateOrEditRoom = props => {
  const [invalidRoomTypeId, setInvalidRoomTypeId] = useState("");
  const [invalidRoomNumber, setInvalidRoomNumber] = useState("");
  const [roomTypeId, setRoomTypeId] = useState("");
  const [roomNumber, setRoomNumber] = useState("");
  const [files, setFiles] = useState([]); //from dropzone
  const [editRoom, setEditRoom] = useState({}); //store room for edit
  const [roomTypes, setRoomTypes] = useState([]); //from api
  const [roomFacilities, setRoomFacilities] = useState([]); //from api

  const [selectedFacilities, setSelectedFacilities] = useState([]); //checkboxes

  const [openModal, setOpenModal] = React.useState(false);
  const [modalInfo1, setModalInfo1] = React.useState();
  const [modalInfo2, setModalInfo2] = React.useState();

  function handleClickOpenModal(userId) {
    setOpenModal(true);
  }

  function handleCloseModal() {
    setOpenModal(false);
  }

  const createSingleRoom = async credentials => {
    const fd = new FormData();
    console.log("credentials passed", credentials);
    fd.append("pictures", credentials.pictures);
    fd.append("room_type_id", credentials.room_type_id);
    fd.append("room_number", credentials.room_number);
    fd.append("facilities", credentials.facilities);

    const { data, error } = await createRoom(fd);
    if (data) {
      console.log("Room created", data.data);
    } else if (error) {
      console.log(error.response);
    }
  };
  const getSingleRoom = async id => {
    const { data, error } = await getRoom(id);
    if (data) {
      setEditRoom(data.data.data);
      console.log("Single room fetched", data.data);
    } else if (error) {
      console.log(error.response);
    }
  };
  const updateSingleRoom = async (credentials, id) => {
    const { data, error } = await updateRoom(credentials, id);
    if (data) {
      console.log("Room updated", data.data);
    } else if (error) {
      console.log(error.response);
    }
  };
  const getAllRoomTypes = async (page = 1) => {
    const { data, error } = await getRoomTypes(page);
    if (data) {
      setRoomTypes(data.data.data);
      console.log("Room Types fetched", data.data.data);
    } else if (error) {
      console.log(error.response);
    }
  };
  const getRoomFacilities = async (page = 1) => {
    const { data, error } = await getFacilities(page);
    if (data) {
      setRoomFacilities(data.data.data);

      console.log("Room Facilities fetched", data.data.data);
    } else if (error) {
      console.log(error.response);
    }
  };

  const initialValues = {
    pictures: [...files],
    room_number: roomNumber
      ? roomNumber
      : Object.keys(editRoom).length
      ? editRoom.room_number
      : "",
    room_type_id: roomTypeId ? roomTypeId : "",
    facilities: [...selectedFacilities]
  };

  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/*",
    onDrop: acceptedFiles => {
      setFiles(
        files.concat(
          acceptedFiles.map(file =>
            Object.assign(file, {
              preview: URL.createObjectURL(file)
            })
          )
        )
      );
    }
  });

  useEffect(
    () => () => {
      // Make sure to revoke the data uris to avoid memory leaks
      files.forEach(file => URL.revokeObjectURL(file.preview));
    },
    [files]
  );

  useEffect(() => {
    if (Object.keys(props.match.params).length && props.match.params.roomId) {
      getSingleRoom(props.match.params.roomId);
    }
    getAllRoomTypes();
    getRoomFacilities();
  }, []);

  console.log("edit room props", props);
  return (
    <>
      <div style={{ marginTop: "60px" }} />
      <Container maxWidth="md" style={{ marginTop: "42px" }}>
        <h1 className="large text-primary">Add or edit room </h1>
        <Formik
          enableReinitialize
          onSubmit={(values, actions) => {
            console.log("Edit or create Room", values);
            createSingleRoom(values);

            // if (Object.keys(type).length && type.id) {
            //   handleClickOpenModal();
            //   setModalInfo1(values);
            //   setModalInfo2(type.id);
            // } else {
            //   createType(values);
            //   actions.resetForm();
            // }
          }}
          initialValues={initialValues}
          validationSchema={createOrEditRoomSchema}
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
            if (values.room_number !== "") {
              let number = values.room_number;
              let strToNum = parseInt(number, 10);
              setRoomNumber(strToNum);
            }
            if (values.room_type_id !== "") {
              setRoomTypeId(values.room_type_id);
            }

            return (
              <Form>
                {/* <Modal
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
                  /> */}
                <div
                  {...getRootProps({
                    className:
                      "h-24 bg-gray-200 mb-8 border-4 border-gray-400 border-dashed rounded flex justify-center items-center"
                  })}
                >
                  {" "}
                  <input
                    {...getInputProps()}
                    ae=""
                    name="pictures"
                    type="file"
                  />
                  <p className="">
                    FIRST Drag 'n' drop some files here, or click to select
                    files
                  </p>
                </div>

                <TextField
                  margin="normal"
                  type="text"
                  fullWidth
                  label=" Room Number"
                  name="room_number"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.room_number}
                  error={
                    (errors.room_number && touched.room_number) ||
                    invalidRoomNumber
                      ? true
                      : false
                  }
                />
                {(errors.room_number && touched.room_number) ||
                invalidRoomNumber ? (
                  <span className="text-danger">
                    {errors.room_number || invalidRoomNumber}
                  </span>
                ) : null}

                <FormControl className="w-full ">
                  <InputLabel htmlFor="age-simple">Select Room Type</InputLabel>
                  <Select
                    className="mb-8"
                    value={values.room_type_id}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    inputProps={{
                      name: "room_type_id",
                      id: "age-simple"
                    }}
                    error={
                      (errors.room_type_id && touched.room_type_id) ||
                      invalidRoomTypeId
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
                  {(errors.room_type_id && touched.room_type_id) ||
                  invalidRoomTypeId ? (
                    <span className="text-danger">
                      {errors.room_type_id || invalidRoomTypeId}
                    </span>
                  ) : null}{" "}
                </FormControl>
                {/* end select */}

                <FormGroup row name="facilities" value={values.facilities}>
                  {roomFacilities.length
                    ? roomFacilities.map(facility => {
                        return (
                          <FormControlLabel
                            key={facility.id}
                            control={
                              <Checkbox
                                name={facility.name}
                                //checked={true}
                                onChange={() =>
                                  setSelectedFacilities([
                                    ...selectedFacilities,
                                    facility.id
                                  ])
                                }
                                value={facility.id}
                              />
                            }
                            label={facility.name}
                          />
                        );
                      })
                    : null}
                </FormGroup>
                {/* CHECKBOXES */}

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
      {/* ) : <CircularProgress /> ? (
        //Object.keys(props.match).length && props.match.params.userId
        <CircularProgress />
      ) : null} */}
      {/* Ako nema parametara u ruteru da se ne vrti spinner */}

      <aside className="">
        {files.length ? (
          <Paper>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Img</TableCell>
                  <TableCell>Img Name</TableCell>

                  <TableCell align="right">Delete Img</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {files.length
                  ? files.map((file, index) => (
                      <TableRow key={file.path}>
                        <TableCell component="th" scope="row">
                          <img src={file.preview} className="h-8" />
                        </TableCell>
                        <TableCell component="th" scope="row">
                          {file.path} - {file.size} bytes
                        </TableCell>

                        <TableCell align="right">
                          {" "}
                          <Button
                            onClick={() =>
                              setFiles(
                                files.filter(
                                  (item, indexItem) => indexItem !== index
                                )
                              )
                            }
                            variant="contained"
                            color="secondary"
                          >
                            Remove
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  : null}
              </TableBody>
            </Table>
          </Paper>
        ) : null}
      </aside>
    </>
  );
};
//

export default CreateOrEditRoom;
