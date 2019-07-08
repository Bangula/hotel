import React from "react";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";

const ModalContent = ({ close }) => {
  return (
    <div className="p-8 text-center">
      <p>
        <Link to="/login" className="italic text-blue-600">
          Login
        </Link>{" "}
        or{" "}
        <Link className="italic text-blue-600" to="register">
          Register
        </Link>{" "}
        to be able to reserve room.
      </p>
      <div className="flex justify-end mt-8">
        <Button onClick={close} variant="contained" color="secondary">
          Close
        </Button>
      </div>
    </div>
  );
};

export default ModalContent;
