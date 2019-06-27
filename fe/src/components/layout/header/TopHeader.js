import React from "react";
import Logo from "@assets/images/logo.png";

const TopHeader = () => {
  return (
    <div className="pt-16 bg-blue w-full flex absolute t-0 left-0 z-50 px-8">
      <div className="text-white w-1/4 text-left">
        <p>
          <i className="mr-2 fas fa-phone-alt" />
          +31 (0) 20 507 0000
        </p>
      </div>
      <div className="w-2/4 text-center">
        <img
          src={Logo}
          alt="quantox logo"
          className=""
          style={{
            margin: "0 auto"
          }}
        />
      </div>
      <div className="text-white w-1/4 text-right">
        <a href="#" className="mr-4">
          <i className="fab fa-facebook-square" />
        </a>
        <a href="#" className="mr-4">
          <i className="fab fa-linkedin" />
        </a>
        <a href="#" className="mr-4">
          <i className="fab fa-twitter-square" />
        </a>
        <a href="#">
          <i className="fab fa-instagram" />
        </a>
      </div>
    </div>
  );
};

export default TopHeader;
