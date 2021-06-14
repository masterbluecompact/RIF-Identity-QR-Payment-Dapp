import React, { useContext, useEffect, useState } from "react";
import QrReader from "react-qr-reader";
import { Decoder } from "@nuintun/qrcode";
import AccountContext, { ProviderContext } from "../Context";
import {
  transferERC677Tokens,
  getERC677TokenDetails,
} from "../utils/essentials";
import { RIF_TOKEN_ADDRESS, RSK_RPC_URL } from "../config/constants";
import ConnectWalletCard from "../components/ConnectWalletCard";
export default function Scan() {
  const [result, setResult] = useState(null);
  const [account] = useContext(AccountContext);
  const [provider] = useContext(ProviderContext);
  const providerChainId = +provider.networkVersion;

  const [decimals, setDecimals] = useState(0); // token's decimals
  const [symbol, setSymbol] = useState(""); // token's symbol (RIF, tRIF)
  const [, setName] = useState(""); // token's name
  const [, setTxHash] = useState(""); // txHash of a sent transaction
  const handleScan = (data) => {
    setResult(JSON.parse(data));
  };

  const handleError = (err) => {
    alert(err);
    console.error(err);
  };

  // scan from file stuff
  const [qrFilePath, setQrFilePath] = useState(null);
  const handleFile = ({ target }) => {
    setQrFilePath(URL.createObjectURL(target.files[0]));
  };

  useEffect(() => {
    if (qrFilePath) {
      const qrCodeScanner = new Decoder();
      qrCodeScanner
        .scan(qrFilePath)
        .then((res) => {
          setResult(JSON.parse(res.data));
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [qrFilePath]);

  useEffect(() => {
    setResult(null);
    setQrFilePath(null);
    if (!account || !provider) return;
    getERC677TokenDetails(
      RSK_RPC_URL[providerChainId],
      RIF_TOKEN_ADDRESS[providerChainId],
      setName,
      setSymbol,
      setDecimals
    );
  }, [account, provider, providerChainId]);

  const startPayment = () => {
    transferERC677Tokens(
      RIF_TOKEN_ADDRESS[providerChainId],
      RSK_RPC_URL[providerChainId],
      provider,
      account,
      result["To"],
      result["Price"].toString(),
      setTxHash,
      console.log,
      console.log,
      console.log
    );
  };

  const previewStyle = {
    width: "100%",
  };

  const details = result ? (
    <>
      <h2>Details</h2>
      <table className="table">
        <tbody className="table-body">
          {Object.keys(result).map((field) => (
            <tr key={field} className="table-row">
              <td className="table-data">{field}</td>
              <td className="table-data">
                {field === "Price"
                  ? (result[field] * Math.pow(10, -decimals)).toString()
                  : result[field]}
                {field === "Price" ? symbol : ""}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={() => startPayment()} className="btn">
        Pay
      </button>
    </>
  ) : (
    ""
  );

  return (
    <>
      {account !== "" ? (
        <>
          <h2 className="mg-1">
            Face The QR Code To The Camera To Scan A QR Price Tag
          </h2>
          <div className="qr-cam">
            {!result && (
              <>
                <QrReader
                  delay={300}
                  style={previewStyle}
                  onError={handleError}
                  onScan={handleScan}
                />
                <h3>OR</h3>

                <input
                  className="btn"
                  type="file"
                  onChange={handleFile}
                ></input>
              </>
            )}
          </div>
          {details}
        </>
      ) : (
        <ConnectWalletCard
          message={"Connect Your Wallet And Start Paying QR Price Tags"}
        ></ConnectWalletCard>
      )}
    </>
  );
}
