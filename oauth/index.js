// We need to import some libraries
const express = require('express');
const bodyParser = require('body-parser');

// We need to import the ouath server implementation
const oauthServer = require('./oauth/server.js');

// Server setup
const app = express();
const port = 3000;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Setup routes
app.use('/client', require('./routes/client.js')); // client routes
app.use('/oauth', require('./routes/auth.js')); // ouath routes
app.use('/secure', (req, res, next) => {
    return next()
}, oauthServer.authenticate(), require('./routes/secure.js'));
app.use('/', (req, res) => res.redirect('/client'));

// Start server and listen on port
const server = app.listen(port, function () {
    const addr = server.address();
    console.log('Server listening at: ', addr.address + ':' + addr.port);
});

// ----------------- EXERCISE -----------------

// Expand the server so it supports multiple users.
// Separate the server into two servers - authorization server and resource server.
// Store the client id and secret in a more secure way.
