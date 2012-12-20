var gamejs = require('gamejs');
var font = require('gamejs/font');
var screenWidth = 1200;
var screenHeight = 600;
var scale = 8;
var spriteSize = 16;
var numSprites = 4;
var up = 1, down = 2, left = 4, right = 8, canChange = 16;

function scaleUp(image){
  return gamejs.transform.scale(image, [spriteSize*scale, spriteSize*scale]);
};
function Player(placement, form, forms){
  this.placement = placement;
  this.form = form;
  this.forms = forms;
  this.mask = 16;
};
Player.prototype.changeForm = function(next_or_previous) {
  this.form = this.forms[this.form[next_or_previous]];
};
Player.prototype.update = function(msDuration) {
  if(this.mask & up){
    if (this.mask & canChange) {
      this.changeForm('previous');
      this.mask &= ~canChange;
    }
  }
  if(this.mask & down){
    if (this.mask & canChange) {
      this.changeForm('next');
      this.mask &= ~canChange;
    }
  };
  if(this.mask & left){
    this.placement = this.placement - 14;
  }else if(this.mask & right){
    this.placement = this.placement + 14;
  }
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
    if(event.type === gamejs.event.KEY_DOWN){ 
      if(event.key === gamejs.event.K_UP){
        player2.mask |= up;
      }else if(event.key === gamejs.event.K_DOWN){
        player2.mask |= down;
      }else if(event.key === gamejs.event.K_LEFT){
        player2.mask |= left;
        player2.mask &= ~right;
      }else if(event.key === gamejs.event.K_RIGHT){
        player2.mask |= right;
        player2.mask &= ~left;
      }else if(event.key === gamejs.event.K_w){
        player1.mask |= up;
      }else if(event.key === gamejs.event.K_s){
        player1.mask |= down;
      }else if(event.key === gamejs.event.K_a){
        player1.mask |= left;
        player1.mask &= ~right;
      }else if(event.key === gamejs.event.K_d){
        player1.mask |= right;
        player1.mask &= ~left;
      }
    } else if(event.type === gamejs.event.KEY_UP){ 
      if(event.key === gamejs.event.K_UP){
        player2.mask &= ~up;
        player2.mask |= canChange;
      }else if(event.key === gamejs.event.K_DOWN){
        player2.mask &= ~down;
        player2.mask |= canChange;
      }else if(event.key === gamejs.event.K_RIGHT){
        player2.mask &= ~right;
      }else if(event.key === gamejs.event.K_LEFT){
        player2.mask &= ~left;
      }else if(event.key === gamejs.event.K_w){
        player1.mask &= ~up;
        player1.mask |= canChange;
      }else if(event.key === gamejs.event.K_a){
        player1.mask &= ~left;
      }else if(event.key === gamejs.event.K_s){
        player1.mask &= ~down;
        player1.mask |= canChange;
      }else if(event.key === gamejs.event.K_d){
        player1.mask &= ~right;
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
    player1.update();
    player2.update();
    player1.draw(display);
    player2.draw(display);
  };
  var player1 = new Player(0, forms['person'], forms);
  var player2 = new Player(1000, forms['person'], forms);
  gamejs.time.fpsCallback(gameTick, this, 60);
};
gamejs.preload(['sprites.png']);
gamejs.ready(main);
