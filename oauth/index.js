// We need to import some libraries
const express = require('express');
const bodyParser = require('body-parser');

// Server setup
const app = express();
const port = 3000;
app.use(bodyParser.json());

// Setup routes

// Start server and listen on port
const server = app.listen(port, function () {
    const addr = server.address();
    console.log('Server listening at: ', addr.address + ':' + addr.port);
});

// ----------------- EXERCISE -----------------