import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <div
      className="navbar text-white z-50 absolute w-full"
      style={{ marginTop: "150px" }}
    >
      <nav className="w-full text-center" style={{ margin: "0 auto" }}>
        <NavLink className="mr-4 font-semibold h-color-grey" to="/">
          HOME
        </NavLink>
        <NavLink className="mr-4 font-semibold" to="/">
          BOOKING
        </NavLink>
        <NavLink className="mr-4 font-semibold" to="/">
          EVENTS
        </NavLink>
        <NavLink className="mr-4 font-semibold" to="/">
          SERVICES
        </NavLink>
        <NavLink className="mr-4 font-semibold" to="/">
          GALLERY
        </NavLink>
        <NavLink className="mr-4 font-semibold" to="/">
          REVIEWS
        </NavLink>
        <NavLink className="mr-4 font-semibold" to="/">
          CONTACT US
        </NavLink>
        <NavLink className="mr-4 font-semibold" to="/">
          LOGIN
        </NavLink>
        <NavLink className="font-semibold" to="/">
          REGISTER
        </NavLink>
      </nav>
    </div>
  );
};
export default Navbar;
