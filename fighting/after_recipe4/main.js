var gamejs = require('gamejs');
var font = require('gamejs/font');
var screenWidth = 1200;
var screenHeight = 600;
var scale = 8;
var spriteSize = 16;
var numSprites = 4;

function scaleUp(image){
  return gamejs.transform.scale(image, [spriteSize*scale, spriteSize*scale]);
};
function Player(placement, form, forms){
  this.placement = placement;
  this.form = form;
  this.forms = forms;
};
Player.prototype.nextForm = function() {
  this.form = this.forms[this.form["next"]];
};
Player.prototype.previousForm = function() {
  this.form = this.forms[this.form["previous"]];
};

Player.prototype.draw = function(display) {
  sprite = scaleUp(this.form.image);
  display.blit(sprite, [spriteSize+this.placement, spriteSize]);
};

function main() {
  var display = gamejs.display.setMode([screenWidth, screenHeight]);
  var sprites = gamejs.image.load('sprites.png');
  var surfaceCache = [];
  for (var i = 0; i < numSprites; i++){
    var surface = new gamejs.Surface([spriteSize, spriteSize]);
    var rect = new gamejs.Rect(spriteSize*i, 0, spriteSize, spriteSize);
    var imgSize = new gamejs.Rect(0, 0, spriteSize, spriteSize);
    surface.blit(sprites, imgSize, rect);
    surfaceCache.push(surface);
  };
  var forms = {
    rock: 
     {image: surfaceCache[0],
      next: 'paper',
      previous: 'scissors'},
    paper:
      {image: surfaceCache[1],
      next: 'scissors',
      previous: 'rock'},
    scissors:
      {image: surfaceCache[2],
      next: 'rock',
      previous: 'paper'},
    person:
      {image: surfaceCache[3],
      next: 'rock',
      previous: 'scissors'}
  };

  function handleEvent(event) {
    if(gamejs.event.KEY_DOWN){ 
      if(event.key === gamejs.event.K_UP){
        player2.previousForm();
      }else if(event.key === gamejs.event.K_DOWN){
        player2.nextForm();
      }else if(event.key === gamejs.event.K_RIGHT){
        player2.placement = player2.placement + 25;
      }else if(event.key === gamejs.event.K_LEFT){
        player2.placement = player2.placement - 25;
      }else if(event.key === gamejs.event.K_w){
        player1.previousForm();
      }else if(event.key === gamejs.event.K_a){
        player1.placement = player1.placement - 25;
      }else if(event.key === gamejs.event.K_s){
        player1.nextForm();
      }else if(event.key === gamejs.event.K_d){
        player1.placement = player1.placement + 25;
      }
    }
  };

  function gameTick(msDuration) {
    gamejs.event.get().forEach(function(event) {
      handleEvent(event);
    });
    display.clear();
    var defaultFont = new font.Font("40px Arial");
    var textSurface = defaultFont.render("ROCK PAPER SCISSORS", "#000000");
    display.blit(textSurface, [0, 160]);
    player1.draw(display);
    player2.draw(display);
  };
  var player1 = new Player(0, forms['person'], forms);
  var player2 = new Player(1000, forms['person'], forms);
  gamejs.time.fpsCallback(gameTick, this, 60);
};
gamejs.preload(['sprites.png']);
gamejs.ready(main);
