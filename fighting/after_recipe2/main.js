var gamejs = require('gamejs');
var screenWidth = 1200;
var screenHeight = 600;
var scale = 8;
var spriteSize = 16;
var numSprites = 4;

function scaleUp(image){
  return gamejs.transform.scale(image, [spriteSize*scale, spriteSize*scale]);
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
  for (var i=0; i < surfaceCache.length; i++) {
    var sprite = scaleUp(surfaceCache[i]);
    display.blit(sprite, [i*spriteSize*scale, spriteSize*i*scale]);
  };
};
gamejs.preload(['sprites.png']);
gamejs.ready(main);
