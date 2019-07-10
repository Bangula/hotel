import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import Review from "./Review";
import { getReviews, getPage, createReview } from "@endpoints/reviews";
import { getAllRooms } from "@endpoints/rooms";
import * as Yup from "yup";
import { Formik, Form } from "formik";
import {
  makeStyles,
  useTheme,
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
  Collapse,
  ListItemText,
  ListItemIcon,
  ListItem,
  List,
  TextField,
  Radio,
  FormControl,
  FormControlLabel,
  FormLabel,
  RadioGroup,
  Divider,
  InputLabel,
  Select,
  MenuItem
} from "@material-ui/core";
import RadioButtonUncheckedIcon from "@material-ui/icons/RadioButtonUnchecked";
import RadioButtonCheckedIcon from "@material-ui/icons/RadioButtonChecked";
import "@zendeskgarden/react-pagination/dist/styles.css";

import { ThemeProvider } from "@zendeskgarden/react-theming";
import { Pagination } from "@zendeskgarden/react-pagination";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
const useStyles = makeStyles(theme => ({
  progress: {
    position: "fixed",
    top: "50%",
    zIndex: "100",
    left: 0,
    right: 0,
    margin: "0 auto",
    transform: "translateY(-50%)"
  }
}));

const schema = Yup.object().shape({
  comment: Yup.string()
    .min(2, "Minimum 2 characters are required")
    .max(5000)
    .required("Comment is required"),

  hotel_rate: Yup.number()
    .min(0, "Minimum number of characters is 1")
    .max(5)
    .required("Hotel Rate is required"),
  room_rate: Yup.number()
    .min(0, "Minimum number of characters is 1")
    .max(5)
    .required("Room Rate is required"),
  accommodation_rate: Yup.number()
    .min(0, "Minimum number of characters is 1")
    .max(5)
    .required("Accomodation Rate is required"),

  room_id: Yup.string().required()
});

