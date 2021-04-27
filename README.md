# tareefQR
## RSK Hackathon: Building the Future on Bitcoin
## Description
tareefQR is a qr payments Dapp created for gitcoin bounty : [RIF Identity QR Payments DApp](https://gitcoin.co/issue/rsksmart/rsk-gitcoin-hackathon-2021/14/100025543) in the RSK Hackathon.

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
- Create backend for the Dapp (same as [demo workshop application](todo.com), but might require some changes)
- Define constants for ERC20 coin (RIF) and try to make it extensible.
- Embed the ERC20 token address to the QR code.
- Write the transferERC20 function : Args (receiver:address, amount:uint, tokenAddress:address).

## TODO Eehab:
- Add the Provider (and maybe the chainID) to the context.
- Prevent scanning QR code if the user is not loggedin or verified.
- Print the information of the QR code in a human readable way with a button that when clicked calls transferERC20().
- Support two types of QR code (one has full information, and one is missing amount and productName and productImage)
- Better styling.

## Future improvements:
- Support bulk QR generation from a csv file (or similar).
- Support RNS instead of receiver's address.
- Embed a product image in the QR code.
- Convert to PWA or an Android App.