import "./App.css";

import React, { useState } from "react";
import QRCode from "qrcode.react";
import RLogin, { RLoginButton } from "@rsksmart/rlogin";
import WalletConnectProvider from "@walletconnect/web3-provider";

const rLogin = new RLogin({
  cachedProvider: false,
  providerOptions: {
    walletconnect: {
      package: WalletConnectProvider,
      options: {
        rpc: {
          31: "https://public-node.testnet.rsk.co",
        },
      },
    },
  },
  supportedChains: [31],
});

function App() {
  const [account, setAccount] = useState("");
  const [amount, setAmount] = useState("");
  const [thing, setThing] = useState("");
  const [qr, setQr] = useState(<></>);
  const handleLogin = () => {
    rLogin
      .connect()
      .then(({ provider }) => {
        provider
          .request({ method: "eth_accounts" })
          .then(([acc]) => setAccount(acc));
      })
      .catch((err) => console.log(err));
  };

  const changeAmount = ({ target }) => setAmount(target.value);
  const changeThing = ({ target }) => setThing(target.value);
  const handleSubmit = (e) => {
    e.preventDefault();
    setQr(
      <QRCode
        size="256"
        scale
        value={JSON.stringify({ amount, account, thing })}
      ></QRCode>
    );
    console.log(qr);
  };
  return (
    <div className="container">
      <div className="center">
        <RLoginButton className="rlogin-button" onClick={handleLogin}>
          Connect Wallet
        </RLoginButton>
      </div>
      {account ? (
        <div>
          <h1>{account}</h1>
          <div className="center">
            <form className="form" onSubmit={handleSubmit}>
              <label>Amount</label>
              <input
                type="text"
                onChange={changeAmount}
                name="amount"
                value={amount}
              ></input>
              <label>Thing</label>
              <input
                type="text"
                onChange={changeThing}
                name="thing"
                value={thing}
              ></input>
              <button type="submit">Generate QR</button>
            </form>
          </div>
          <div className="center">{qr}</div>
          <div className="center">
            {JSON.stringify({ account, amount, thing })}
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default App;
