import React from 'react';
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./Navbar.jsx";

function Layout() {
  const location = useLocation();
  
  const showNavbar = location.pathname !== "/Login_Signup";

  return (
    <>
      {showNavbar && <Navbar />}
      <Outlet />
    </>
  );
}

export default Layout;