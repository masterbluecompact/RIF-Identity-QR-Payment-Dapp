import React, { useContext } from "react";
import { Link } from "react-router-dom";
import RloginButton from "../components/RloginButton";
import AccountContext from "../Context";

export default function Home() {
  const [account, _] = useContext(AccountContext);
  return (
    <div className="flex-col-center">
      <h2 className="mg-1">Rif QR Payments Dapp</h2>
      <p className="mg-1">
        This is a project created for{" "}
        <a href="https://gitcoin.co/issue/rsksmart/rsk-gitcoin-hackathon-2021/14/100025543">
          RIF Identity QR Payments DApp
        </a>
      </p>
      <p className="mg-1">
        This is a QR code based payments app, where one user can scan the QR
        code for another user and send them payments denominated in an ERC20
        token.
      </p>

      {account === "" ? (
        <div className="not-connected flex-col-center">
          <p>Connect your wallet and start paying for stuff</p>
          <RloginButton></RloginButton>{" "}
        </div>
      ) : (
        <div>
          <Link className="nav-item" to="/create">
            Generate a QR Code
          </Link>
          <Link className="nav-item" to="/scan">
            Scan a QR Code
          </Link>
        </div>
      )}
    </div>
  );
}
