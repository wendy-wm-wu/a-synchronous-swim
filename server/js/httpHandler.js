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
  fs.readFile('/Users/student/code/hrsf122-a-synchronous-swim/server/background.jpg', function(err, data) {
    if (err) throw err;
    res.writeHead(200, {'Content-Type': 'image/jpg'});
    res.write(data);
    res.end(JSON.stringify({messageQueue: messageQueue}));
    while (messageQueue.length > 0) {
      messageQueueModule.dequeue();
    }
  });
  // res.writeHead(200, headers);
  // if (req.method === 'GET') {


  // } else {
  //   res.end();
  // }


  next(); // invoke next() at the end of a request to help with testing!
};