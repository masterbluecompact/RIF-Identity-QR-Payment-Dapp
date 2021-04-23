import React, { useContext } from "react";
import RLogin, { RLoginButton } from "@rsksmart/rlogin";
import WalletConnectProvider from "@walletconnect/web3-provider";
import AccountContext from "../Context";
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

export default function RloginButton() {
  const [, setAccount] = useContext(AccountContext);
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
  return (
    <div>
      <RLoginButton className="rlogin-button" onClick={handleLogin}>
        Connect Wallet
      </RLoginButton>
    </div>
  );
}
