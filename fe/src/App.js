import React from "react";
import "./assets/styles/main.scss";
import { BrowserRouter, Switch, Route } from "react-router-dom";

// Components
import Header from "@components/layout/header/Header";
import Rooms from "@components/rooms/Rooms";
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

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/booking" component={Booking} />
          <Route path="/rooms" component={Rooms} />
          <Route path="/events" component={Events} />
          <Route path="/services" component={Services} />
          <Route path="/gallery" component={Gallery} />
          <Route path="/reviews" component={Reviews} />
          <Route path="/contact-us" component={ContactUs} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/cart" component={Cart} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
