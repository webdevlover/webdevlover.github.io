/**
 * This example demonstrates using HTML5 games with Telegram.
 */
/* eslint-disable no-console */

const TOKEN = process.env.TELEGRAM_TOKEN || '607622185:AAHcO4EDZoZVjM1pW58uiV2j-j4Y-xpFju0';
const gameName = process.env.TELEGRAM_GAMENAME || '607622185:AAHcO4EDZoZVjM1pW58uiV2j-j4Y-xpFju0';
// Specify '0' to use ngrok i.e. localhost tunneling
let url = process.env.URL || 'https://webdevlover.github.io';
const port = process.env.PORT || 8080;

const TelegramBot = require('../..');
const express = require('express');
const path = require('path');

const bot = new TelegramBot(TOKEN, { polling: true });
const app = express();

// Basic configurations
app.set('view engine', 'ejs');

// Tunnel to localhost.
// This is just for demo purposes.
// In your application, you will be using a static URL, probably that
// you paid for. :)
if (url === '0') {
  const ngrok = require('ngrok');
  ngrok.connect(port, function onConnect(error, u) {
    if (error) throw error;
    url = u;
    console.log(`Game tunneled at ${url}`);
  });
}

// Matches /start
bot.onText(/\/start/, function onPhotoText(msg) {
  bot.sendGame(msg.chat.id, gameName);
});

// Handle callback queries
bot.on('callback_query', function onCallbackQuery(callbackQuery) {
  bot.answerCallbackQuery(callbackQuery.id, { url });
});

// Render the HTML game
app.get('/', function requestListener(req, res) {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Bind server to port
app.listen(port, function listen() {
  console.log(`Server is listening at http://localhost:${port}`);
});
