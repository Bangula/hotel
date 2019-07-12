import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <div
      className="navbar text-white z-50 absolute w-full "
      style={{ marginTop: "150px" }}
    >
      <nav className="w-full text-center" style={{ margin: "0 auto" }}>
        <NavLink
          className="mr-4 font-semibold border-b border-transparent hover:border-white pb-4 navlink-transition tracking-widest"
          to="/"
        >
          HOME
        </NavLink>
        <NavLink
          className="mr-4 font-semibold border-b border-transparent hover:border-white pb-4 navlink-transition tracking-widest"
          to="/booking"
        >
          BOOKING
        </NavLink>
        <NavLink
          className="mr-4 font-semibold border-b border-transparent hover:border-white pb-4 navlink-transition tracking-widest"
          to="/rooms"
        >
          ROOMS
        </NavLink>
        <NavLink
          className="mr-4 font-semibold border-b border-transparent hover:border-white pb-4 navlink-transition tracking-widest"
          to="/events"
        >
          EVENTS
        </NavLink>
        <NavLink
          className="mr-4 font-semibold border-b border-transparent hover:border-white pb-4 navlink-transition tracking-widest"
          to="/services"
        >
          SERVICES
        </NavLink>
        <NavLink
          className="mr-4 font-semibold border-b border-transparent hover:border-white pb-4 navlink-transition tracking-widest"
          to="/gallery"
        >
          GALLERY
        </NavLink>
        <NavLink
          className="mr-4 font-semibold border-b border-transparent hover:border-white pb-4 navlink-transition tracking-widest"
          to="/reviews"
        >
          REVIEWS
        </NavLink>
        <NavLink
          className="mr-4 font-semibold border-b border-transparent hover:border-white pb-4 navlink-transition tracking-widest"
          to="/contact-us"
        >
          CONTACT US
        </NavLink>
      </nav>
    </div>
  );
};
export default Navbar;
