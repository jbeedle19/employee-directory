require('dotenv').config();
const express = require('express');
const path = require('path');
const serverSession = require('./config/session');

const passport = require('passport');
require('./config/passport');

const helmet = require('helmet');
const ContentSecurityPolicy = require('./config/helmet');

const hotlink = require('./utils/hotlink');

const routes = require('./controllers');
const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Enable Content Security Policy
app.use(ContentSecurityPolicy);

// Remove Referrer-Policy and X-Content-Type-Option headers
app.use(
  helmet.referrerPolicy({
    policy: 'no-referrer',
  })
);
app.use(helmet.noSniff());

// Enable this if you run behind a proxy (e.g. nginx)
// app.set('trust proxy', 1);

app.use(serverSession);

app.use(passport.initialize());
app.use(passport.session());

app.use(hotlink);

app.use(express.static(path.join(__dirname, '/public')));

// Turn on routes
app.use(routes);

app.listen(PORT, () => {
  console.log(`Server started on port: ${PORT}`);
});
