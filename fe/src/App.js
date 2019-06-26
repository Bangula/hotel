import React from "react";
import "./assets/styles/main.scss";
import { BrowserRouter } from "react-router-dom";

// Components
import Header from "@components/layout/header/Header";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Header />
      </div>
    </BrowserRouter>
  );
}

export default App;
