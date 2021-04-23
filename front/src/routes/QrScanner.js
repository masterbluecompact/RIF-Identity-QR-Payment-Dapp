import React, { useContext, useState } from "react";
import QrReader from "react-qr-scanner";
import AccountContext from "../Context"

export default function QrScanner() {
  const [result, setResult] = useState("No result");
  // const [account, _] = useContext(AccountContext)

  const handleScan = (data) => {
    setResult(data ? data : "No result")
  };

  const handleError = (err) => {
    alert(err);
    console.error(err);
  };

  const previewStyle = {
    height: 240,
    width: 320,
  };

  return (
    <div className="container center">
      <div>
        <QrReader
          delay={100}
          style={previewStyle}
          onError={handleError}
          onScan={handleScan}
          legacyMode
        />
        <p>{result}</p>
      </div>
    </div>
    /*
    uncomment later
    <div className="container center">
      {account ? (
        <div>
          <QrReader
            delay={100}
            style={previewStyle}
            onError={handleError}
            onScan={handleScan}
          />
          <p>result</p>
        </div>
      ) : (
        <div className="flex-col-center">
          <p>Please Connect Your Wallet First !!</p>
          <RloginButton></RloginButton>
        </div>
      )}
    </div>
    */
  );
}
