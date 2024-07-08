import React from "react";
import Home from "./Pages/Home";
import Profile from "./Pages/Profile";
import { Outlet } from "react-router";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div>
      <ToastContainer />
      <Outlet />
    </div>
  );
}

export default App;
