import React, { useState, useEffect } from "react";
import { Field, Formik, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { getAllGenres } from "@endpoints/genres";
import { getSongById, createSong, updateSong } from "@endpoints/songs";

import TextField from "@material-ui/core/TextField";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";

const CreateSong = ({ id, setValue }) => {
  const [genres, setGenres] = useState([]);
  const [songData, setSongData] = useState({});

  useEffect(() => {
    getGenres();
  }, []);

  useEffect(() => {
    getSongData(id);
  }, [id]);

  async function getGenres() {
    const { data, error } = await getAllGenres();
    if (data) {
      console.log(data.data);
      setGenres(data.data.data);
    } else if (error) {
      console.log(error.response);
    }
  }

  async function getSongData(id) {
    if (id.length) {
      const { data, error } = await getSongById(id);
      if (data) {
        console.log(data.data.data);
        setSongData(data.data.data);
      } else if (error) {
        console.log(error.response);
      }
    }
  }

  const Schema = Yup.object().shape({
    name: Yup.string()
      .min(2, "Name is to short")
      .max(30, "Too LONG!.")
      .required("Song name is required field"),
    artist: Yup.string()
      .min(2, "To short")
      .max(30, "Too LONG!.")
      .required("Artist is required field"),
    link: Yup.string()
      .required("Link is required")
      .min(5, "To short")
      .max(200, "Too LONG!."),
    duration: Yup.number()
      .required("Duration is required")
      .min(1, "To short")
      .max(200, "Too LONG!."),
    genre_id: Yup.string()
      .required("Genre is required")
      .min(1, "To short")
      .max(20, "Too LONG!.")
  });

  let genreSelectList = genres.length
    ? genres.map(item => {
        return (
          <MenuItem key={item.id} value={item.name}>
            {item.name}
          </MenuItem>
        );
      })
    : null;

  const initialValues = {
    name: Object.keys(songData).length > 0 ? songData.name : "",
    artist: Object.keys(songData).length > 0 ? songData.artist : "",

    link: Object.keys(songData).length > 0 ? songData.link : "",
    duration: Object.keys(songData).length > 0 ? songData.duration : "",
    genre_id:
      Object.keys(songData).length > 0 ? songData.genre.data.name : "Rock"
  };

  if (Object.keys(songData).length > 0) console.log(songData.name);

  const handleCreateSubmit = async values => {
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
    const { data, error } = await createSong(newSong);
    if (data) {
      console.log(data.data);
      setValue();
    } else if (error) {
      console.log(error.response);
    }
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
    const { data, error } = await updateSong(newSong, id);
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
          {Object.keys(songData).length > 0 ? "Edit song" : "Create new song"}
        </h1>
        <Formik
          enableReinitialize
          initialValues={initialValues}
          validationSchema={Schema}
          onSubmit={values => {
            if (Object.keys(songData).length > 0) handleEditSubmit(values);
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
                      {genreSelectList}
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
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  fullWidth
                >
                  {Object.keys(songData).length > 0 ? "Edit" : "Create"}
                </Button>
              </div>
            </Form>
          )}
        />
      </div>
    </div>
  );
};

export default CreateSong;
