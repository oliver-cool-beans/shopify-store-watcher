const discord = require('express').Router();
const interactions = require('./interactions');
const { validateDiscordWebhook } = require('../middleware');

discord.use(validateDiscordWebhook);
discord.post('/interactions', interactions);

module.exports = discord;