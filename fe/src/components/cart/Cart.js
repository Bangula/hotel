import React from "react";
import { useSelector, useDispatch } from "react-redux";

const Cart = () => {
  const promotions = useSelector(state => state.cart.promotions);
  const rooms = useSelector(state => state.cart.rooms);
  const cartItems = promotions.concat(rooms);
  console.log(cartItems);
  return (
    <>
      <div className="header-image" />
      <h1 className="home-header text-center text-5xl text-gray-600 z-50">
        <i className="fas fa-shopping-cart text-2xl" />
        <br />
        Cart
      </h1>

      <div />
    </>
  );
};

export default Cart;
