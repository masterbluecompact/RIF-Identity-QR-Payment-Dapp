import React, { useContext, useState } from "react";
import QrReader from "react-qr-reader";
import RloginButton from "../components/RloginButton";
import AccountContext from "../Context";

export default function QrScanner() {
  const [result, setResult] = useState(null);
  const [account] = useContext(AccountContext);

  const handleScan = (data) => {
    setResult(data ? JSON.stringify(data) : null);
  };

  const handleError = (err) => {
    alert(err);
    console.error(err);
  };

  const previewStyle = {
    width: "100%",
  };

  return (
    <div className="container center">
      {account !== "" ? (
        <>
          <h1 className="mg-1">Scan a Qr Code</h1>
          <div>
            {!result && (
              <QrReader
                delay={300}
                style={previewStyle}
                onError={handleError}
                onScan={handleScan}
              />
            )}
            <p>{result}</p>
          </div>
        </>
      ) : (
        <div>
          <p>Connect your wallet and start paying for stuff</p>
          <RloginButton></RloginButton>{" "}
        </div>
      )}
    </div>
  );
}
