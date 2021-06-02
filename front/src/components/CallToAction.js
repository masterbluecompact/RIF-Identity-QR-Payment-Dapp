import React, { useContext } from "react";
import RloginButton from "./RloginButton";
import AccountContext from "../Context";
import { Link } from "react-router-dom";
import WalletSVG from "./Images/WalletSVG";
import QRCodeSVG from "./Images/QRCodeSVG";
import TransactionSVG from "./Images/TransactionSVG";
export const CallToAction = () => {
  const [account,] = useContext(AccountContext);

  return (
    <div className="cta">
      <div className="cta-item">
        <div className="cta-item-img">
          <WalletSVG />
        </div>
        <div className="cta-item-txt">
          Connect Your Wallet With An Email Verified Adderss
        </div>
        <div>
          {account === "" ? <RloginButton></RloginButton> : "Connected ✅"}
        </div>
      </div>
      <div className="cta-item">
        <div className="cta-item-img">
          <QRCodeSVG />
        </div>
        <div className="cta-item-txt">
          Generate Price Tag With Your Address And All The Information In A QR
          Code
        </div>

        <Link className="btn" to="/create">
          Generate a QR Code
        </Link>
      </div>
      <div className="cta-item">
        <div className="cta-item-img">
          <TransactionSVG />
        </div>
        <div className="cta-item-txt">
          Scan a QR Code And Complete The Transcation
        </div>
        <Link className="btn " to="/scan">
          Scan a QR Code
        </Link>
      </div>
    </div>
  );
};
