var gamejs = require('gamejs');
var screenWidth = 1200;
var screenHeight = 600;
var scale = 8;
var spriteSheetWidth = 64;
var spriteSheetHeight = 16;

function main() {
  var display = gamejs.display.setMode([screenWidth, screenHeight]);
  var sprites = gamejs.image.load('sprites.png');
  sprites = gamejs.transform.scale(sprites, [spriteSheetWidth*scale, spriteSheetHeight*scale]);
  display.blit(sprites);
};
gamejs.preload(['sprites.png']);
gamejs.ready(main);
