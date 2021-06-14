import React from "react";
import ConnectWalletSVG from "./Images/ConnectWalletSVG";
import RloginButton from "./RloginButton";
export default function ConnectWalletCard({ message }) {
  return (
    <div className="wallet-card">
      <div className="wallet-card-msg">{message}</div>
      <div className="wallet-card-img">
        <ConnectWalletSVG />
      </div>
      <div className="wallet-card-button">
          <RloginButton></RloginButton>
      </div>
    </div>
  );
}
