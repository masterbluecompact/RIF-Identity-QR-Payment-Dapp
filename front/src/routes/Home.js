import React from "react";

import { CallToAction } from "../components/CallToAction";
import logo from "../logo.png";
export default function Home() {
  return (
    <div>
      <div className="hero">
        <h1>
          <span id="tar">tar</span>
          <span id="rif">rif</span>
        </h1>
        <img src={logo} alt="logo"></img>
        <h2 className="hero-text mg-1">
          QR code based payments app, where one user can generate a QR price tag
          for a product or scan a QR code for another user and send them
          payments on the RSK Network denominated in an ERC20 token.
        </h2>
      </div>

      <CallToAction></CallToAction>
    </div>
  );
}
