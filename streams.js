const fs = require('fs');
const server = require('http').createServer();

server.on('request', (req, res) => {
  //Solution 1 not appropiated for real projects
  /*fs.readFile('test-file.txt', (err, data) => {
    if (err) console.error(err);
    res.end(data);
  });

  //Solution 2 using streams. not optimial
  const readable = fs.createReadStream('test-file.txt');

  readable.on('data', (chunck) => {
    res.write(chunck);
  });
  readable.on('end', () => {
    res.end();
  });
  readable.on('error', (err) => {
    console.log(err);
    res.statusCode = 500;
    res.end('File not found');
  });*/

  //Solution 3 reading from the disk is faster that the stream of network (backpressure)
  const readable = fs.createReadStream('test-file.txt');
  readable.pipe(res); //easiest way of consuming and writtting stream
  //readebleSource.pipe(writeableDest);
});

server.listen(8000, 'localhost', () => {
  console.log('listening on localhost:8000');
});
