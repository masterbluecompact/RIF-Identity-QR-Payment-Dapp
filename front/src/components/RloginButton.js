import React, { useContext } from "react";
import RLogin, { RLoginButton } from "@rsksmart/rlogin";
import WalletConnectProvider from "@walletconnect/web3-provider";
import AccountContext, { ProviderContext } from "../Context";
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
  backendUrl: "http://localhost:3001",
  supportedChains: [31],
});

export default function RloginButton() {
  const [, setAccount] = useContext(AccountContext);
  const [, setProvider] = useContext(ProviderContext);
  const handleLogin = () => {
    rLogin
      .connect()
      .then(({ provider }) => {
        provider
          .request({ method: "eth_accounts" })
          .then(([acc]) => setAccount(acc));
        setProvider(provider);
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
