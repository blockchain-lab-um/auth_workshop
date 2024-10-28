// We need to import some libraries
const express = require('express');
const { expressjwt: jwt } = require("express-jwt");
const session = require('express-session');
const jwt_lib = require('jsonwebtoken');
const bodyParser = require('body-parser');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

// We need to load users (in reality, we would use some database)
const user = require("./users.json");
const userPassword = user.password;
delete user.password;

// Server setup
const app = express();
const port = 3000;
app.use(bodyParser.json());

// Setup session
app.use(session({
    secret: 'session-secret',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true }
}));

// Setup JWT
const jwtSecret = 'secret-key';
const validateJwt = jwt({ secret: jwtSecret, algorithms: ["HS256"] });

app.use('/', function (req, res, next) {
    if (req.originalUrl === '/login') {
        next();
    } else {
        if (req.query && req.query.hasOwnProperty('access_token')) {
            req.headers.authorization = 'Bearer ' + req.query.access_token;
        }
        validateJwt(req, res, next);
        req.user = user.username;
    }
});

// Setup CORS
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    next();
});

// Setup passport
passport.use(new LocalStrategy(function (username, password, done) {
    if (username === user.username && password === userPassword) {
        return done(null, user);
    } else {
        return done(null, false, { message: 'Incorrect username or password' });
    }
}));

passport.serializeUser(function (user, done) {
    done(null, user.username);
});

passport.deserializeUser(function (username, done) {
    if (username === user.username) {
        done(null, user);
    } else {
        done('No user with username ' + username);
    }
});

app.use(passport.initialize());

// Setup routes
app.post('/login', function (req, res, next) {
    passport.authenticate('local', function (err, user, info) {
        if (err) {
            return next(err);
        }
        if (!user) {
            return res.status(404).json('No user found...');
        }
        req.logIn(user, function (err) {
            if (err) {
                return next(err);
            }
            var token = jwt_lib.sign({
                username: user.username
            }, jwtSecret);
            return res.status(200).json({ token: token, user: user });
        });
    })(req, res, next);
});

app.get('/logout', function (req, res) {
    req.logout();
    res.json(200, { success: true });
});

app.get('/users/me', function (req, res) {
    if (req.user) {
        res.json(user);
    } else {
        res.status(403).json({ message: 'Not authorized' });
    }
});

app.get('/secret-picture', function (req, res) {
    if (req.user) {
        res.sendFile(__dirname  + "/pictures/image.jpeg");
    } else {
        res.status(403).json({ message: 'Not authorized' });
    }
});

// Start server and listen on port
const server = app.listen(port, function () {
    const addr = server.address();
    console.log('Server listening at: ', addr.address + ':' + addr.port);
});

// ----------------- EXERCISE -----------------

// Expand the server so it supports multiple users.
// Be careful that the endpoint users me returns the data of the user that is logged in (each user has different JWT as well).
