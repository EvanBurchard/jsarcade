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
  this.mole.draw(100, 100);
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
game.mole = {
  size: 40,
  color: '#557',
  noseSize: 8,
  noseColor: "#c55",
  eyeSize: 5,
  eyeOffset: 10, 
  eyeColor: "#000",
  draw: function(xPosition, yPosition){
    this.drawHead(xPosition, yPosition);
    this.drawEyes(xPosition, yPosition);
    this.drawNose(xPosition, yPosition);
    this.drawWhiskers(xPosition, yPosition);
  },
  drawHead: function(xPosition, yPosition){
    atom.context.beginPath(); 
    atom.context.fillStyle = this.color;
    atom.context.arc(xPosition, yPosition, this.size, 0, Math.PI*2); 
    atom.context.fill();
  },
  drawNose: function(xPosition, yPosition){
    atom.context.beginPath(); 
    atom.context.fillStyle = this.noseColor;
    atom.context.arc(xPosition, yPosition, this.noseSize, 0, Math.PI*2); 
    atom.context.fill();
  },
  drawEyes: function(xPosition, yPosition){
    atom.context.beginPath(); 
    atom.context.fillStyle = this.eyeColor;
    atom.context.arc(xPosition + this.eyeOffset, yPosition - this.eyeOffset, this.eyeSize, 0, Math.PI*2); 
    atom.context.fill();
    atom.context.beginPath(); 
    atom.context.fillStyle = this.eyeColor;
    atom.context.arc(xPosition - this.eyeOffset, yPosition - this.eyeOffset, this.eyeSize, 0, Math.PI*2); 
    atom.context.fill();
  },
  drawWhiskers: function(xPosition, yPosition){
    atom.context.beginPath(); 
    atom.context.moveTo(xPosition - 10, yPosition); 
    atom.context.lineTo(xPosition - 30, yPosition); 
    atom.context.moveTo(xPosition + 10, yPosition); 
    atom.context.lineTo(xPosition + 30, yPosition); 
    atom.context.moveTo(xPosition - 10, yPosition + 5); 
    atom.context.lineTo(xPosition - 30, yPosition + 10); 
    atom.context.moveTo(xPosition + 10, yPosition + 5); 
    atom.context.lineTo(xPosition + 30, yPosition + 10); 
    atom.context.stroke();
  }
}
window.onblur = function() {
  return game.stop();
};
window.onfocus = function() {
  return game.run();
};
game.run();
