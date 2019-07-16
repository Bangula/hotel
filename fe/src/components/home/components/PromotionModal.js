import React, { useState } from "react";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import Typography from "@material-ui/core/Typography";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";

import { useSelector, useDispatch } from "react-redux";

import DateFnsUtils from "@date-io/date-fns";
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";

import { getPromotionById } from "../../../services/http/endpoints/promotions";

const PromotionModal = ({ handleCloseModal, modalIsOpen, modalId, Alert }) => {
  const [promoDetails, setPromoDetails] = React.useState({});
  const [state, setState] = React.useState({
    checkIn: new Date(),
    checkOut: new Date()
  });
  const [adultNum, setAdultNum] = useState("");
  const [childrenNum, setChildrenNum] = useState("");

  React.useEffect(() => {
    getData();
  }, []);

  const dispatch = useDispatch();

  const handleSubmit = e => {
    let promotion = {};
    promotion.id = promoDetails.id;
    promotion.started_at = state.checkIn;
    promotion.ended_at = state.checkOut;
    promotion.count = "1";
    promotion.adults = adultNum;
    promotion.children = childrenNum;
    dispatch({
      type: "ADD_PROMOTION",
      payload: promotion
    });
    Alert.success(<i className="fas fa-check" />, {
      effect: "slide",
      timeout: 2000
    });
    handleCloseModal();
  };

  async function getData() {
    const { data, error } = await getPromotionById(modalId);
    if (data) {
      setPromoDetails(data.data.data);
      console.log(data);
    } else if (error) {
      console.log(error);
    }
  }

  return (
    <div>
      {promoDetails.active === 1 ? (
        <Dialog
          onClose={handleCloseModal}
          aria-labelledby="customized-dialog-title"
          open={modalIsOpen}
        >
          <div style={{ padding: "20px" }}>
            <DialogTitle id="form-dialog-title">
              {promoDetails.name}
            </DialogTitle>

            <Typography gutterBottom>{promoDetails.description}</Typography>
          </div>
          <div className="px-4 md:px-0">
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <div className="flex flex-col md:flex-row justify-around">
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
              </div>
            </MuiPickersUtilsProvider>
          </div>
          <div className="mt-6">
            <p className="italic text-gray-600 pl-4">Guests number:</p>
            <div className="flex flex-col md:flex-row justify-around px-4 md:px-0">
              <TextField
                id="standard-name"
                label="Adults"
                type="number"
                value={adultNum}
                onChange={e => setAdultNum(e.target.value)}
              />
              <TextField
                id="standard-name"
                label="Chldren"
                type="number"
                value={childrenNum}
                onChange={e => setChildrenNum(e.target.value)}
              />
            </div>
          </div>
          <div className="mt-8 p-8">
            <Button
              onClick={handleCloseModal}
              color="secondary"
              variant="contained"
              style={{ marginRight: "10px" }}
            >
              Close
            </Button>
            <Button onClick={handleSubmit} color="primary" variant="contained">
              Add to cart
            </Button>
          </div>
        </Dialog>
      ) : null}
    </div>
  );
};

export default PromotionModal;
