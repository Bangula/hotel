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
          <Route exact path="/" component={Home} />
<<<<<<< HEAD
          <Route path="/rooms" component={Rooms} />
=======
          <Route exact path="/rooms" component={Rooms} />
>>>>>>> df89384b24de5a8aebed01bc7c0210154f47ae7e
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
