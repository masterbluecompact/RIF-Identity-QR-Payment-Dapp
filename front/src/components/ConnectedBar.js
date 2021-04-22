import React, { useContext } from "react";
import AccountContext from "../Context";

export default function ConnectedBar() {
  const [account, _] = useContext(AccountContext);
  return (
    <div className="alert">
      Your Wallet is connected with this address : <code>{account}</code>
    </div>
  );
}
