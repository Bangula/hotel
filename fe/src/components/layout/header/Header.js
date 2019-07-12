import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

// Components
import Navbar from "../navbar/Navbar";
import TopHeader from "./TopHeader";

import RespHeader from "../responsiveHeader/Header";

const Header = () => {
  const isAdmin = useSelector(state => state.user.isAdmin);
  const isAuthenticated = useSelector(state => state.user.isAuthenticated);

  return (
    <>
      <div className="relative">
        {isAdmin && isAuthenticated ? (
          <div
            className="absolute  z-100 border border-gray-400 px-4 py-2 bg-white hidden md:block"
            style={{
              zIndex: "110",
              right: 0,
              top: 0,
              borderBottomLeftRadius: "10px",
              borderBottomLeftRadius: "10px"
            }}
          >
            <Link to="/admin" className="text-xs font-semibold">
              SHOW ADMIN PANEL
            </Link>
          </div>
        ) : null}
        <div className="hidden md:block">
          <TopHeader />
          <Navbar />
        </div>

        <RespHeader />
      </div>
    </>
  );
};

export default Header;
