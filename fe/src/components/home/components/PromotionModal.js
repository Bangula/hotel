import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import Typography from "@material-ui/core/Typography";
import DialogTitle from "@material-ui/core/DialogTitle";

import DateFnsUtils from "@date-io/date-fns";
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";

import { getPromotionById } from "../../../services/http/endpoints/promotions";

const PromotionModal = ({ handleCloseModal, modalIsOpen, modalId }) => {
  const [promoDetails, setPromoDetails] = React.useState({});
  const [state, setState] = React.useState({
    checkIn: new Date(),
    checkOut: new Date()
  });

  React.useEffect(() => {
    getData();
  }, []);

  const handleSubmit = e => {
    let newObj = {};
    newObj.promotionId = promoDetails.id;
    newObj.checkIn = console.log(state);
    handleCloseModal();
  };

  async function getData() {
    const { data, error } = await getPromotionById(modalId);
    if (data) {
      setPromoDetails(data.data.data);
      console.log(data.data.data);
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
          <div>
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
              </div>
            </MuiPickersUtilsProvider>
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
