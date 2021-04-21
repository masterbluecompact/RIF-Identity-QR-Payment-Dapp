import React, { useContext, useState } from "react";
import AccountContext from "../Context";
import QRCode from "qrcode.react";
import RloginButton from "../components/RloginButton";

export default function Create() {
  const [account, setAccount] = useContext(AccountContext);
  const [amount, setAmount] = useState("");
  const [thing, setThing] = useState("");
  const [qr, setQr] = useState(<></>);

  const changeAmount = ({ target }) => setAmount(target.value);
  const changeThing = ({ target }) => setThing(target.value);
  const handleSubmit = (e) => {
    e.preventDefault();
    setQr(
      <QRCode
        size="256"
        className="qr"
        scale={true}
        value={JSON.stringify({ amount, account, thing })}
      ></QRCode>
    );
    console.log(qr);
  };
  return (
    <div className="w-100 flex-col-center">
      {account ? (
        <div className="flex-col-center">
          <form className="myform" onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Amount</label>
              <input
                type="number"
                step="0.000000001"
                onChange={changeAmount}
                name="amount"
                value={amount}
              ></input>
            </div>
            <div className="form-group">
              <label>Thing</label>
              <input
                type="text"
                onChange={changeThing}
                name="thing"
                value={thing}
              ></input>
            </div>
            <button className="mybutton" type="submit">
              Generate QR
            </button>
          </form>
          <div className="center">{qr}</div>
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
