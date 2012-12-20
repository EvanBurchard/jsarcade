window.onload = function() {
  var socket = io.connect('http://localhost:1234');
  socket.on('started', function(data){
    console.log(data);
  });
};
