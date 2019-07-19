import React from "react";
import DateFnsUtils from "@date-io/date-fns";
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import { Link } from "react-router-dom";

import { WidthContext } from "@components/common/context/ContextProvider";

const CheckBar = () => {
  const [state, setState] = React.useState({
    checkIn: new Date(),
    checkOut: new Date()
  });
  const { windowWidth } = React.useContext(WidthContext);
  const handleSubmit = e => {
    e.preventDefault();
    console.log(state);
  };
  return (
    <div
      className="bg-white absolute shadow-lg py-6 w-11/12 md:block md:w-2/3 text-center"
      style={{
        height: windowWidth < 768 ? "auto" : "100px",
        bottom: "-70px",
        zIndex: "100",
        left: "10px",
        right: "10px",
        margin: "0 auto"
      }}
    >
      <form className="" onSubmit={handleSubmit}>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <div className="md:flex justify-around px-4">
            <DatePicker
              value={state.checkIn}
              fullWidth={windowWidth < 768 ? true : false}
              label="Check In"
              onChange={value => setState({ ...state, checkIn: value })}
            />
            <DatePicker
              value={state.checkOut}
              fullWidth={windowWidth < 768 ? true : false}
              label="Check Out"
              onChange={value => setState({ ...state, checkOut: value })}
              style={{
                marginBottom: windowWidth < 768 ? "40px" : "",
                marginTop: windowWidth < 768 ? "20px" : ""
              }}
            />
            {windowWidth < 768 ? <br /> : null}
            <Link
              to={{
                pathname: "/booking",
                state
              }}
              className="self-center px-4 py-2 border border-gray-400 rounded-lg"
              style={{
                lineHeight: "18px"
              }}
            >
              SEARCH
            </Link>
          </div>
        </MuiPickersUtilsProvider>
      </form>
    </div>
  );
};

export default CheckBar;
