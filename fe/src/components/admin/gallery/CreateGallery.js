import React, { createRef, useState, useEffect } from "react";
import Dropzone, { useDropzone } from "react-dropzone";

import {
  makeStyles,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
  useTheme,
  Button,
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

  return (
    <section className="">
      <div
        {...getRootProps({
          className:
            "h-24 bg-gray-200 mb-8 border-4 border-gray-400 border-dashed rounded flex justify-center items-center"
        })}
      >
        <input {...getInputProps()} classNamgit ae="" />
        <p className="">
          Drag 'n' drop some files here, or click to select files
        </p>
      </div>
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
