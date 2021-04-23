import React, { useContext, useState } from "react";
import QrReader from "react-qr-reader";
//import AccountContext from "../Context";

export default function QrScanner() {
  const [result, setResult] = useState(null);
  // const [account, _] = useContext(AccountContext)

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
      <h1 className='mg-1'>Scan a Qr Code</h1>
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
