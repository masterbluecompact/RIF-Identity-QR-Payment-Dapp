const express = require('express')
const cors = require('cors')
const fs = require('fs')
const setupApp = require('@rsksmart/express-did-auth').default
const { ES256KSigner, decodeJWT } = require('did-jwt')
const { rskDIDFromPrivateKey, rskTestnetDIDFromPrivateKey } = require('@rsksmart/rif-id-ethr-did')

require('dotenv').config() // load dotenv

const app = express()
app.use(cors())

const privateKey = process.env.PRIVATE_KEY
const serviceDid = (process.env.IS_TESTNET === '1' ? rskTestnetDIDFromPrivateKey()(privateKey).did : rskDIDFromPrivateKey()(privateKey).did)
const serviceSigner = ES256KSigner(privateKey)
const challengeSecret = process.env.CHALLENGE_SECRET
const serviceUrl = `${process.env.SERVICE_URL}:${process.env.SERVICE_PORT}`

function signupBusinessLogic(payload) {
  const emailCredential = payload.sd.credentials['Email']
  console.log(emailCredential)
  console.log(decodeJWT(emailCredential).payload.vc.credentialSubject)
  return true
}

const expressDIDAuthMiddleware = setupApp({ challengeSecret, serviceUrl, serviceDid, serviceSigner,
  requiredCredentials: ['Email'],
  requiredClaims: [],
  signupBusinessLogic
})(app)

app.get('/not-protected', function (req, res) {
  console.log('Not protected triggered!')
  res.send('This endpoint is not authenticating')
})

app.get('/protected', expressDIDAuthMiddleware, function (req, res) {
  console.log(`Protected triggered! (${req.user.did})`)
  res.send('This endpoint is authenticating')
})

const port = process.env.SERVICE_PORT
app.listen(port, () => console.log(`App running on port ${port}`))