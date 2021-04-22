import React, { useContext, useState } from "react";
import AccountContext from "../Context";
import QRCode from "qrcode.react";
import RloginButton from "../components/RloginButton";

export default function Create() {
  const [account, setAccount] = useContext(AccountContext);
  const [amount, setAmount] = useState("");
  const [name, setName] = useState("");
  const [qr, setQr] = useState(<></>);

  const changeAmount = ({ target }) => setAmount(target.value);
  const changeThing = ({ target }) => setName(target.value);
  const handleSubmit = (e) => {
    e.preventDefault();
    setQr(
      <QRCode
        size="300"
        className="qr"
        scale={true}
        value={JSON.stringify({ amount, account, thing: name })}
      ></QRCode>
    );
  };
  return (
    <div className="container center">
      {account ? (
        <div>
          <form className="form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label for="amount">Amount</label>
              <input
                type="number"
                step="0.000000001"
                onChange={changeAmount}
                name="amount"
                id="amount"
                value={amount}
              ></input>
            </div>
            <div className="form-group">
              <label id="name">Product Name</label>
              <input
                type="text"
                onChange={changeThing}
                name="name"
                id="name"
                value={name}
              ></input>
            </div>
            <button className="btn" type="submit">
              Generate QR
            </button>
          </form>
          <div >{qr}</div>
        </div>
      ) : (
        <div className="flex-col-center">
          <p>Please Connect Your Wallet First !!</p>
          <RloginButton></RloginButton>
        </div>
      )}
    </div>
  );
}
