import React, { useContext, useRef } from "react";
import { Link } from "react-router-dom";
import AccountContext from "../Context";
import logo from "../logo.png";
import ConnectedBar from "./ConnectedBar";
export const NavBar = () => {
  const [account] = useContext(AccountContext);
  const navItems = useRef(null);
  const toggleItems = () => {
    if (navItems.current.classList.contains("show-nav-items"))
      navItems.current.classList.remove("show-nav-items");
    else navItems.current.classList.add("show-nav-items");
  };
  return (
    <header className="mg-1">
      <div className="navbar">
        <div className="logo">
          <img alt="logo" className="img-logo" src={logo}></img>
          <Link to="/" className="txt-logo">
            RIF QR Payment
          </Link>
        </div>
        <Link className="hamburger-menu" onClick={toggleItems}>
          <i className="fa fa-bars"></i>
        </Link>
        <nav ref={navItems} className="nav-items ">
          <Link
            className="nav-item"
            onClick={window.innerWidth <= 600 && toggleItems}
            to="/create"
          >
            Generate a QR Code
          </Link>
          <Link
            className="nav-item"
            onClick={window.innerWidth <= 600 && toggleItems}
            to="/scan"
          >
            Scan a QR Code
          </Link>
        </nav>
      </div>
      {account ? <ConnectedBar></ConnectedBar> : ""}
    </header>
  );
};
