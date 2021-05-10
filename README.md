# tarrif

## RSK Hackathon: Building the Future on Bitcoin

## Description

tarrif QR code based payments app, where one user can generate a QR price tag
for a product or scan a QR code for another user and send them
payments on the RSK Network denominated in an ERC20 token.

## Feature:

- Generate QR price tags for products to be paid in an ERC20 token.
- Scan to see details and pay.

## Local Deployment:

### Back-end:

```
cd back
cp .env.example .env
npm start
```

### Front-end:

```
cd front
yarn start
```


## Future improvements:

- Support bulk QR generation from a csv file (or similar).
- Support RNS instead of receiver's address.
- Embed a product image in the QR code.
- Convert to PWA or an Android App.

## Important notes for testers/reviewers:
- If we're only testing on localhost the app would work fine on HTTP (by following the instructions in section: Local Development).
- If we would like to test functionality globally both the front-end and the back-end need to be served with SSL (because most of modern web browsers don't allow access to media devices on plain HTTP); follow the steps below
  
  check `/back/.env.example` and change GLOBAL_SERVICE_ADDRESS according to the ip address of the device hosting the backend, copy `.env.example` to `.env`
  
  run the backend: `npm start:global:ssl` (visit the address on the console in your web browser to add the certificate, we're using self-signed certificate just as a POC)

  we need to check `/front/.env` and change `REACT_APP_BACKEND_ADDRESS` to be the same address printed on the backend console.

  For example: when we run the backend we get `app listening on port 3001! Go to https://192.168.1.12:3001` so we set `REACT_APP_BACKEND_ADDRESS=https://192.168.1.12:3001`

  and then we run the front-end on SSL with `yarn build:ssl`


