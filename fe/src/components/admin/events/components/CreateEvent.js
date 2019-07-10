import React, { useState, useEffect } from "react";
import { Field, Formik, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

import { getEventById, updateEvent, createEvent } from "@endpoints/events";

import TextField from "@material-ui/core/TextField";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";

const CreateEvent = ({ id, setValue }) => {
  const [genres, setGenres] = useState([]);
  const [eventData, setEventData] = useState({});

  useEffect(() => {
    getEventData(id);
  }, [id]);

  async function getEventData(id) {
    if (id.length) {
      const { data, error } = await getEventById(id);
      if (data) {
        console.log(data.data.data);
        setEventData(data.data.data);
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
      .required("Location is required field")
  });

  const initialValues = {
    name: Object.keys(eventData).length > 0 ? eventData.name : "",
    artist: Object.keys(eventData).length > 0 ? eventData.artist : "",
    link: Object.keys(eventData).length > 0 ? eventData.link : "",
    duration: Object.keys(eventData).length > 0 ? eventData.duration : "",
    genre_id: Object.keys(eventData).length > 0 ? "" : "Rock"
  };

  if (Object.keys(eventData).length > 0) console.log(eventData.name);

  const handleCreateSubmit = async values => {
    // const genreId = genres.filter(item => {
    //   return item.name === values.genre_id;
    // })[0].id;
    // const newSong = {
    //   name: values.name,
    //   artist: values.artist,
    //   duration: values.duration,
    //   link: values.link,
    //   genre_id: genreId
    // };
    // const { data, error } = await createSong(newSong);
    // if (data) {
    //   console.log(data.data);
    //   setValue();
    // } else if (error) {
    //   console.log(error.response);
    // }
  };

  const handleEditSubmit = async values => {
    const genreId = genres.filter(item => {
      return item.name === values.genre_id;
    })[0].id;
    const newSong = {
      name: values.name,
      artist: values.artist,
      duration: values.duration,
      link: values.link,
      genre_id: genreId
    };
    const { data, error } = await updateEvent(newSong, id);
    if (data) {
      console.log(data.data);
      setValue();
    } else if (error) {
      console.log(error.response);
    }
  };

  return (
    <div>
      <div style={{ width: "100%", maxWidth: "600px" }} className="mx-auto">
        <h1 className="text-center italic text-gray-600 mt-8">
          {Object.keys(eventData).length > 0 ? "Edit song" : "Create new song"}
        </h1>
        <Formik
          enableReinitialize
          initialValues={initialValues}
          validationSchema={Schema}
          onSubmit={values => {
            if (Object.keys(eventData).length > 0) handleEditSubmit(values);
            else handleCreateSubmit(values);
          }}
          render={props => (
            <Form>
              <Field name="name">
                {({ field }) => (
                  <TextField
                    id="standard-textarea"
                    fullWidth
                    label="Song name"
                    {...field}
                  />
                )}
              </Field>

              <ErrorMessage name="name">
                {mssg => (
                  <small className="block text-center text-red-600">
                    {mssg}
                  </small>
                )}
              </ErrorMessage>
              <br />

              <Field name="artist">
                {({ field }) => (
                  <TextField
                    id="standard-textarea"
                    label="Artist"
                    fullWidth
                    {...field}
                  />
                )}
              </Field>
              <ErrorMessage name="artist">
                {mssg => (
                  <small className="block text-center text-red-600">
                    {mssg}
                  </small>
                )}
              </ErrorMessage>
              <br />

              <Field name="link">
                {({ field }) => (
                  <TextField
                    id="standard-textarea"
                    fullWidth
                    label="Link"
                    {...field}
                  />
                )}
              </Field>
              <ErrorMessage name="link">
                {mssg => (
                  <small className="block text-center text-red-600">
                    {mssg}
                  </small>
                )}
              </ErrorMessage>
              <br />

              <Field name="duration">
                {({ field }) => (
                  <TextField
                    id="standard-textarea"
                    label="Duration"
                    fullWidth
                    {...field}
                  />
                )}
              </Field>
              <ErrorMessage name="duration">
                {mssg => (
                  <small className="block text-center text-red-600">
                    {mssg}
                  </small>
                )}
              </ErrorMessage>
              <br />
              <div className="w-full flex justify-start mt-8">
                <p className="italic text-gray-600 mr-8">Select genre: </p>
                <Field name="genre_id">
                  {({ field }) => (
                    <Select {...field} label="Select genre">
                      <MenuItem value={"Rock"}>Rock</MenuItem>
                      <MenuItem value={"Pop"}>Pop</MenuItem>
                      <MenuItem value={"Rap"}>Rap</MenuItem>
                      <MenuItem value={"Trance"}>Trance</MenuItem>
                    </Select>
                  )}
                </Field>
                <ErrorMessage name="genre_id">
                  {mssg => (
                    <small className="block text-center text-red-600">
                      {mssg}
                    </small>
                  )}
                </ErrorMessage>
              </div>

              <br />
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
