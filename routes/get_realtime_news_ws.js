const request = require('../util/request.js');
const config = require('../config.js');
const uuidv4 = require('uuid/v4');
const chalk = require('chalk');
const WebSocket = require('websocket').client;

module.exports = function (app) {
  const headers = config.headers();

  headers.Origin = 'http://www.yuncaijing.com';

  app.ws('/ws9503', function (ws, req) {
    doConnect('ws9503', ws);
  });
  app.ws('/ws9507', function (ws, req) {
    doConnect('ws9507', ws);
  });

  function doConnect(type, ws) {
    let connection = null;

    connectRemoveWs(type, function (c) {
      connection = c;
    }, function (data) {
      if (ws.readyState === ws.OPEN) {
        ws.send(data);
      } else {
        ws.close();
      }
    });

    ws.on('open', function (msg) {
      console.log(chalk.green(`open ${type}: `), msg);
    });
    ws.on('error', function (msg) {
      console.log(chalk.green(`error ${type}: `), msg);
      if (connection) {
        connection.close();
      }
    });
    ws.on('message', function (msg) {
      console.log(chalk.green(`receive message ${type}: `), msg);
      doSend();

      function doSend() {
        if (connection) {
          console.log(chalk.green(`send message ${type}: `), msg);
          if (connection.readyState === connection.OPEN) {
            connection.sendUTF(msg);
          }
        } else {
          setTimeout(doSend, 300);
        }
      }

      console.log();
    });
    ws.on('close', function (msg) {
      console.log('close', type);
      connection.close();
    });
  }

  function connectRemoveWs(type, callback, message) {
    const ws = new WebSocket();
    ws.connect(config.urls[type], undefined, headers.Origin, headers);
    ws.on('connectFailed', function (error) {
      console.log(`remote Connect Failed ${type}: ` + error.toString());
    });

    ws.on('connect', function (connection) {
      callback(connection);

      console.log(chalk.green(`remote WebSocket Client Connected ${type}`));

      connection.on('error', function (error) {
        console.log(chalk.red(`remote Connection Error ${type}: `), error.toString());
        connectRemoveWs(type, callback, message);
      });
      connection.on('close', function (error) {
        console.log(chalk.red(`remote echo-protocol Connection Closed ${type}: `), error.toString());
      });
      connection.on('message', function (event) {
        console.log();
        console.log(chalk.green(`remote message ${type} from`));
        console.log();
        message(event.utf8Data);
      });
    });
  }
}
