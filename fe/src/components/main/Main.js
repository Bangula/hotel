import React from "react";
import { Route, Switch } from "react-router-dom";

// components
import Header from "@components/layout/header/Header";
import Room from "@components/rooms/components/Room";
import Home from "@components/home/Home";
import Booking from "@components/booking/Booking";
import Events from "@components/events/Events";
import Services from "@components/services/Services";
import Gallery from "@components/gallery/Gallery";
import Reviews from "@components/reviews/Reviews";
import ContactUs from "@components/contactUs/ContactUs";
import Login from "@components/login/Login";
import Register from "@components/register/Register";
import Cart from "@components/cart/Cart";

import UserProfile from "@components/user/UserProfile";
import Footer from "../layout/footer/Footer";

const Main = () => {
  return (
    <>
      <Header />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/booking" component={Booking} />
        <Route path="/room" component={Room} />
        <Route path="/events" component={Events} />
        <Route path="/services" component={Services} />
        <Route path="/gallery" component={Gallery} />
        <Route path="/reviews" component={Reviews} />
        <Route path="/contact-us" component={ContactUs} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/cart" component={Cart} />
        <Route path="/user" component={UserProfile} />
      </Switch>
      <Footer />
    </>
  );
};

export default Main;
