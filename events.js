const EventEmitter = require('events');
const http = require('http');

//First approach
const myEmitter = new EventEmitter();

//observers or listeners. If there are more thann one they will execute in sync way, one after another
myEmitter.on('newSale', () => console.log('There is a new sale'));
myEmitter.on('newSale', () => console.log('Costumer name : Jonas'));
myEmitter.on('newSale', (stock) =>
  console.log(`There are now ${stock} items left in stock.`)
);

myEmitter.emit('newSale', 9);

console.log('---');
//Second approach
class Sales extends EventEmitter {
  constructor() {
    super();
  }
}
const myEmitter2 = new Sales();
myEmitter2.on('newSale', () => console.log('There is a new sale'));
myEmitter2.on('newSale', () => console.log('Costumer name : Jonas'));
myEmitter2.on('newSale', (stock) =>
  console.log(`There are now ${stock} items left in stock.`)
);

myEmitter2.emit('newSale', 9);
//modules as http request, file system, and other core modules works like this, inherit from EventEmitter

console.log('---');
////Another example
const server = http.createServer();
server.on('request', (req, res) => {
  console.log('Request received!');
  console.log(req.url);
  res.end('Request received!');
});
server.on('request', (req, res) => {
  console.log('Another request 😊!');
});

server.on('close', (req, res) => {
  console.log('Server closed 😒!');
});

server.listen(8000, '127.0.0.1', () => {
  console.log('Waiting for requests...👍');
});
