var placeUnits = function(){
  var yLocations = [2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30, 32, 34, 36, 38];
  var pickY = function(alignment){
    var y = Math.floor(Math.random(yLocations.length)*yLocations.length);
    return yLocations.splice(y, 1) - alignment;
  };
  var xPositionRed = 18;
  var xPositionBlue = 1;

  return [
    {color: "red",
    type: "one",
    xPosition: xPositionRed,
    yPosition: pickY(1)},
    {color: "red",
    type: "one",
    xPosition: xPositionRed,
    yPosition: pickY(1)},
    {color: "red",
    type: "one",
    xPosition: xPositionRed,
    yPosition: pickY(1)},
    {color: "red",
    type: "two",
    xPosition: xPositionRed,
    yPosition: pickY(1)},
    {color: "red",
    type: "two",
    xPosition: xPositionRed,
    yPosition: pickY(1)},
    {color: "red",
    type: "three",
    xPosition: xPositionRed,
    yPosition: pickY(1)},
    {color: "red",
    type: "three",
    xPosition: xPositionRed,
    yPosition: pickY(1)},
    {color: "red",
    type: "bomb",
    xPosition: xPositionRed,
    yPosition: pickY(1)},
    {color: "red",
    type: "flag",
    xPosition: xPositionRed,
    yPosition: pickY(1)},
    {color: "blue",
    type: "one",
    xPosition: xPositionBlue,
    yPosition: pickY(0)},
    {color: "blue",
    type: "one",
    xPosition: xPositionBlue,
    yPosition: pickY(0)},
    {color: "blue",
    type: "one",
    xPosition: xPositionBlue,
    yPosition: pickY(0)},
    {color: "blue",
    type: "two",
    xPosition: xPositionBlue,
    yPosition: pickY(0)},
    {color: "blue",
    type: "two",
    xPosition: xPositionBlue,
    yPosition: pickY(0)},
    {color: "blue",
    type: "three",
    xPosition: xPositionBlue,
    yPosition: pickY(0)},
    {color: "blue",
    type: "three",
    xPosition: xPositionBlue,
    yPosition: pickY(0)},
    {color: "blue",
    type: "bomb",
    xPosition: xPositionBlue,
    yPosition: pickY(0)},
    {color: "blue",
    type: "flag",
    xPosition: xPositionBlue,
    yPosition: pickY(0)}
  ]
};

var playerId = 0;

var playerColor = function(){
  return (!(playerId % 2)) ? "red" : "blue";
}
var roomId = function(){
  return "room" + parseInt(Math.floor(playerId / 2), 10);
}
var units;

var io = require('socket.io').listen(1234);
io.sockets.on('connection', function (socket) {
  socket.playerColor = playerColor();
  socket.roomId = roomId();
  var player = {id: playerId,
             color: socket.playerColor,
             room: socket.roomId }
  socket.emit('initialize player', player);
  socket.join(socket.roomId);
  if(!(playerId % 2)){
    units = placeUnits();
  };

  socket.emit('place units', units);

  socket.on('update positions', function (data) {
    socket.broadcast.to(socket.roomId).emit('update enemy positions', data); 
  });
  playerId = playerId + 1;
  socket.on('disconnect', function () {
    socket.broadcast.to(socket.roomId).emit('user disconnected');
  });
});
