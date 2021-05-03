# tarrif

## RSK Hackathon: Building the Future on Bitcoin

## Description

tarrif QR code based payments app, where one user can generate a QR price tag
for a product or scan a QR code for another user and send them
payments on the RSK Network denominated in an ERC20 token.

## Feature:

- Generate QR price tags for products to be paid in an ERC20 token.
- Scan to see details and pay.

## Development:

### backend:

`cd back && npm start`

### front:

`cd front && yarn start`

> p.s.: there is an issue with QR scanning on http, but it works fine on https, to test this: `cd front && yarn build:ssl`

## TODO Rami:

- Create backend for the Dapp (same as [demo workshop application](https://github.com/rsksmart/rlogin-workshop), but might require some changes) 👌
- Add dotenv stuff 👌
- Define constants for ERC20 coin (RIF) and try to make it extensible. 👌
- Embed the ERC20 token address (key : token) to the QR code. 👌
- Write the transferERC20 function : Args (receiver:address, amount:uint, tokenAddress:address). 👌

## TODO Eehab:

- Add the Provider (and maybe the chainID) to the context. 👌
- Prevent scanning QR code if the user is not loggedin or verified. 👌
- Print the information of the QR code in a human readable way with a button that when clicked calls transferERC20() 👌.
- Support two types of QR code (one has full information, and one is missing amount and productName and productImage)👌.
- Better styling 👌.

## Future improvements:

- Support bulk QR generation from a csv file (or similar).
- Support RNS instead of receiver's address.
- Embed a product image in the QR code.
- Convert to PWA or an Android App.
