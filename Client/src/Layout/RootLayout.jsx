import React from "react";
import { Outlet } from "react-router-dom";
import "./RootLayout.css";

import Footer from "../Components/Footer";
import NavBar from "../components/NavBar";

const RootLayout = () => {
  return (
    <div className="root-layout">
      <NavBar />
      <main className="content">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default RootLayout;
