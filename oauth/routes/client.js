const path = require('path');
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => res.sendFile(path.join(__dirname, '../public/client.html')));

router.get('/app', (req, res) => res.sendFile(path.join(__dirname, '../public/app.html')));

module.exports = router;