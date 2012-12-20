var io = require('socket.io').listen(1234);
io.sockets.on('connection', function (socket) {
  socket.emit('started', {ahoy: "hoy"});
});
