# jwt

This folder contains examples of Json Web Tokens (JWTs).

Standard: <https://datatracker.ietf.org/doc/html/rfc7519>
jwt.io: <https://jwt.io/>

## Scripts

```bash
cd scripts

npm install # install dependencies

openssl genrsa -out rsa-private.pem 2048
openssl rsa -in rsa-private.pem -outform PEM -pubout -out rsa-public-key.pem

node index.js
```

## Server example

```bash
cd server

npm install # install deps

node index.js
```

The command above starts the server. Use Postman to create requests.
