import React, { useContext, useRef } from "react";
import { Link } from "react-router-dom";
import AccountContext from "../Context";
import logo from "../logo.png";
import ConnectedBar from "./ConnectedBar";
export const NavBar = () => {
  const [account, _] = useContext(AccountContext);
  const navItems = useRef(null);
  const toggleItems = () => {
    if (navItems.current.classList.contains("show-nav-items"))
      navItems.current.classList.remove("show-nav-items");
    else navItems.current.classList.add("show-nav-items");
  };
  return (
    <div className='mg-1'>
      <div className="navbar">
        <div className="logo">
          <img alt="logo" className="img-logo" src={logo}></img>
          <Link to="/" className="txt-logo">
            RIF QR Payment
          </Link>
        </div>
        <a href="#" className="hamburger-menu" onClick={toggleItems}>
          <i className="fa fa-bars"></i>
        </a>
        <div ref={navItems} className="nav-items ">
          <Link className="nav-item" to="/create">
            Generate a QR Code
          </Link>
          <Link className="nav-item" to="/scan">
            Scan a QR Code
          </Link>
        </div>
      </div>
      {account ? <ConnectedBar></ConnectedBar> : ""}
    </div>
  );
};
