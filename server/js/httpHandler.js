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

  //gets picture
  // fs.readFile('/Users/student/code/hrsf122-a-synchronous-swim/server/background.jpg', function(err, data) {
  //   if (err) throw err;
  //   console.log(req);
  //   res.writeHead(200, headers);
  //   res.write(data);
  //   res.end();
  // });
  //above gets picture

  //below moves swimmers
  res.writeHead(200, headers);
  if (req.method === 'GET') {
    res.write(JSON.stringify({messageQueue: messageQueue}))
    res.end();
    //empty the queue
    while (messageQueue.length > 0) {
      messageQueueModule.dequeue();
    }
  } else {
    res.end();
  }
  //above moves swimmers


  next(); // invoke next() at the end of a request to help with testing!
};