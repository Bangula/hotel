import React from "react";
import Logo from "@assets/images/logo.png";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import IconButton from "@material-ui/core/IconButton";
import Badge from "@material-ui/core/Badge";
import { withStyles } from "@material-ui/core/styles";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";

const StyledBadge = withStyles(theme => ({
  badge: {
    top: "50%",
    right: -3,
    // The border color match the background color.
    border: `2px solid ${
      theme.palette.type === "light"
        ? theme.palette.grey[200]
        : theme.palette.grey[900]
    }`
  }
}))(Badge);

const TopHeader = () => {
  const user = useSelector(state => state.user);

  const promotions = useSelector(state => state.cart.promotions);
  const rooms = useSelector(state => state.cart.rooms);

  const dispatch = useDispatch();

  let cartItems = promotions.length + rooms.length;

  return (
    <div className="pt-16 bg-blue w-full flex absolute t-0 left-0 z-50 px-8 ">
      <div className="text-white w-1/4 text-left">
        <p>
          <i className="mr-2 fas fa-phone-alt" />
          +31 (0) 20 507 0000
        </p>
        <div className="text-left mt-4">
          <a href="/" className="mr-4">
            <i className="fab fa-facebook-square" />
          </a>
          <a href="/" className="mr-4">
            <i className="fab fa-linkedin" />
          </a>
          <a href="/" className="mr-4">
            <i className="fab fa-twitter-square" />
          </a>
          <a href="/">
            <i className="fab fa-instagram" />
          </a>
        </div>
      </div>
      <div className="w-2/4 text-center">
        <img
          src={Logo}
          alt="quantox logo"
          className=""
          style={{
            margin: "0 auto"
          }}
        />
      </div>
      <div className="text-white w-1/4 text-right">
        {user.isAuthenticated ? (
          <div>
            <div>
              <button
                className="font-semibold  hover:text-gray-300 mr-2"
                onClick={() => dispatch({ type: "LOGOUT_USER" })}
              >
                LOGOUT
              </button>
              <Link to="/user">
                <i className="fas fa-user mx-4 " />
              </Link>
              <NavLink
                className="font-semibold  hover:text-gray-300"
                to="/cart"
              >
                <IconButton
                  aria-label="Cart"
                  className="text-white"
                  style={{ color: "#fff" }}
                >
                  <StyledBadge badgeContent={cartItems} color="primary">
                    <ShoppingCartIcon />
                  </StyledBadge>
                </IconButton>
              </NavLink>
            </div>
          </div>
        ) : (
          <>
            <NavLink
              className="mr-4 font-semibold  hover:text-gray-300"
              to="/login"
            >
              LOGIN
            </NavLink>
            <NavLink
              className="font-semibold  hover:text-gray-300 mr-4"
              to="/register"
            >
              REGISTER
            </NavLink>
            <NavLink className="font-semibold  hover:text-gray-300" to="/cart">
              <IconButton
                aria-label="Cart"
                className="text-white"
                style={{ color: "#fff" }}
              >
                <StyledBadge badgeContent={cartItems} color="primary">
                  <ShoppingCartIcon />
                </StyledBadge>
              </IconButton>
            </NavLink>
          </>
        )}
      </div>
    </div>
  );
};

export default TopHeader;
