atom.input.bind(atom.key.LEFT_ARROW, 'left');
game = Object.create(Game.prototype);
game.update = function(dt) {
  if (atom.input.pressed('left')) {
    return console.log("player started moving left");
  } else if (atom.input.down('left')) {
    return console.log("player still moving left");
  }
};
game.draw = function() {
  atom.context.fillStyle = 'black';
  return atom.context.fillRect(0, 0, atom.width, atom.height);
};
window.onblur = function() {
  return game.stop();
};
window.onfocus = function() {
  return game.run();
};
game.run();