const Reviews = () => {
  const [reviews, setReviews] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [comment, setComment] = useState("");
  const [roomId, setRoomId] = useState("");
  const [rooms, setRooms] = useState(true);
  const [invalidRoomRate, setInvalidRoomRate] = useState("");
  const [invalidAccomodationRate, setInvalidAccomodationRate] = useState("");
  const [invalidRoom, setInvalidRoom] = useState("");
  const [invalidComment, setInvalidComment] = useState("");

  const [selectedHotelRate, setSelectedHotelRate] = React.useState("1"); //value for radio buttons
  const [selectedRoomRate, setSelectedRoomRate] = React.useState("1"); //value for radio buttons
  const [
    selectedAccomodationRate,
    setSelectedAccomodationRate
  ] = React.useState("1"); //value for radio buttons

  const [openList, setOpenList] = React.useState(false);

  function handleRadioHotelChange(event) {
    setSelectedHotelRate(event.target.value);
  }
  function handleRadioRoomChange(event) {
    setSelectedRoomRate(event.target.value);
  }
  function handleRadioAccomodationChange(event) {
    setSelectedAccomodationRate(event.target.value);
  }

  //Toggle list
  function handleClickList() {
    setOpenList(!openList);
  }

  const initialValues = {
    comment: comment,
    hotel_rate: selectedHotelRate,
    room_rate: selectedRoomRate,
    accommodation_rate: selectedAccomodationRate,
    room_id: roomId
  };

  const classes = useStyles();

  const getAllReviews = async () => {
    const { data, error } = await getReviews();
    if (data) {
      setReviews(data.data);
      setCurrentPage(data.data.meta.pagination.current_page);

      console.log(data.data.meta.pagination);
      setTotalPages(data.data.meta.pagination.total_pages);
    }
  };

  const getCurrentPage = async (pageNum, currentPage) => {
    const { data, error } = await getPage(pageNum);
    if (data) {
      setReviews(data.data);
    }
  };
  const createSingleReview = async credentials => {
    const { data, error } = await createReview(credentials);
    if (data) {
      console.log("review created", data.data);
      getAllReviews();
    } else if (error) {
      console.log("review erro", error.response);
    }
  };
  const getRooms = async (page = 1) => {
    const { data, error } = await getAllRooms(page);
    if (data) {
      console.log("rooms fetch", data.data);
      setRooms(data.data.data);
    } else if (error) {
      console.log("Rooms err", error.response);
    }
  };

  useEffect(() => {
    document.title = "Quantox Hotel - Reviews";
    getAllReviews();
    getRooms();
  }, []);

  useEffect(() => {
    getCurrentPage(currentPage);
    window.scrollTo(0, 0); // scroll to top after selecting page
  }, [currentPage]);

  return (
    <>
      <div className="header-image" />

      <h1 className="home-header text-center text-5xl text-gray-600 z-50">
        <i className="fas fa-comments" />
        <br />
        Reviews
      </h1>
      <div className="container mx-auto text-center mt-16 ">
        <List
          component="nav"
          aria-labelledby="nested-list-subheader"
          className="bg-gray-400 mb-4 "
        >
          <ListItem button onClick={handleClickList} className="p-6">
            <ListItemIcon>{/* icon  */}</ListItemIcon>
            <ListItemText primary="Give us new comment" />
            {openList ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={openList} timeout="auto" unmountOnExit>
            <List component="div">
              <Formik
                enableReinitialize
                onSubmit={(values, actions) => {
                  console.log("Create review", values);
                  createSingleReview(values);
                  actions.resetForm();
                }}
                initialValues={initialValues}
                validationSchema={schema}
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
                  if (values.comment !== "") {
                    setComment(values.comment);
                  }
                  if (values.room_id !== "") {
                    setRoomId(values.room_id);
                  }
                  return (
                    <Form className="p-8">
                      <TextField
                        margin="normal"
                        type="text"
                        fullWidth
                        label="Give us some feedback with honest comment"
                        name="comment"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.comment}
                        error={
                          (errors.comment && touched.comment) || invalidComment
                            ? true
                            : false
                        }
                      />
                      {(errors.comment && touched.comment) || invalidComment ? (
                        <span className="text-danger">
                          {errors.comment || invalidComment}
                        </span>
                      ) : null}

                      <FormControl className="w-full ">
                        <InputLabel htmlFor="age-simple">
                          Select Room{" "}
                        </InputLabel>
                        <Select
                          className="mb-8"
                          value={values.room_id}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          inputProps={{
                            name: "room_id",
                            id: "age-simple"
                          }}
                          error={
                            (errors.room_id && touched.room_id) || invalidRoom
                              ? true
                              : false
                          }
                        >
                          {rooms.length
                            ? rooms.map(room => {
                                return (
                                  <MenuItem value={room.id} key={room.id}>
                                    {room.room_number}
                                  </MenuItem>
                                );
                              })
                            : null}
                        </Select>
                        {(errors.room_id && touched.room_id) || invalidRoom ? (
                          <span className="text-danger">
                            {errors.room_id || invalidRoom}
                          </span>
                        ) : null}{" "}
                      </FormControl>

                      <div className="flex flex-col  w-2/4 mx-auto  my-6">
                        <FormControl component="fieldset">
                          <FormLabel component="legend">
                            Rate Hotel Experience
                          </FormLabel>
                          <RadioGroup
                            className="flex justify-between pt-4"
                            aria-label="position"
                            name="position"
                            value={values.hotel_rate}
                            onChange={handleRadioHotelChange}
                            row
                          >
                            <FormControlLabel
                              value="1"
                              control={<Radio color="primary" />}
                              label="1"
                              labelPlacement="end"
                            />
                            <FormControlLabel
                              value="2"
                              control={<Radio color="primary" />}
                              label="2"
                              labelPlacement="end"
                            />
                            <FormControlLabel
                              value="3"
                              control={<Radio color="primary" />}
                              label="3"
                              labelPlacement="end"
                            />
                            <FormControlLabel
                              value="4"
                              control={<Radio color="primary" />}
                              label="4"
                              labelPlacement="end"
                            />
                            <FormControlLabel
                              value="5"
                              control={<Radio color="primary" />}
                              label="5"
                              labelPlacement="end"
                            />
                          </RadioGroup>
                        </FormControl>
                        <Divider style={{ marginBottom: "15px" }} />
                        {/* END RATE HOTEL EXP */}
                        <FormControl component="fieldset">
                          <FormLabel component="legend">
                            Rate Room Experience
                          </FormLabel>
                          <RadioGroup
                            className="flex justify-between pt-4"
                            aria-label="position"
                            name="position"
                            value={values.room_rate}
                            onChange={handleRadioRoomChange}
                            row
                          >
                            <FormControlLabel
                              value="1"
                              control={<Radio color="primary" />}
                              label="1"
                              labelPlacement="end"
                            />
                            <FormControlLabel
                              value="2"
                              control={<Radio color="primary" />}
                              label="2"
                              labelPlacement="end"
                            />
                            <FormControlLabel
                              value="3"
                              control={<Radio color="primary" />}
                              label="3"
                              labelPlacement="end"
                            />
                            <FormControlLabel
                              value="4"
                              control={<Radio color="primary" />}
                              label="4"
                              labelPlacement="end"
                            />
                            <FormControlLabel
                              value="5"
                              control={<Radio color="primary" />}
                              label="5"
                              labelPlacement="end"
                            />
                          </RadioGroup>
                        </FormControl>
                        <Divider style={{ marginBottom: "15px" }} />
                        {/* END RATE ROOM EXP */}
                        <FormControl component="fieldset">
                          <FormLabel className="mt-6" component="legend">
                            Rate Accomodation Experience
                          </FormLabel>
                          <RadioGroup
                            className="flex justify-between pt-4"
                            aria-label="position"
                            name="position"
                            value={values.accommodation_rate}
                            onChange={handleRadioAccomodationChange}
                            row
                          >
                            <FormControlLabel
                              value="1"
                              control={<Radio color="primary" />}
                              label="1"
                              labelPlacement="end"
                            />
                            <FormControlLabel
                              value="2"
                              control={<Radio color="primary" />}
                              label="2"
                              labelPlacement="end"
                            />
                            <FormControlLabel
                              value="3"
                              control={<Radio color="primary" />}
                              label="3"
                              labelPlacement="end"
                            />
                            <FormControlLabel
                              value="4"
                              control={<Radio color="primary" />}
                              label="4"
                              labelPlacement="end"
                            />
                            <FormControlLabel
                              value="5"
                              control={<Radio color="primary" />}
                              label="5"
                              labelPlacement="end"
                            />
                          </RadioGroup>
                        </FormControl>{" "}
                        <Divider />
                      </div>

                      <Button
                        type="submit"
                        //fullWidth
                        variant="contained"
                        color="primary"
                        margin="normal"
                        style={{ marginBottom: "15px" }}
                      >
                        Submit
                      </Button>
                    </Form>
                  );
                }}
              </Formik>
            </List>
          </Collapse>
        </List>

        {Object.keys(reviews).length ? (
          reviews.data.map(data => {
            return <Review {...data} key={data.id} />;
          })
        ) : (
          <CircularProgress />
        )}
      </div>

      {Object.keys(reviews).length ? (
        <ThemeProvider>
          <Pagination
            totalPages={totalPages}
            currentPage={currentPage}
            onChange={currentPage => setCurrentPage(currentPage)}
          />
        </ThemeProvider>
      ) : null}
      <div className="h-32 w-full" />
    </>
  );
};

export default Reviews;
