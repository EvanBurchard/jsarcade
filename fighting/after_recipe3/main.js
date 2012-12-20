var gamejs = require('gamejs');
var screenWidth = 1200;
var screenHeight = 600;
var scale = 8;
var spriteSize = 16;
var numSprites = 4;

function scaleUp(image){
  return gamejs.transform.scale(image, [spriteSize*scale, spriteSize*scale]);
};
function Player(placement, sprite){
  this.placement = placement;
  this.sprite = sprite;
};
Player.prototype.draw = function(display) {
  sprite = scaleUp(this.sprite);
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
  var rock = surfaceCache[0];
  var paper = surfaceCache[1];
  var scissors = surfaceCache[2];
  var person = surfaceCache[3];
  function handleEvent(event) {
    if(gamejs.event.KEY_DOWN){ 
      if(event.key === gamejs.event.K_UP){
        player2.sprite = person;
      }else if(event.key === gamejs.event.K_DOWN){
        player2.sprite = paper;
      }else if(event.key === gamejs.event.K_RIGHT){
        player2.sprite = scissors;
      }else if(event.key === gamejs.event.K_LEFT){
        player2.sprite = rock;
      }else if(event.key === gamejs.event.K_w){
        player1.sprite = person;
      }else if(event.key === gamejs.event.K_a){
        player1.sprite = rock;
      }else if(event.key === gamejs.event.K_s){
        player1.sprite = paper;
      }else if(event.key === gamejs.event.K_d){
        player1.sprite = scissors;
      }
    }
  };
  function gameTick(msDuration) {
    gamejs.event.get().forEach(function(event) {
      handleEvent(event);
    });
    display.clear();
    player1.draw(display);
    player2.draw(display);
  };
  var player1 = new Player(0, person);
  var player2 = new Player(200, person);
  gamejs.time.fpsCallback(gameTick, this, 60);
};
gamejs.preload(['sprites.png']);
gamejs.ready(main);
