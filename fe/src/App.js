import React from "react";
import "./assets/styles/main.scss";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import history from "@helpers/history";

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
import Admin from "@components/admin/Admin";
import Dashboard from "@components/admin/Dashboard";
import UserProfile from "@components/user/UserProfile";

function App(props) {
  return (
    <BrowserRouter history={history}>
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
          <Route path="/admin" component={Admin} />

          <Route path="/user" component={UserProfile} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
