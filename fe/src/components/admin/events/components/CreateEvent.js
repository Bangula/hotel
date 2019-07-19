import React, { useState, useEffect } from "react";
import { Field, Formik, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import Dropzone, { useDropzone } from "react-dropzone";
import moment from "moment";

// Endpoint actions
import {
  getEventById,
  updateEvent,
  createEvent,
  getAllEventTypes
} from "@endpoints/events";
import { getAllLocations } from "@endpoints/locations";
import { getAllGenres } from "@endpoints/genres";

import DateFnsUtils from "@date-io/date-fns";
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";

import TextField from "@material-ui/core/TextField";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";

const CreateEvent = ({ id, setValue, Alert }) => {
  const [locations, setLocations] = useState([]);
  const [eventTypes, setEventTypes] = useState([]);
  const [eventData, setEventData] = useState({});
  const [genres, setGenres] = useState([]);

  const [startingAt, setStartingAt] = React.useState(new Date());
  const [endingAt, setEndingAt] = React.useState(new Date());

  const [file, setFile] = useState(); //from dropzone

  useEffect(() => {
    getEventTypes();
    getGenres();
    getLocations();
    getEventData(id);
  }, [id]);

  async function getLocations() {
    const { data, error } = await getAllLocations();
    if (data) {
      console.log(data.data);
      setLocations(data.data.data);
    } else if (error) {
      console.log(error.response);
    }
  }
  async function getEventTypes(page) {
    const { data, error } = await getAllEventTypes(page);
    if (data) {
      console.log(data.data);
      setEventTypes(data.data.data);
    } else if (error) {
      console.log(error.response);
    }
  }

  async function getGenres() {
    const { data, error } = await getAllGenres();
    if (data) {
      console.log(data.data);
      setGenres(data.data.data);
    } else if (error) {
      console.log(error.response);
    }
  }

  const locationsSelectList = locations.length
    ? locations.map(item => {
        return (
          <MenuItem key={item.id} value={item.id}>
            {item.name}
          </MenuItem>
        );
      })
    : null;

  const eventTypesList = eventTypes.length
    ? eventTypes.map(item => {
        return (
          <MenuItem key={item.id} value={item.id}>
            {item.name}
          </MenuItem>
        );
      })
    : null;

  const genresSelectList = genres.length
    ? genres.map(item => {
        return (
          <MenuItem key={item.id} value={item.id}>
            {item.name}
          </MenuItem>
        );
      })
    : null;

  async function getEventData(id) {
    if (id.length) {
      const { data, error } = await getEventById(id);
      if (data) {
        console.log(data.data.data);
        setEventData(data.data.data);
        setStartingAt(data.data.data.started_at);
        setEndingAt(data.data.data.ended_at);
      } else if (error) {
        console.log(error.response);
      }
    }
  }

  const Schema = Yup.object().shape({
    title: Yup.string()
      .min(2, "Title is to short")
      .max(100, "Too LONG!.")
      .required("Title is required field"),

    description: Yup.string()
      .min(2, "Description is to short")
      .max(100, "Too LONG!.")
      .required("Description is required field"),

    capacity: Yup.number()
      .min(2, "To short")
      .max(500, "Too LONG!.")
      .required("Capacity is required field"),

    location_id: Yup.string()
      .min(2, "To short")
      .max(100, "Too LONG!.")
      .required("Location is required field"),

    event_type_id: Yup.string()
      .min(2, "To short")
      .max(100, "Too LONG!.")
      .required("Location is required field")
  });

  let locationEdit =
    Object.keys(eventData).length > 0 ? eventData.location_id : "";
  let eventTypeEdit =
    Object.keys(eventData).length > 0 ? eventData.event_type_id : "";

  const initialValues = {
    title: Object.keys(eventData).length > 0 ? eventData.title : "",
    description: Object.keys(eventData).length > 0 ? eventData.description : "",
    capacity: Object.keys(eventData).length > 0 ? eventData.capacity : "",
    location_id: locations.length ? locations[0].id : locationEdit,
    event_type_id: eventTypes.length ? eventTypes[0].id : eventTypeEdit,
    music: Object.keys(eventData).length > 0 ? eventData.music : 0,
    genre: genres.length ? genres[0].id : "",
    karaoke: Object.keys(eventData).length > 0 ? eventData.music : 0
  };

  const handleCreateSubmit = async values => {
    const newEvent = {
      ...values,
      file
    };

    console.log(values);
    const fd = new FormData();
    fd.append("title", newEvent.title);
    fd.append("description", newEvent.description);
    fd.append("capacity", newEvent.capacity);
    fd.append("started_at", moment(startingAt).format("YYYY-MM-DD"));
    fd.append("ended_at", moment(endingAt).format("YYYY-MM-DD"));
    fd.append("location_id", newEvent.location_id);
    fd.append("event_type_id", newEvent.event_type_id);
    fd.append("music", newEvent.music);
    fd.append("genre", newEvent.genre);
    fd.append("title", newEvent.title);
    fd.append("karaoke", newEvent.karaoke);
    fd.append("image", newEvent.file);

    if (Object.keys(eventData).length <= 0) {
      const { data, error } = await createEvent(fd);
      if (data) {
        console.log(data.data);
        Alert.success(<i className="fas fa-check" />, {
          effect: "slide",
          timeout: 2000,
          position: "bottom-right"
        });
        setValue();
      } else if (error) {
        console.log(error.response);
      }
    } else {
      const { data, error } = await updateEvent(fd, eventData.id);
      console.log(values);
      if (data) {
        console.log(data.data);
        Alert.success(<i className="fas fa-check" />, {
          effect: "slide",
          timeout: 2000,
          position: "bottom-right"
        });
        setValue();
      } else if (error) {
        console.log(error.response);
      }
    }
  };

  function handleStartingAtChange(date) {
    setStartingAt(date);
  }

  function handleEndingAtChange(date) {
    setEndingAt(date);
  }

  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/*",
    onDrop: acceptedFiles => {
      let file = acceptedFiles[0];

      setFile(
        Object.assign(file, {
          preview: URL.createObjectURL(file)
        })
      );
    }
  });

  return (
    <div>
      <div style={{ width: "100%", maxWidth: "600px" }} className="mx-auto">
        <h1 className="text-center italic text-gray-600 mt-8">
          {Object.keys(eventData).length > 0
            ? "Edit event"
            : "Create new event"}
        </h1>
        <Formik
          enableReinitialize
          initialValues={initialValues}
          validationSchema={Schema}
          onSubmit={values => {
            handleCreateSubmit(values);
          }}
          render={props => (
            <Form>
              <div
                {...getRootProps({
                  className:
                    "h-24 bg-gray-200 mb-8 border-4 border-gray-400 border-dashed rounded flex justify-center items-center mt-8"
                })}
              >
                {" "}
                <input {...getInputProps()} ae="" name="pictures" type="file" />
                <p className="">
                  Drag 'n' drop file here, or click to select file
                </p>
              </div>

              <Field name="title">
                {({ field }) => (
                  <TextField
                    id="standard-textarea"
                    fullWidth
                    label="Event title"
                    {...field}
                  />
                )}
              </Field>

              <ErrorMessage name="title">
                {mssg => (
                  <small className="block text-center text-red-600">
                    {mssg}
                  </small>
                )}
              </ErrorMessage>
              <br />

              <Field name="description">
                {({ field }) => (
                  <TextField
                    id="standard-textarea"
                    fullWidth
                    label="Event description"
                    {...field}
                  />
                )}
              </Field>

              <ErrorMessage name="description">
                {mssg => (
                  <small className="block text-center text-red-600">
                    {mssg}
                  </small>
                )}
              </ErrorMessage>
              <br />

              <Field name="capacity">
                {({ field }) => (
                  <TextField
                    id="standard-textarea"
                    fullWidth
                    label="Capacity"
                    {...field}
                  />
                )}
              </Field>

              <ErrorMessage name="capacity">
                {mssg => (
                  <small className="block text-center text-red-600">
                    {mssg}
                  </small>
                )}
              </ErrorMessage>

              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <dir className="w-full flex justify-start p-0">
                  <DatePicker
                    label="Starting at:"
                    value={startingAt}
                    onChange={handleStartingAtChange}
                  />
                </dir>

                <dir className="w-full flex justify-start p-0">
                  <DatePicker
                    label="Ending at:"
                    value={endingAt}
                    onChange={handleEndingAtChange}
                  />
                </dir>
              </MuiPickersUtilsProvider>

              <dir className="w-full flex justify-start p-0">
                <p className="text-gray-600 italic mr-8 p-0 mt-3">
                  Select location:
                </p>
                <div>
                  <Field name="location_id">
                    {({ field }) => (
                      <Select {...field} label="Select location">
                        {locationsSelectList}
                      </Select>
                    )}
                  </Field>

                  <ErrorMessage name="location_id">
                    {mssg => (
                      <small className="block text-center text-red-600">
                        {mssg}
                      </small>
                    )}
                  </ErrorMessage>
                </div>
              </dir>

              <dir className="w-full flex justify-start p-0">
                <p className="text-gray-600 italic mr-8 p-0 mt-3">
                  Select event type:
                </p>
                <div>
                  <Field name="event_type_id">
                    {({ field }) => (
                      <Select {...field} label="Select event type">
                        {eventTypesList}
                      </Select>
                    )}
                  </Field>

                  <ErrorMessage name="event_type_id">
                    {mssg => (
                      <small className="block text-center text-red-600">
                        {mssg}
                      </small>
                    )}
                  </ErrorMessage>
                </div>
              </dir>

              <dir className="w-full flex justify-start p-0">
                <p className="text-gray-600 italic mr-8 p-0 mt-3">Music:</p>
                <div>
                  <Field name="music">
                    {({ field }) => (
                      <Select {...field} label="Music">
                        <MenuItem value={1}>Yes</MenuItem>
                        <MenuItem value={0}>No</MenuItem>
                      </Select>
                    )}
                  </Field>
                </div>
              </dir>

              <dir className="w-full flex justify-start p-0">
                <p className="text-gray-600 italic mr-8 p-0 mt-3">Genre:</p>
                <div>
                  <Field name="genre">
                    {({ field }) => (
                      <Select {...field} label="Genre">
                        {genresSelectList}
                      </Select>
                    )}
                  </Field>
                </div>
              </dir>

              <dir className="w-full flex justify-start p-0">
                <p className="text-gray-600 italic mr-8 p-0 mt-3">Karaoke:</p>
                <div>
                  <Field name="karaoke">
                    {({ field }) => (
                      <Select {...field} label="Karaoke">
                        <MenuItem value={1}>Yes</MenuItem>
                        <MenuItem value={0}>No</MenuItem>
                      </Select>
                    )}
                  </Field>
                </div>
              </dir>

              <div className="w-full flex justify-end">
                <Button variant="contained" color="primary" type="submit">
                  {Object.keys(eventData).length > 0 ? "Edit" : "Create"}
                </Button>
              </div>
            </Form>
          )}
        />
      </div>
    </div>
  );
};

export default CreateEvent;
