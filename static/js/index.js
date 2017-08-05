const socket9503 = new WebSocket(`ws://${window.location.host}/ws9503`);
const socket9507 = new WebSocket(`ws://${window.location.host}/ws9507`);

// Connection opened
socket9503.addEventListener('open', function (event) {
  socket9503.send('{"type":"login","data":{"room":1,"clientid":""}}');
  setInterval(() => {
    socket9503.send('{"type":"ping","data":"ping"}')
  }, 60000);
});

// Listen for messages
socket9503.addEventListener('message', function (event) {
  console.log('Message from server socket9503: ', event.data);
  try {
    $('body').append(`<div>${JSON.stringify(JSON.parse(event.data))}</div>`)
  } catch (e) {
    $('body').append(`<div>${event.data}</div>`)
  }
});

// Listen for messages
socket9503.addEventListener('closed', function (event) {
  console.log('socket9503 closed');
});


// Connection opened
socket9507.addEventListener('open', function (event) {
  socket9507.send('{"type":"instantList","data":{"codes":[600853]}}');
});

// Listen for messages
socket9507.addEventListener('message', function (event) {
  console.log('Message from server socket9507: ', event.data);
  try {
    $('body').append(`<div>${JSON.stringify(JSON.parse(event.data))}</div>`)
  } catch (e) {
    $('body').append(`<div>${event.data}</div>`)
  }
});

// Listen for messages
socket9507.addEventListener('closed', function (event) {
  console.log('socket9507 closed');
});
