const fs = require('fs');
const path = require('path');
const headers = require('./cors');
const multipart = require('./multipartUtils');
const messageQueueModule = require('./messageQueue');
const { parse } = require('querystring');

// Path for the background image ///////////////////////
module.exports.backgroundImageFile = path.join('.', 'background.jpg');
////////////////////////////////////////////////////////

let messageQueue = [];
module.exports.initialize = (queue) => {
  messageQueue = queue;
};

module.exports.router = (req, res, next = ()=>{}) => {
  // console.log('Serving request type ' + req.method + ' for url ' + req.url);
  if (req.method === 'GET') {
    if (req.url === '/background.jpg') {
      let filename = path.join('.', 'spec', 'water-lg.multipart');
      fs.readFile(module.exports.backgroundImageFile, function(err, fileData) {
        if (err) throw error;
        res.write(fileData);
        res.end();


        // let file = multipart.getFile(fileData);
        // fs.writeFile(module.exports.backgroundImageFile, file.data, function(err) {
        //   if (err) throw err;

        // });
      });
      res.writeHead(200, headers);


    } else if (req.url === '/swim') {
      res.writeHead(200, headers);
      res.write(JSON.stringify({messageQueue: messageQueue}))
      res.end();
      while (messageQueue.length > 0) {
        messageQueueModule.dequeue();
      }
    } else {
      res.writeHead(404, headers);
      res.end();
    }
  } else if (req.method === 'POST') {
    res.writeHead(200, headers);
    let body = new Buffer('');
    req.on('data', chunk => {
      body = Buffer.concat([body, chunk]);
    });
    req.on('end', () => {
      // console.log(body);
      let file = multipart.getFile(body);
      console.log(file);
      fs.writeFile(module.exports.backgroundImageFile, file.data, function(err) {
        if (err) throw err;
      })
      res.end('ok');
    });
    //grab file
    //read file
    //write file into background.jpg
  } else {
    res.writeHead(200, headers);
    res.end();
  }
  next(); // invoke next() at the end of a request to help with testing!
};
