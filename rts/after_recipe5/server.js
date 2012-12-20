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

var io = require('socket.io').listen(1234);
io.sockets.on('connection', function (socket) {
  var units = placeUnits();
  socket.emit('place units', units);
});
