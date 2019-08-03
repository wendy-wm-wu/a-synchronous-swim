const httpHandler = require('./httpHandler');

const messages = []; // the storage unit for messages

module.exports.enqueue = (message) => {
  console.log(`Enqueing message: ${message}`);
  messages.push(message);
  httpHandler.initialize(messages);
};

module.exports.dequeue = () => {
  // returns undefined if messages array is empty
  if (message.length === 0) {
    return undefined;
  }
  return messages.shift();
};