import React from "react";
import "./assets/styles/main.scss";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import history from "@helpers/history";
import { useSelector } from "react-redux";
import { WidthContext } from "./components/common/context/ContextProvider";

// Components
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
import Admin from "@components/admin/Admin";

import UserProfile from "@components/user/UserProfile";
import Footer from "./components/layout/footer/Footer";

function App(props) {
  const [showScrollToTop, setShowScrollToTop] = React.useState(false);
  React.useEffect(() => {
    window.addEventListener("scroll", handleScroll);
  }, []);
  function handleScroll() {
    if (window.scrollY > 200) setShowScrollToTop(true);
    else if (window.scrollY < 200) setShowScrollToTop(false);
  }
  const hideLayout = useSelector(state => state.user.hideLayout);
  const { windowWidth } = React.useContext(WidthContext);

  return (
    <BrowserRouter history={history}>
      <div className="App">
        <button
          onClick={() =>
            window.scrollTo({
              top: 0,
              left: 0,
              behavior: "smooth"
            })
          }
          className={`${
            showScrollToTop ? "visible" : "invisible"
          } fixed text-3xl`}
          style={{
            bottom: "20px",
            right: "20px",
            zIndex: "300",
            transition: "all 0.3s"
          }}
        >
          <i
            className="fas fa-chevron-circle-up"
            style={{ color: "#1975D2" }}
          />
        </button>
        <div>
          {hideLayout ? null : <Header />}
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
            <Route path="/admin" component={Admin} />
          </Switch>
          {hideLayout ? null : <Footer />}
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
