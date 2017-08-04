const request = require('../util/request.js');
const config = require('../config.js');
const uuidv4 = require('uuid/v4');
const chalk = require('chalk');
const WebSocket = require('websocket').client;

module.exports = function (app) {
  const headers = config.headers();
  const ws9503 = new WebSocket();
  let ws9503Conection = null;
  const ws9507 = new WebSocket();
  let ws9507Conection = null;

  headers.Origin = 'http://www.yuncaijing.com';

  ws9503.connect(config.urls.ws9503, undefined, headers.Origin, headers);
  ws9507.connect(config.urls.ws9507, undefined, headers.Origin, headers);

  const ws9503Arr = {};
  const ws9507Arr = {};

  app.ws('/ws9503', function (ws, req) {
    const uuid = uuidv4();
    ws9503Arr[uuid] = ws;

    ws.on('message', function (msg) {
      console.log(chalk.green('receive message ws9503: '), msg);
      if (ws9503Conection) {
        console.log(chalk.green('send message ws9503: '), msg);
        ws9503Conection.sendUTF(msg);
      }
      console.log();
    });
    ws.on('closed', function (msg) {
      console.log('closed', 'ws9503');
      delete ws9503Arr[uuid];
    });
  });


  app.ws('/ws9507', function (ws, req) {
    const uuid = uuidv4();
    ws9507Arr[uuid] = ws;

    ws.on('message', function (msg) {
      console.log(chalk.green('receive message ws9507: '), msg);
      if (ws9507Conection) {
        console.log(chalk.green('send message ws9507: '), msg);
        ws9507Conection.sendUTF(msg);
      }
      console.log();
    });
    ws.on('closed', function (msg) {
      console.log('closed', 'ws9507');
      delete ws9507Arr[uuid];
    });
  });



  ws9503.on('connectFailed', function (error) {
    console.log('Connect Failed ws9503: ' + error.toString());
  });

  ws9503.on('connect', function (connection) {
    ws9503Conection = connection;

    console.log(chalk.green('WebSocket Client Connected ws9503'));

    connection.on('error', function (error) {
      console.log(chalk.red('Connection Error ws9503: '), error.toString());
    });
    connection.on('close', function (error) {
      console.log(chalk.red('echo-protocol Connection Closed ws9503: '), error.toString());
    });
    connection.on('message', function (event) {
      console.log(chalk.green('message ws9503 from remote'));
      console.log();

      for (const ws in ws9503Arr) {
        if (ws9503Arr[ws].readyState === ws9503Arr[ws].OPEN) {
          ws9503Arr[ws].send(event.utf8Data);
        } else {
          ws9503Arr[ws].close();
          delete ws9503Arr[ws];
        }
      }
    });
  });


  ws9507.on('connectFailed', function (error) {
    console.log('Connect Failed ws9507: ' + error.toString());
  });

  ws9507.on('connect', function (connection) {
    ws9507Conection = connection;

    console.log(chalk.green('WebSocket Client Connected ws9507'));

    connection.on('error', function (error) {
      console.log(chalk.red('Connection Error ws9507: '), error.toString());
    });
    connection.on('close', function (error) {
      console.log(chalk.red('echo-protocol Connection Closed ws9507: '), error.toString());
    });
    connection.on('message', function (event) {
      console.log(chalk.green('message ws9507 from remote'));
      console.log();

      for (const ws in ws9507Arr) {
        if (ws9507Arr[ws].readyState === ws9507Arr[ws].OPEN) {
          ws9507Arr[ws].send(event.utf8Data);
        } else {
          ws9507Arr[ws].close();
          delete ws9507Arr[ws];
        }
      }
    });
  });

}
