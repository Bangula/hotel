import React from "react";
import "./assets/styles/main.scss";
import { Router, Switch, Route } from "react-router-dom";
import history from "@helpers/history";
// Components
import Admin from "@components/admin/Admin";
import Main from "@components/main/Main";

function App() {
  const [showScrollToTop, setShowScrollToTop] = React.useState(false);
  React.useEffect(() => {
    window.addEventListener("scroll", handleScroll);
  }, []);
  function handleScroll() {
    if (window.scrollY > 200) setShowScrollToTop(true);
    else if (window.scrollY < 200) setShowScrollToTop(false);
  }
  return (
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
        <i className="fas fa-chevron-circle-up" style={{ color: "#1975D2" }} />
      </button>

      <div>
        <Router history={history}>
          <Switch>
            <Route path="/admin" component={Admin} />
            <Route path="/" component={Main} />
          </Switch>
        </Router>
      </div>
    </div>
  );
}

export default App;
