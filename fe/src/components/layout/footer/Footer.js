import React from "react";

import { subscribeUser } from "../../../services/http/endpoints/subscribe";
import Alert from "react-s-alert";

import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import ArrowForward from "@material-ui/icons/ArrowForward";

import { Field, Formik, ErrorMessage } from "formik";
import * as Yup from "yup";

import Logo from "@assets/images/logo.png";

const useStyles = makeStyles({
  root: {
    padding: "2px 4px",
    display: "flex",
    alignItems: "center"
  },
  input: {
    marginLeft: 8,
    flex: 1
  },
  iconButton: {
    padding: 10
  },
  divider: {
    width: 1,
    height: 28,
    margin: 4
  }
});

const Footer = () => {
  const [email, setEmail] = React.useState("");

  const classes = useStyles();

  const Schema = Yup.object().shape({
    name: Yup.string()
      .email("Must be valid email.")
      .required("Name is required")
  });

  const initialValues = {
    email: ""
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const { data, error } = await subscribeUser({ email });
    console.log(email);

    if (data) {
      console.log(data);
      Alert.success(<i className="fas fa-check" />, {
        effect: "slide",
        timeout: 2000
      });
      setEmail("");
    } else if (error) {
      console.log(error.response);
    }
  };
  return (
    <div className="footer absolute w-full py-8">
      <div className="container mx-auto pb-8">
        <div className="flex flex-wrap">
          <div className="weather md:w-3/12 px-2">
            <img
              src={Logo}
              alt="quantox logo"
              className=""
              style={{
                width: "200px"
              }}
            />
            <p className="text-sm text-gray-400 pt-4">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Praesentium fugit veritatis sint blanditiis unde voluptatibus
              quaerat voluptates nobis ab ullam dolore itaque, vero
              exercitationem sunt? Voluptates placeat quod laboriosam officia.
            </p>
          </div>

          <div className=" md:w-3/12 px-2">
            <h1 className="text-gray-200 text-xl italic">Gallery</h1>
          </div>

          <div className="socialIcons  md:w-3/12 px-2">
            <h1 className="text-gray-200 text-xl italic">Contact Us</h1>
            <p className="text-sm text-gray-400 pt-4">
              Kraljevackog Bataljona bb
            </p>
            <p className="text-sm text-gray-400">34 000 Kragujevac, Serbia</p>
            <p className="text-sm text-gray-400 mt-2">Tel.: +1 998 150 3020</p>
            <p className="text-sm text-gray-400 ">Tel.: +1 998 150 3020</p>
            <p className="text-sm text-gray-400 mt-2">quantox@contact.com</p>
          </div>
          <div className="subscribe  md:w-3/12 text-left px-2">
            <h1 className="text-gray-200 text-xl italic">Say in touch</h1>
            <br />
            <form onSubmit={handleSubmit}>
              <Paper className={classes.root}>
                <InputBase
                  className={classes.input}
                  value={email}
                  placeholder="Your Email"
                  inputProps={{ "aria-label": "Search Google Maps" }}
                  onChange={e => setEmail(e.target.value)}
                />

                <Divider className={classes.divider} />
                <IconButton
                  color="primary"
                  className={classes.iconButton}
                  aria-label="Directions"
                  type="submit"
                >
                  <ArrowForward />
                </IconButton>
              </Paper>
            </form>

            <br />

            <div className="py-4 flex mt-2">
              <a
                href="#"
                className="mr-4 text-white text-xl hover:text-gray-600"
              >
                <i className="fab fa-facebook-square" />
              </a>
              <a
                href="#"
                className="mr-4 text-white text-xl hover:text-gray-600"
              >
                <i className="fab fa-linkedin" />
              </a>
              <a
                href="#"
                className="mr-4 text-white text-xl hover:text-gray-600"
              >
                <i className="fab fa-twitter-square" />
              </a>
              <a
                href="#"
                className="mr-4 text-white text-xl hover:text-gray-600"
              >
                <i className="fab fa-instagram" />
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="container mx-auto copyright border-t border-gray-400">
        <p className="text-sm text-gray-400 pt-8">
          Copyright © 2019 Quantox Hotel
        </p>
      </div>
      <Alert />
    </div>
  );
};

export default Footer;

{
  /* <InputBase
className={classes.input}
value={email}
placeholder="Your Email"
inputProps={{ "aria-label": "Search Google Maps" }}
onChange={e => setEmail(e.target.value)}
/> */
}
