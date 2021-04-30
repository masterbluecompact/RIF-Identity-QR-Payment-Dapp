import Web3 from "web3";
import memoize from "fast-memoize";

const ERC677Data = require("../abi/ERC677Data.json");


const rawGetWeb3 = (url) => new Web3(new Web3.providers.HttpProvider(url));
const memoizedw3 = memoize(rawGetWeb3);
export const getWeb3 = (url) => memoizedw3(url);


const rawGetContract = (rpcUrl, address, abi) => {
  const web3 = getWeb3(rpcUrl);
  const ret = new web3.eth.Contract(abi, address);
  return ret;
};
const memoizedCon = memoize(rawGetContract)
const getContract = (rpcUrl, address, abi) => memoizedCon(rpcUrl, address, abi)


export const getERC677TokenDetails = (
  rpcUrl,
  address,
  nameHandler,
  symbolHandler,
  decimalsHandler
) => {
  const token = getContract(rpcUrl, address, ERC677Data.abi);
  token.methods.name().call().then(nameHandler).catch(console.log);
  token.methods.symbol().call().then(symbolHandler).catch(console.log);
  token.methods.decimals().call().then(decimalsHandler).catch(console.log);
};


export const transferERC677Tokens = (
  tokenAddress,
  rpcUrl,
  provider,
  from,
  to,
  amount,
  txHashHandler,
  confirmationHandler,
  receiptHandler,
  errorHandler
) => {
  const token = getContract(rpcUrl, tokenAddress, ERC677Data.abi);
  token.setProvider(provider)
  token.methods.transfer(to, amount).send({ from: from })
  .on('transactionHash', txHashHandler)
  .on('confirmation', confirmationHandler)
  .on('receipt', receiptHandler)
  .on('error', errorHandler)
};


export const getAddressUrl = (explorerUrl, address) => {
  return explorerUrl + "/address/" + address;
};


export const getTxUrl = (explorerUrl, txHash) => {
  return explorerUrl + "/tx/" + txHash;
};
