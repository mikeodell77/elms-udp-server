var PORT = 33333;
var HOST = '172.31.38.37';
var request = require('request');
var FormData = require('form-data');

var dgram = require('dgram');
var server = dgram.createSocket('udp4');

server.on('listening', function() {
  var address = server.address;
  console.log('UDP Server listening on ' + address.address + ":" + address.port);
});

server.on('error', function(err) {
  console.log('error : ' + err);
});

server.on('message', function(message, remote) {
  console.log(remote.address + ":" + remote.port + ' - ' + message);

  var form = new FormData();
  form.append("From", remote.address);
  form.append("Body", message);

  form.submit('http://envicor-stats.herokuapp.com/new_board_event', function(err, res) {
    res.resume();
  });

  var server_response = new Buffer("ok");
  server.send(server_response, 0, server_response.length, remote.port, remote.address);

});

server.bind(PORT, HOST);