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
  this.drawBackground();
  this.drawHoles(['A', 'S', 'D', 'F'], 145, 85);
};
game.drawHoles = function(holeLabels, xOffset, yOffset){
  for(i = 0; i < holeLabels.length; i++){
    atom.context.fillStyle = game.hole.color;
    var holeLocation = [xOffset + game.hole.spacing*i, yOffset];
    game.hole.draw(holeLocation, holeLabels[i]);
  }
};
game.hole = {
  size: 40,
  spacing: 280,
  color: '#311',
  labelOffset: 140,
  labelColor: '#000',
  labelFont: "130px monospace",
  draw: function(holeLocation, holeLabel){
    atom.context.beginPath(); 
    atom.context.arc(holeLocation[0], atom.height/2+holeLocation[1], this.size, 0, Math.PI*2, false); 
    atom.context.fill();
    atom.context.fillStyle = this.labelColor;
    atom.context.font = this.labelFont;
    atom.context.fillText(holeLabel, holeLocation[0] - this.size, atom.height/2+holeLocation[1] + this.labelOffset);
  }
};
game.drawBackground = function(){
  atom.context.beginPath();
  atom.context.fillStyle = '#34e';
  atom.context.fillRect(0, 0, atom.width, atom.height/2);
  atom.context.fillStyle = '#ee3';
  atom.context.arc(140, atom.height/2 -30, 90, Math.PI*2, 0); 
  atom.context.fill();
  atom.context.fillStyle = '#2e2';
  atom.context.fillRect(0, atom.height/2, atom.width, atom.height/2);
};
window.onblur = function() {
  return game.stop();
};
window.onfocus = function() {
  return game.run();
};
game.run();
