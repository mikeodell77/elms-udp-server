var PORT = 33333;
var HOST = '172.31.38.37';

var dgram = require('dgram');
var server = dgram.createSocket('udp4');

server.on('listening', function() {
  var address = server.address;
  console.log('UDP Server listening on ' + address.address + ":" + address.port);
});

server.on('error', function(err) {
  console.log(err);
});

server.on('message', function(message, remote) {
  console.log(remote.address + ":" + remote.port + ' - ' + message);
  var message = new Buffer("ok");
  server.send(message, 0, message.length, remote.port, remote.address);
});

server.bind(PORT, HOST);