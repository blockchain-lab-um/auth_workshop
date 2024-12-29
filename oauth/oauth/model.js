const crypto = require('crypto');

// More information can be found here: https://oauth2-server.readthedocs.io/en/latest/model/spec.html
// Database for the OAuth server;
// This is an example for one client
const db = {
    authorizationCode: {
        authorizationCode: '', // A string that contains the code
        expiresAt: new Date(), // A date when the code expires
        redirectUri: '', // A string of where to redirect to with this code
        client: null, // See the client section
        user: null, // Whatever you want... This is where you can be flexible with the protocol
    },
    client: { // Application wanting to authenticate with this server
        clientId: '', // Unique string representing the client
        clientSecret: '', // Secret of the client; Can be null
        grants: [], // Array of grants that the client can use (ie, `authorization_code`)
        redirectUris: [], // Array of urls the client is allowed to redirect to
    },
    token: { // Example for one user
        accessToken: '', // Access token that the server created
        accessTokenExpiresAt: new Date(), // Date the token expires
        client: null, // Client associated with this token
        user: null, // User associated with this token
    },
};

module.exports = {
    getClient: function (clientId, clientSecret) {
        log({
            title: 'Get Client',
            parameters: [
                { name: 'clientId', value: clientId },
                { name: 'clientSecret', value: clientSecret },
            ]
        });
        db.client = { // Retrieved from the database
            clientId: clientId,
            clientSecret: clientSecret,
            grants: ['authorization_code', 'refresh_token'],
            redirectUris: ['http://localhost:3000/client/app'],
        };
        return new Promise(resolve => {
            resolve(db.client)
        })
    },
    saveToken: (token, client, user) => {
        log({
            title: 'Save Token',
            parameters: [
                { name: 'token', value: token },
                { name: 'client', value: client },
                { name: 'user', value: user },
            ],
        })
        db.token = {
            accessToken: token.accessToken,
            accessTokenExpiresAt: token.accessTokenExpiresAt,
            refreshToken: token.refreshToken, // Storing refresh token as well
            refreshTokenExpiresAt: token.refreshTokenExpiresAt,
            client: client,
            user: user,
        }
        return new Promise(resolve => resolve(db.token))
    },
    getAccessToken: token => {
        log({
            title: 'Get Access Token',
            parameters: [
                { name: 'token', value: token },
            ]
        })
        if (!token || token === 'undefined') return false
        return new Promise(resolve => resolve(db.token))
    },
    getRefreshToken: token => {
        log({
            title: 'Get Refresh Token',
            parameters: [
                { name: 'token', value: token },
            ],
        })
        return new Promise(resolve => resolve(db.token))
    },
    revokeToken: token => {
        log({
            title: 'Revoke Token',
            parameters: [
                { name: 'token', value: token },
            ]
        })
        if (!token || token === 'undefined') return false
        return new Promise(resolve => resolve(true))
    },
    generateAuthorizationCode: (client, user, scope) => {
        /* 
        For this to work, you are going have to hack this a little bit:
        1. navigate to the node_modules folder
        2. find the oauth_server folder. (node_modules/express-oauth-server/node_modules/oauth2-server)
        3. open lib/handlers/authorize-handler.js
        4. Make the following change (around line 136):
    
        AuthorizeHandler.prototype.generateAuthorizationCode = function (client, user, scope) {
          if (this.model.generateAuthorizationCode) {
            // Replace this
            //return promisify(this.model.generateAuthorizationCode).call(this.model, client, user, scope);
            // With this
            return this.model.generateAuthorizationCode(client, user, scope)
          }
          return tokenUtil.generateRandomToken();
        };
        */
        log({
            title: 'Generate Authorization Code',
            parameters: [
                { name: 'client', value: client },
                { name: 'user', value: user },
            ],
        })
        const seed = crypto.randomBytes(256)
        const code = crypto
            .createHash('sha1')
            .update(seed)
            .digest('hex')
        return code
    },
    saveAuthorizationCode: (code, client, user) => {
        log({
            title: 'Save Authorization Code',
            parameters: [
                { name: 'code', value: code },
                { name: 'client', value: client },
                { name: 'user', value: user },
            ],
        })
        db.authorizationCode = {
            authorizationCode: code.authorizationCode,
            expiresAt: code.expiresAt,
            client: client,
            user: user,
        }
        return new Promise(resolve => resolve(Object.assign({
            redirectUri: `${code.redirectUri}`,
        }, db.authorizationCode)))
    },
    getAuthorizationCode: authorizationCode => {
        log({
            title: 'Get Authorization code',
            parameters: [
                { name: 'authorizationCode', value: authorizationCode },
            ],
        })
        return new Promise(resolve => {
            resolve(db.authorizationCode)
        })
    },
    revokeAuthorizationCode: authorizationCode => {
        log({
            title: 'Revoke Authorization Code',
            parameters: [
                { name: 'authorizationCode', value: authorizationCode },
            ],
        })
        db.authorizationCode = { // Database delete - in-memory for this example
            authorizationCode: '',
            expiresAt: new Date(),
            redirectUri: '',
            client: null,
            user: null,
        }
        const codeWasFoundAndDeleted = true
        return new Promise(resolve => resolve(codeWasFoundAndDeleted))
    },
    verifyScope: (token, scope) => {
        log({
            title: 'Verify Scope',
            parameters: [
                { name: 'token', value: token },
                { name: 'scope', value: scope },
            ],
        })
        const userHasAccess = true
        return new Promise(resolve => resolve(userHasAccess))
    }
};

function log({ title, parameters }) {
    console.log(title, parameters);
}