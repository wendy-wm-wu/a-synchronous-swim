const fs = require('fs');
const path = require('path');
const headers = require('./cors');
const multipart = require('./multipartUtils');
const messageQueueModule = require('./messageQueue');

// Path for the background image ///////////////////////
module.exports.backgroundImageFile = path.join('.', 'background.jpg');
////////////////////////////////////////////////////////

let messageQueue = [];
module.exports.initialize = (queue) => {
  messageQueue = queue;
};

module.exports.router = (req, res, next = ()=>{}) => {
  // console.log('Serving request type ' + req.method + ' for url ' + req.url);
  res.writeHead(200, headers);
  if (req.method === 'GET') {
    res.end(JSON.stringify({messageQueue: messageQueue}));
    //empty the queue
    while (messageQueue.length > 0) {
      messageQueueModule.dequeue();
    }
  } else {
    res.end();
  }


  next(); // invoke next() at the end of a request to help with testing!
};