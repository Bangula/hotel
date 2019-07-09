import React, { useState, useEffect } from "react";
import { Field, Formik, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { getAllGenres } from "@endpoints/genres";
import { getSongById } from "@endpoints/songs";

const CreateSong = ({ id }) => {
  const [genres, setGenres] = useState([]);
  useEffect(() => {
    getGenres();
    if (id) getSongData(id);
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
    const { data, error } = await getSongById(id);
    if (data) {
      console.log(data);
    } else if (error) {
      console.log(error.response);
    }
  }

  if (id) console.log(id);

  const Schema = Yup.object().shape({
    name: Yup.string()
      .label("Name")
      .min(3, "Name is to short")
      .max(20, "Too LONG!.")
      .required("Name is required"),
    email: Yup.string()
      .email("Must be a vaild email")
      .required("Email is required"),
    message: Yup.string()
      .required("Message is required")
      .min(5, "Message to short")
      .max(200, "Too LONG!.")
  });

  const initialValues = {
    name: "",
    message: "",
    email: ""
  };
  return (
    <div>
      <div />
    </div>
  );
};

export default CreateSong;
