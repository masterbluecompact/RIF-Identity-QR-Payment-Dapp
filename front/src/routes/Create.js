import React, { useContext, useEffect, useState } from "react";
import AccountContext, { ProviderContext } from "../Context";
import QRCode from "qrcode.react";
import RloginButton from "../components/RloginButton";
import { RIF_TOKEN_ADDRESS, RSK_RPC_URL } from "../config/constants";
import { getERC677TokenDetails } from "../utils/essentials";

export default function Create() {
  // Context
  const [account] = useContext(AccountContext);
  const [provider] = useContext(ProviderContext);
  const providerChainId = +provider.networkVersion;

  // ERC677Token State
  const [tokenDecimals, setTokenDecimals] = useState(0);
  const [tokenSymbol, setTokenSymbol] = useState("");
  const [tokenName, setTokenName] = useState("");

  // Generated QR Code State
  const [qrCode, setQrCode] = useState(<></>);

  // Form State
  const [productPrice, setProductPrice] = useState(null);
  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [validationError, setvalidationError] = useState(false);
  const [generateQr, setGenerateQr] = useState(false);
  const [validationErrorMsg, setvalidationErrorMsg] = useState("Qr Code");

  // Form Handlers
  const handleChangeAmount = ({ target }) => setProductPrice(target.value);
  const handleChangeProductName = ({ target }) => setProductName(target.value);
  const handleChangeProductDescription = ({ target }) =>
    setProductDescription(target.value);
  const handleSubmit = (e) => {
    e.preventDefault();

    validateFrom();
    if (!validationError) {
      setQrCode(
        <QRCode
          size={400}
          className="qr"
          scale={true}
          value={JSON.stringify({
            productPrice,
            account,
            productName,
            productDescription,
            token: RIF_TOKEN_ADDRESS[providerChainId],
          })}
        ></QRCode>
      );
    }
  };

  const validateFrom = () => {
    if (!productPrice) {
      setvalidationError(true);
      setGenerateQr(false);
      setvalidationErrorMsg("Please Enter A Product Price");
      console.log("no price");
    } else if (productPrice <= 0) {
      setvalidationError(true);
      setGenerateQr(false);
      setvalidationErrorMsg("Please Enter A Valid Product Price");
      console.log("low price");
    } else {
      console.log("yay");
      setGenerateQr(true);
      setvalidationError(false);
      console.log(validationError);
    }
  };

  // Get The ERC677Tolen Details
  useEffect(() => {
    if (!account || !provider) return;
    getERC677TokenDetails(
      RSK_RPC_URL[providerChainId],
      RIF_TOKEN_ADDRESS[providerChainId],
      setTokenName,
      setTokenSymbol,
      setTokenDecimals
    );
  }, [account]);

  return (
    <>
      {account ? (
        <>
          <h2>
            Fill the form with a product details and generate a QR Price Tag for
            it.
          </h2>
          <p>Your connected wallet address Will be added.</p>

          <div className="flex-row-space-around">
            <form className="form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label for="amount">Amount {`(${tokenSymbol})`}</label>
                <input
                  min={0}
                  type="number"
                  step="1"
                  onChange={handleChangeAmount}
                  name="price"
                  id="price"
                  value={productPrice}
                ></input>
              </div>
              <div className="form-group">
                <label id="name">Product Name</label>
                <input
                  type="text"
                  onChange={handleChangeProductName}
                  name="name"
                  id="name"
                  value={productName}
                ></input>
              </div>
              <div className="form-group">
                <label id="name">Product Description</label>
                <textarea
                  type="text"
                  onChange={handleChangeProductDescription}
                  name="desc"
                  id="desc"
                  value={productDescription}
                ></textarea>
              </div>
              <button className="btn" type="submit">
                Generate QR
              </button>
            </form>
            {generateQr ? (
              <div>{qrCode}</div>
            ) : (
              <div className="qr-placeholder">{validationErrorMsg}</div>
            )}
          </div>
        </>
      ) : (
        <div className="flex-col-center">
          <p>Please Connect Your Wallet First !!</p>
          <RloginButton></RloginButton>
        </div>
      )}
    </>
  );
}
