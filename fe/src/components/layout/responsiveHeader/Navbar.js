import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { NavLink, Link } from "react-router-dom";
import Logo from "@assets/images/logo.png";
import { useSelector, useDispatch } from "react-redux";

const Navbar = ({ menuIsActive, setMenuIsActive }) => {
  const isAdmin = useSelector(state => state.user.isAdmin);
  const isAuthenticated = useSelector(state => state.user.isAuthenticated);
  const dispatch = useDispatch();
  let menuPosition;
  let menuBackground;
  if (menuIsActive) {
    menuPosition = "0px";
    menuBackground = "0px";
  } else {
    menuPosition = "-100%";

    menuBackground = "-100%";
  }
  const handleLogout = () => {
    setMenuIsActive();
    dispatch({ type: "LOGOUT_USER" });
  };
  return (
    <>
      <div
        className="h-screen lg:hidden left-0 fixed p-4 top-0  w-full "
        style={{
          transition: "all 0s",
          left: menuPosition,
          zIndex: "190",
          background: "rgba(0,0,0,0.6)"
        }}
        onClick={setMenuIsActive}
      />
      <div
        className="h-screen lg:hidden bg-gray-800 left-0 fixed p-4 top-0  w-2/3 sm:w-1/2 md:w-1/3"
        style={{ transition: "all 0.5s", left: menuPosition, zIndex: "200" }}
      >
        <div className="flex justify-between text-white text-2xl">
          <Link onClick={setMenuIsActive} to="/user">
            <i className="fas fa-user mr-4" />
          </Link>
          <div className="self-center">
            <img
              src={Logo}
              alt="quantox logo"
              className=""
              style={{
                margin: "0 auto",
                width: "50%"
              }}
            />
          </div>
          <button onClick={setMenuIsActive}>
            <i className="fas fa-chevron-left" />
          </button>
        </div>
        <nav className="w-full text-gray-200" style={{ margin: "0 auto" }}>
          <div className="flex flex-col mt-4">
            <NavLink
              onClick={setMenuIsActive}
              className="w-full mr-4 font-semibold border-b border-white hover:border-white py-4 navlink-transition tracking-widest"
              to="/"
            >
              HOME
            </NavLink>
            <NavLink
              onClick={setMenuIsActive}
              className="w-full mr-4 font-semibold border-b border-white hover:border-white py-4 navlink-transition tracking-widest"
              to="/booking"
            >
              BOOKING
            </NavLink>
            {/* <NavLink
              onClick={setMenuIsActive}
              className="w-full mr-4 font-semibold border-b border-white hover:border-white py-4 navlink-transition tracking-widest"
              to="/rooms"
            >
              ROOMS
            </NavLink> */}
            <NavLink
              onClick={setMenuIsActive}
              className="w-full mr-4 font-semibold border-b border-white hover:border-white py-4 navlink-transition tracking-widest"
              to="/events"
            >
              EVENTS
            </NavLink>
            <NavLink
              onClick={setMenuIsActive}
              className="w-full mr-4 font-semibold border-b border-white hover:border-white py-4 navlink-transition tracking-widest"
              to="/services"
            >
              SERVICES
            </NavLink>
            <NavLink
              onClick={setMenuIsActive}
              className="w-full mr-4 font-semibold border-b border-white hover:border-white py-4 navlink-transition tracking-widest"
              to="/gallery"
            >
              GALLERY
            </NavLink>
            <NavLink
              onClick={setMenuIsActive}
              className="w-full mr-4 font-semibold border-b border-white hover:border-white py-4 navlink-transition tracking-widest"
              to="/reviews"
            >
              REVIEWS
            </NavLink>

            <NavLink
              onClick={setMenuIsActive}
              className="w-full mr-4 font-semibold border-b border-white hover:border-white py-4 navlink-transition tracking-widest"
              to="/contact-us"
            >
              CONTACT US
            </NavLink>
            {isAuthenticated ? (
              <>
                <NavLink
                  onClick={handleLogout}
                  className="w-full mr-4 font-semibold border-b border-white hover:border-white py-4 navlink-transition tracking-widest"
                  to="/"
                >
                  LOGOUT
                </NavLink>
                {isAdmin ? (
                  <NavLink
                    onClick={setMenuIsActive}
                    className="w-full mr-4 font-semibold border-b border-white hover:border-white py-4 navlink-transition tracking-widest"
                    to="/admin"
                  >
                    ADMIN PANEL
                  </NavLink>
                ) : null}
              </>
            ) : (
              <>
                <NavLink
                  onClick={setMenuIsActive}
                  className="w-full mr-4 font-semibold border-b border-white hover:border-white py-4 navlink-transition tracking-widest"
                  to="/login"
                >
                  LOGIN
                </NavLink>
                <NavLink
                  onClick={setMenuIsActive}
                  className="w-full mr-4 font-semibold border-b border-white hover:border-white py-4 navlink-transition tracking-widest"
                  to="/register"
                >
                  REGISTER
                </NavLink>
              </>
            )}
          </div>
        </nav>
      </div>
    </>
  );
};
export default Navbar;
