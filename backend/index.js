const express = require('express');
const acl = require('express-acl');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const bearerMiddleware = require('./helpers/bearer');
const userRoutes = require('./app/routes/user');
const postRoutes = require('./app/routes/post');
const voteRoutes = require('./app/routes/vote');

const app = express();
const PORT = process.env.PORT;

const aclConfig = {
  baseUrl: '/',
  defaultRole: 'anonymous',
  ignoreRootRoute: true,
};
const aclError = {
  status: 'Access Denied',
  message: 'You are not authorized to access this resource',
};

acl.config(aclConfig, aclError);

app.use(bearerMiddleware);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(acl.authorize);

app.get('/', async (req, res) => {
  res.send('Hello World!');
});

userRoutes(app);
postRoutes(app);
voteRoutes(app);

app.listen(PORT);
