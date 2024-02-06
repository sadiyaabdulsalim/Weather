import React from "react";
import CurrentLocation from "./currentLocation";
import "./App.css";
import SignUp from "./Pages/SignUp";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <React.Fragment>
      <div className="container">
        <Outlet/>
      </div>
    </React.Fragment>
  );
}

export default App;
