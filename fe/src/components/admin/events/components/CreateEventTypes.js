import React, { useState, useEffect } from "react";
import { Field, Formik, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

// Endpoint actions
import {
  createEventType,
  getEventTypeById,
  updateEventType
} from "@endpoints/events";

import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

const CreateEventTypes = ({ id, setValue }) => {
  const [eventTypeData, setEventTypeData] = useState({});

  useEffect(() => {
    getEventTypeData(id);
  }, [id]);

  async function getEventTypeData(id) {
    if (id.length) {
      const { data, error } = await getEventTypeById(id);
      if (data) {
        console.log(data.data.data);
        setEventTypeData(data.data.data);
      } else if (error) {
        console.log(error.response);
      }
    }
  }

  const Schema = Yup.object().shape({
    name: Yup.string()
      .min(2, "Name is to short")
      .max(100, "Too LONG!.")
      .required("Name is required field")
  });

  const initialValues = {
    name: Object.keys(eventTypeData).length > 0 ? eventTypeData.name : ""
  };

  const handleCreateSubmit = async values => {
    if (Object.keys(eventTypeData).length <= 0) {
      const { data, error } = await createEventType(values);
      if (data) {
        console.log(data.data);
        setValue();
      } else if (error) {
        console.log(error.response);
      }
    } else {
      const { data, error } = await updateEventType(id, values);
      if (data) {
        console.log(data.data);
        setValue();
      } else if (error) {
        console.log(error.response);
      }
    }
  };

  return (
    <div>
      <div style={{ width: "100%", maxWidth: "600px" }} className="mx-auto">
        <h1 className="text-center italic text-gray-600 mt-8">
          {Object.keys(eventTypeData).length > 0
            ? "Edit event type"
            : "Create new event type"}
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
              <Field name="name">
                {({ field }) => (
                  <TextField
                    id="standard-textarea"
                    fullWidth
                    label="Event type name"
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

              <div className="w-full flex justify-end mt-8">
                <Button variant="contained" color="primary" type="submit">
                  {Object.keys(eventTypeData).length > 0 ? "Edit" : "Create"}
                </Button>
              </div>
            </Form>
          )}
        />
      </div>
    </div>
  );
};

export default CreateEventTypes;
