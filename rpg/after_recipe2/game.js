enchant();
window.onload = function(){
  var game = new Game(300, 300);
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
    stage.addChild(foregroundMap);
    game.rootScene.addChild(stage);
  };
  game.onload = function(){
    setMaps();
    setStage();
  };
  game.start();
};
