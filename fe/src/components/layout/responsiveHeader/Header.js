import React from "react";
import Button from "@material-ui/core/Button";
import MenuIcon from "@material-ui/icons/Menu";
import Logo from "@assets/images/logo.png";
import IconButton from "@material-ui/core/IconButton";
import Badge from "@material-ui/core/Badge";
import { withStyles } from "@material-ui/core/styles";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

// Components
import Navbar from "./Navbar";

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

const Header = () => {
  const [menuIsActive, setMenuIsActive] = React.useState(false);
  const promotions = useSelector(state => state.cart.promotions);
  const rooms = useSelector(state => state.cart.rooms);

  const dispatch = useDispatch();

  let cartItems = promotions.length + rooms.length;

  return (
    <>
      <div
        className="flex justify-between md:hidden absolute top-0 left-0"
        style={{ zIndex: "150" }}
      >
        <div className="self-center">
          <Button onClick={() => setMenuIsActive(true)}>
            <MenuIcon style={{ color: "#fff", fontSize: "3rem" }} />
          </Button>
        </div>
        <div className="text-center self-center">
          <img
            src={Logo}
            alt="quantox logo"
            className=""
            style={{
              margin: "0 auto",
              width: "60%"
            }}
          />
        </div>
        <div>
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
        </div>
      </div>
      <Navbar
        menuIsActive={menuIsActive}
        setMenuIsActive={() => setMenuIsActive(false)}
      />
    </>
  );
};

export default Header;
