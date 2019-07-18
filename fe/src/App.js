import React from "react";
import "./assets/styles/main.scss";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import history from "@helpers/history";
import { useSelector } from "react-redux";
import { WidthContext } from "./components/common/context/ContextProvider";

// Components
import Admin from "@components/admin/Admin";
import Main from "@components/main/Main";

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
          <Switch>
            <Route path="/admin" component={Admin} />
            <Route path="/" component={Main} />
          </Switch>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
