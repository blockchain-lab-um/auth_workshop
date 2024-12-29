const path = require('path');
const express = require('express');
const oauthServer = require('../oauth/server.js');
const router = express.Router();

const file = path.join(__dirname, '../public/oauth.html');
router.get('/', (req, res) => res.sendFile(file));

router.post('/authorize', (req, res, next) => {
    const { username, password } = req.body;

    if (username === 'username' && password === 'password') {
        req.body.user = { user: 1 }
        return next()
    }

    const params = [
        'client_id',
        'redirect_uri',
        'response_type',
        'grant_type',
        'state',
    ]
        .map(a => `${a}=${req.body[a]}`)
        .join('&')
    return res.redirect(`/oauth?success=false&${params}`)
}, (req, res, next) => {
    return next()
}, oauthServer.authorize(
    {
        authenticateHandler: {
            handle: req => {
                return req.body.user
            }
        }
    }
));

router.post('/token', (req, res, next) => {
    next()
}, oauthServer.token({
    requireClientAuthentication: {
        // 'authorization_code': false,
    }
}));

module.exports = router;
