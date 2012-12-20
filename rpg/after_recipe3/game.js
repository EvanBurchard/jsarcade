enchant();
window.onload = function(){
  var game = new Game(300, 300);
  game.spriteSheetWidth = 256;
  game.spriteSheetHeight = 16;
  game.fps = 15;
  game.spriteWidth = 16;
  game.spriteHeight = 16;
  game.preload('sprites.png');
  var map = new Map(game.spriteWidth, game.spriteHeight);
  var foregroundMap = new Map(game.spriteWidth, game.spriteHeight);
  var setMaps = function(){
    map.image = game.assets['sprites.png'];
    map.loadData(mapData);
    foregroundMap.image = game.assets['sprites.png'];
    foregroundMap.loadData(foregroundData);
  };
  var setStage = function(){
    var stage = new Group();
    stage.addChild(map);
    stage.addChild(player);
    stage.addChild(foregroundMap);
    game.rootScene.addChild(stage);
  };
  var player = new Sprite(game.spriteWidth, game.spriteHeight);
  var setPlayer = function(){
    player.spriteOffset = 5;
    player.startingX = 6;
    player.startingY = 14;
    player.x = player.startingX * game.spriteWidth;
    player.y = player.startingY * game.spriteHeight;
    player.direction = 0;
    player.walk = 0;
    player.frame = player.spriteOffset + player.direction; 
    player.image = new Surface(game.spriteSheetWidth, game.spriteSheetHeight);
    player.image.draw(game.assets['sprites.png']);
  };
  player.move = function(){
    this.frame = this.spriteOffset + this.direction * 2 + this.walk;
    if (this.isMoving) {
      this.moveBy(this.xMovement, this.yMovement);
      if (!(game.frame % 2)) {
        this.walk++;
        this.walk %= 2;
      }
      if ((this.xMovement && this.x % 16 === 0) || (this.yMovement && this.y % 16 === 0)) {
        this.isMoving = false;
        this.walk = 1;
      }
    } else {
      this.xMovement = 0;
      this.yMovement = 0;
      if (game.input.up) {
        this.direction = 1;
        this.yMovement = -4;
      } else if (game.input.right) {
        this.direction = 2;
        this.xMovement = 4;
      } else if (game.input.left) {
        this.direction = 3;
        this.xMovement = -4;
      } else if (game.input.down) {
        this.direction = 0;
        this.yMovement = 4;
      }
      if (this.xMovement || this.yMovement) {
        var x = this.x + (this.xMovement ? this.xMovement / Math.abs(this.xMovement) * 16 : 0);
        var y = this.y + (this.yMovement ? this.yMovement / Math.abs(this.yMovement) * 16 : 0);
        if (0 <= x && x < map.width && 0 <= y && y < map.height) {
          this.isMoving = true;
          this.move();
        }
      }
    }
  };
  game.focusViewport = function(){
    var x = Math.min((game.width  - 16) / 2 - player.x, 0);
    var y = Math.min((game.height - 16) / 2 - player.y, 0);
    x = Math.max(game.width,  x + map.width)  - map.width;
    y = Math.max(game.height, y + map.height) - map.height;
    game.rootScene.firstChild.x = x;
    game.rootScene.firstChild.y = y;
  };
  game.onload = function(){
    setMaps();
    setPlayer();
    setStage();
    player.on('enterframe', function() {
      player.move();
    });
    game.rootScene.on('enterframe', function(e) {
      game.focusViewport();
    });
  };
  game.start();
};
