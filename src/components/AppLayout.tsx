import React from "react";
import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";

const AppLayout: React.FC = () => (
  <>
    <Navbar />
    <Outlet />
  </>
);

export default AppLayout;
