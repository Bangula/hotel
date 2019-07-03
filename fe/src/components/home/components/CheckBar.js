import React from "react";
import Button from "@material-ui/core/Button";
import DateFnsUtils from "@date-io/date-fns";
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";

const CheckBar = () => {
  const [state, setState] = React.useState({
    checkIn: new Date(),
    checkOut: new Date()
  });
  const handleSubmit = e => {
    e.preventDefault();
    console.log(state);
  };

  return (
    <div
      className="bg-white absolute shadow-lg p-8  w-2/3 text-center"
      style={{
        height: "100px",
        bottom: "-70px",
        zIndex: "100",
        left: "10px",
        right: "10px",
        margin: "0 auto"
      }}
    >
      <form onSubmit={handleSubmit}>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <div className="flex justify-around">
            <DatePicker
              value={state.checkIn}
              label="Check In"
              onChange={value => setState({ ...state, checkIn: value })}
            />
            <DatePicker
              value={state.checkOut}
              label="Check Out"
              onChange={value => setState({ ...state, checkOut: value })}
            />
            <Button type="submit" variant="contained">
              Search
            </Button>
          </div>
        </MuiPickersUtilsProvider>
      </form>
    </div>
  );
};

export default CheckBar;
