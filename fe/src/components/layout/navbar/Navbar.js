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
        <NavLink
          className="mr-4 font-semibold border-b border-transparent hover:border-white pb-4 navlink-transition tracking-widest"
          to="/"
        >
          HOME
        </NavLink>
        <NavLink
          className="mr-4 font-semibold border-b border-transparent hover:border-white pb-4 navlink-transition tracking-widest"
          to="/"
        >
          BOOKING
        </NavLink>
        <NavLink
          className="mr-4 font-semibold border-b border-transparent hover:border-white pb-4 navlink-transition tracking-widest"
          to="/"
        >
          ROOMS
        </NavLink>
        <NavLink
          className="mr-4 font-semibold border-b border-transparent hover:border-white pb-4 navlink-transition tracking-widest"
          to="/"
        >
          EVENTS
        </NavLink>
        <NavLink
          className="mr-4 font-semibold border-b border-transparent hover:border-white pb-4 navlink-transition tracking-widest"
          to="/"
        >
          SERVICES
        </NavLink>
        <NavLink
          className="mr-4 font-semibold border-b border-transparent hover:border-white pb-4 navlink-transition tracking-widest"
          to="/"
        >
          GALLERY
        </NavLink>
        <NavLink
          className="mr-4 font-semibold border-b border-transparent hover:border-white pb-4 navlink-transition tracking-widest"
          to="/"
        >
          REVIEWS
        </NavLink>
        <NavLink
          className="mr-4 font-semibold border-b border-transparent hover:border-white pb-4 navlink-transition tracking-widest"
          to="/"
        >
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
