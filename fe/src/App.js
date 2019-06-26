import React from "react";
import "./assets/styles/main.scss";
import { BrowserRouter, Switch, Route } from "react-router-dom";

// Components
import Header from "@components/layout/header/Header";
import Rooms from "@components/rooms/Rooms";
import Home from "@components/home/Home";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <Switch>
          <Route to="/" component={Home} />
          <Route to="/rooms" component={Rooms} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
