import React, { useContext } from "react";

import { CallToAction } from "../components/CallToAction";
import AccountContext from "../Context";
import logo from "../logo.png";
export default function Home() {
  const [account] = useContext(AccountContext);
  return (
    <>
      <div className="center">
        <h1>
          <span id="tar">tar</span>
          <span id="rif">rif</span>
        </h1>
        <img src={logo} alt="logo"></img>
        <p className="mg-1">
          This is a QR code based payments app, where one user can generate a QR
          price tag for a product or scan the QR code for another user and send
          them payments denominated in an ERC20 token.
        </p>
      </div>

      <CallToAction></CallToAction>
     
    </>
  );
}
