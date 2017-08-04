const express = require('express');
const chalk = require('chalk');
const app = express();
const ws = require('express-ws')(app);

const get_realtime_news = require('./routes/get_realtime_news.js');
const get_realtime_news_ws = require('./routes/get_realtime_news_ws.js');

app.use('/', express.static('static'));
app.use('/modules', express.static('node_modules'));

get_realtime_news(app);
get_realtime_news_ws(app);

const server = app.listen(3000, function () {
  const host = server.address().address;
  const port = server.address().port;
  console.log();
  console.log(chalk.green('listening at http://%s:%s'), host, port);
  console.log();
});
