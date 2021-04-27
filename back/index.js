const express = require('express')
const cors = require('cors')
const fs = require('fs')
const setupApp = require('@rsksmart/express-did-auth').default
const { ES256KSigner, decodeJWT } = require('did-jwt')

const app = express()
app.use(cors())

const privateKey = fs.readFileSync('.secret').toString() // Your Private Key
const serviceDid = 'did:ethr:rsk:PUT_YOUR_PUBLIC_KEY'
const serviceSigner = ES256KSigner(privateKey)
const challengeSecret = 'secrettt'
const serviceUrl = 'http://localhost:3001'

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

const port = 3001
app.listen(port, () => console.log(`App running on port ${port}`))
