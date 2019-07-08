import React, { createRef, useState, useEffect } from "react";
import Dropzone, { useDropzone } from "react-dropzone";
import { Button, TextField, Container, Snackbar } from "@material-ui/core";
import { Link } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

import { createGallery } from "@endpoints/gallery";
import {
  makeStyles,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
  useTheme,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  CircularProgress
} from "@material-ui/core";

const Gallery = props => {
  const [files, setFiles] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [invalidName, setInvalidName] = useState("");
  const [invalidDescription, setInvalidDescription] = useState("");

  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/*",
    onDrop: acceptedFiles => {
      console.log("on drop", acceptedFiles);
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

  console.log("Slike", files);
  const createSingleGallery = async credentials => {
    console.log("credentials", credentials.files);
    const fd = new FormData();
    fd.append("files", credentials.files);
    console.log("fd", fd);

    const { data, error } = await createGallery(fd);
    if (data) {
      console.log("Gallery created", data.data);
    } else if (error) {
      console.log("gallery error", error.response);
    }
  };

  useEffect(
    () => () => {
      // Make sure to revoke the data uris to avoid memory leaks
      files.forEach(file => URL.revokeObjectURL(file.preview));
    },
    [files]
  );

  const initialValues = {
    name: name ? name : "",
    description: description ? description : "",
    files: [...files]
  };

  const gallerySchema = Yup.object().shape({
    name: Yup.string()
      .min(2)
      .max(50)
      .required("Gallery Name is required"),
    description: Yup.string()
      .min(2)
      .max(50)
      .required("Description is required"),
    files: Yup.array()
  });

  return (
    <section className="">
      <Formik
        enableReinitialize
        onSubmit={values => {
          console.log("Gallery", values);
          createSingleGallery(values);
        }}
        initialValues={initialValues}
        validationSchema={gallerySchema}
      >
        {({ handleChange, handleBlur, values, errors, touched, ...props }) => {
          if (values.name !== "") {
            setName(values.name);
          }
          if (values.description !== "") {
            setDescription(values.description);
          }
          console.log("files value", values.files);
          return (
            <Form>
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
                  name="files"
                  // value={values.files}
                  // onChange={handleChange}
                  type="file"
                />
                <p className="">
                  FIRST Drag 'n' drop some files here, or click to select files
                </p>
              </div>
              {/* <input
                name="files"
                value={values.files}
                onChange={handleChange}
                type="file"
              />{" "} */}
              <TextField
                //  disabled={files.length ? false : true}
                margin="normal"
                type="text"
                fullWidth
                label="Gallery Name"
                name="name"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.name}
                error={
                  (errors.name && touched.name) || invalidName ? true : false
                }
              />
              {(errors.name && touched.name) || invalidName ? (
                <span className="text-danger">
                  {errors.name || invalidName}
                </span>
              ) : null}
              <TextField
                // disabled={files.length ? false : true}
                margin="normal"
                type="text"
                fullWidth
                label="Gallery Description"
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
    </section>
  );
};

export default Gallery;
