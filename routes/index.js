const routes = require('express').Router();
const discord = require('./discord');

routes.use('/discord', discord);

module.exports = routes;