console.log("ahoy hoy, check me out at http://localhost:1234");
var http = require('http');
http.createServer(function (request, response) {
  console.log("Request received.");
  response.write('<h1>AHOY HOY!</h1>');
  response.end();
}).listen(1234); 
