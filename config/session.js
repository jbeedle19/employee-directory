require('dotenv').config();
const session = require('express-session');
const crypto = require('crypto');
const RedisStore = require('connect-redis')(session);
const redisClient = require('./redis');

const serverSession = session({
    cookie: { maxAge: 600000, secure: false },
    genid: function (req) {
        return crypto.randomBytes(32).toString('hex');
    },
    resave: false,
    saveUninitialized: false,
    secret: process.env.SESSION_SECRET,
    store: new RedisStore({ client: redisClient }),
});

module.exports = serverSession;