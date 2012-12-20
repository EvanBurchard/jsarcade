window.onload = function() {
  Crafty.init();
  Crafty.c("blue");
  Crafty.c("red");
  
  Crafty.viewport.scale(3.5);
  var iso = Crafty.isometric.size(16);
  var mapWidth = 20;
  var mapHeight = 40;
  Crafty.sprite(16, "sprites.png", {
    grass: [0,0,1,1],
    selected_grass: [1,0,1,1],
    blue_box: [2,0,1,1],
    blue_one: [3,0,1,1],
    blue_two: [4,0,1,1],
    blue_three: [5,0,1,1],
    blue_bomb: [6,0,1,1],
    blue_flag: [7,0,1,1],
    red_box: [8,0,1,1],
    red_one: [9,0,1,1],
    red_two: [10,0,1,1],
    red_three: [11,0,1,1],
    red_bomb: [12,0,1,1],
    red_flag: [13,0,1,1],
    selected_box: [14,0,1,1]
  });
  var unitClicked = null;
  var moveUnit = function(place){
    var xDistance = Math.abs(unitClicked.x - place.x);
    var yDistance = Math.abs(unitClicked.y - place.y);
    var distance = Math.sqrt(Math.pow(xDistance, 2) + Math.pow(yDistance, 2)*4);
    unitClicked.tween({x: place.x, y: place.y}, Math.round(distance*3))
    unitClicked.addComponent(unitClicked.trueSprite);
    unitClicked = null;
  };
  var setMap = function(){
    for(var x = 0; x < mapWidth; x++) {
      for(var y = 0; y < mapHeight; y++) {
        var bias = ((y % 2) ? 1 : 0);
        var z = x+y + bias;
        var tile = Crafty.e("2D, DOM, grass, Mouse")
          .attr('z',z)
          .areaMap([7,0],[8,0],[15,5],[15,6],[8,9],[7,9],[0,6],[0,5])
          .bind("MouseOver", function() {
            this.addComponent("selected_grass");
            this.removeComponent("grass");
          }).bind("MouseOut", function() {
            this.addComponent("grass");
            this.removeComponent("selected_grass");
          }).bind("Click", function() {
            if(unitClicked){
              moveUnit(this);
            }
          });
        
        iso.place(x,y,0, tile);
      }
    }
  };
  setMap();
  var placeUnits = function(units){
    player.units = [];
    player.enemyUnits = [];
    for(var i = 0; i < units.length; i++){
      var unitInfo = units[i];
      var controllable = unitInfo.color === player.color;
      unitInfo.trueSprite = unitInfo.color + "_" + unitInfo.type;
      if(controllable){
        unitSprite = unitInfo.color + "_" + unitInfo.type;
      }else{
        unitSprite = unitInfo.color + "_box";
      }
      var componentList = "2D, DOM, Mouse, Tween, Collision, " + unitInfo.color + ", " + unitSprite;
      var unit = Crafty.e(componentList)
            .attr('z',100)
            .areaMap([7,0],[8,0],[14,3],[14,8],[8,12],[7,12],[2,8],[2,3])
            .collision([7,0],[8,0],[14,3],[14,8],[8,12],[7,12],[2,8],[2,3])
      unit.controllable = controllable;
      unit.trueSprite = unitInfo.trueSprite;
      unit.xPosition = function(){
        return this.x;
      };
      unit.yPosition = function(){
        return this.y;
      };
      unit.hiding = true;
      unit.alive = true;
      unit.color = unitInfo.color;
      unit.type = unitInfo.type;
      unit.bind("Click", function() {
        if(unitClicked){
          if(unitClicked !== this){
            moveUnit(this);
          };
        }else{
          if(this.controllable){
            this.removeComponent(this.trueSprite);
            this.addComponent(this.color + '_box');
            unitClicked = this;
          };
        };
      });
      var collidesWithColor = (unit.color === "blue" ? "red" : "blue");
      unit.onHit(collidesWithColor, function(e){
        this.hiding = false;
        e[0].obj.hiding = false;
        if(this.type === "one"){
          if(e[0].obj.type === "one" || e[0].obj.type === "two" || e[0].obj.type === "three"){
            this.alive = false;
          };
        }else if(this.type === "two"){
          if(e[0].obj.type === "two" || e[0].obj.type === "three" || e[0].obj.type === "bomb"){
            this.alive = false;
          };
        }else if(this.type === "three"){
          if(e[0].obj.type === "three" || e[0].obj.type === "bomb"){
            this.alive = false;
          };
        }else if(this.type === "bomb"){
          if(e[0].obj.type === "one"){
            this.alive = false;
          };
        }else if(this.type === "flag"){
          if(e[0].obj.type === "one" || e[0].obj.type === "two" || e[0].obj.type === "three"){
            this.alive = false;
          };
        }
      })
      iso.place(unitInfo.xPosition, unitInfo.yPosition, 0, unit);
      if(unit.controllable){
        player.units.push(unit);
      }else{
        player.enemyUnits.push(unit);
      }
    };
  }

  var socket = io.connect('http://localhost:1234');
  socket.on('place units', function(units){
    placeUnits(units);
    var updateInterval = 1000/Crafty.timer.getFPS(); 
    setInterval(function(){
      socket.emit('update positions', player.unitsWithLimitedData());
      player.updateCasualities();
    }, updateInterval);
  });
  socket.on('update enemy positions', function(enemies){
    player.updateEnemyPositions(enemies);
  });
  socket.on('initialize player', function(playerData){
    player = playerData;
    player.unitsWithLimitedData = function(){
      unitsToReturn = [];
      for(var i = 0; i < this.units.length; i++){
        unitsToReturn.push({x: this.units[i].x, y: this.units[i].y, hiding: this.units[i].hiding, alive: this.units[i].alive});
      }
      return unitsToReturn;
    };
    player.updateCasualities = function(enemies){
      for(var i = 0; i < this.units.length; i++){
        if(this.units[i].alive === false){
          this.units[i].destroy();
        }
      };
    }
    player.updateEnemyPositions = function(enemies){
      for(var i = 0; i < this.enemyUnits.length; i++){
        this.enemyUnits[i].x = enemies[i].x;
        this.enemyUnits[i].y = enemies[i].y;
        this.enemyUnits[i].hiding = enemies[i].hiding;
        this.enemyUnits[i].alive = enemies[i].alive;
        if(this.enemyUnits[i].hiding === false){
          this.enemyUnits[i].addComponent(this.enemyUnits[i].trueSprite);
          if(this.enemyUnits[i].alive === false){
            player.markToDestroy(this.enemyUnits[i]);
          }
          if(this.enemyUnits[i].reallySuperDead === true){
            this.enemyUnits[i].destroy();
          };
        };
      }
    };
    player.markToDestroy = function(enemy){
      setTimeout(function(){
        enemy.reallySuperDead = true;
      }, 1000);
    }
  });
  socket.on('user disconnected', function(){
    alert("Your buddy has left or refreshed.  Refresh to join a new room.");
  });
};
