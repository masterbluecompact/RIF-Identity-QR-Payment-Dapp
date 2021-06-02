import React, { useContext, useState, useEffect } from "react";
import AccountContext, { ProviderContext } from "../Context";
import {
  getERC677TokenDetails,
  transferERC677Tokens,
} from "../utils/essentials";
import { RIF_TOKEN_ADDRESS, RSK_RPC_URL } from "../config/constants";
import RloginButton from "../components/RloginButton";

export default function Send() {
  const [account] = useContext(AccountContext);
  const [provider] = useContext(ProviderContext);

  const [amount, setAmount] = useState(0);
  const [to, setTo] = useState(""); // receiver's address

  const [decimals, setDecimals] = useState(0); // token's decimals
  const [symbol, setSymbol] = useState(""); // token's symbol (RIF, tRIF)
  const [name, setName] = useState(""); // token's name

  const [, setTxHash] = useState(""); // txHash of a sent transaction

  useEffect(() => {
    if (!account || !provider) return;
    console.log(account);

    getERC677TokenDetails(
      RSK_RPC_URL[31],
      RIF_TOKEN_ADDRESS[31],
      setName,
      setSymbol,
      setDecimals
    );
  }, [account, provider]);

  const changeAmount = ({ target }) => setAmount(target.value);
  const changeTo = ({ target }) => setTo(target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    transferERC677Tokens(
      RIF_TOKEN_ADDRESS[31],
      RSK_RPC_URL[31],
      provider,
      account,
      to,
      (amount * Math.pow(10, decimals)).toString(),
      setTxHash,
      console.log,
      console.log,
      console.log
    );
  };

  return (
    <div className="container center">
      {account ? (
        <div>
          <h2>Send {name}</h2>
          <form className="form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label for="amount">Amount</label>
              <input
                type="number"
                step="1" // not working for some reason, TODO: scale amount up by decimals
                onChange={changeAmount}
                name="amount"
                id="amount"
                value={amount}
              ></input>
              {amount} {symbol} (// help RIF not showing here :()
            </div>
            <div className="form-group">
              <label id="name">To</label>
              <input
                type="text"
                onChange={changeTo}
                name="to"
                id="name"
                value={to}
              ></input>
            </div>
            <button className="btn" type="submit">
              Send Tokens
            </button>
          </form>
          <div></div>
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
