var Game = function(){
  var player = {
    init: function(){
      this.x = 10;
      this.y = 6;
      this.direction = 0;
      this.angle = 0;
      this.speed = 0;
      this.movementSpeed = 0.1;
      this.turnSpeed = 4 * Math.PI / 180; 
      this.move = function(){
        var moveStep = this.speed * this.movementSpeed;
        this.angle += this.direction * this.turnSpeed;
        var newX = this.x + Math.cos(this.angle) * moveStep;
        var newY = this.y + Math.sin(this.angle) * moveStep;
        if (!containsBlock(newX, newY)){
          this.x = newX;
          this.y = newY;
        };
      };
      this.draw = function(){
        var playerXOnMinimap = this.x * minimap.cellWidth;
        var playerYOnMinimap = this.y * minimap.cellHeight;
        minimap.context.fillStyle = "#000000";
        minimap.context.beginPath();
        minimap.context.arc(minimap.cellWidth*this.x, minimap.cellHeight*this.y, minimap.cellWidth/2, 0, 2*Math.PI, true); 
        minimap.context.fill();
        var projectedX = this.x + Math.cos(this.angle);
        var projectedY = this.y + Math.sin(this.angle);
        minimap.context.fillRect(minimap.cellWidth*projectedX - minimap.cellWidth/4, minimap.cellHeight*projectedY - minimap.cellHeight/4, minimap.cellWidth/2, minimap.cellHeight/2);
      };
    }
  }
  function containsBlock(x,y) {
    return (map[Math.floor(y)][Math.floor(x)] !== -1); 
  };
  var map = [ [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1], 
      [1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,1], 
      [1,-1,-1,-1,-1,-1,-1,0,-1,2,3,1,-1,-1,-1,1], 
      [1,1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,1], 
      [1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,1], 
      [1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,1], 
      [1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,1], 
      [1,-1,3,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,1], 
      [1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,2,-1,-1,-1,1], 
      [1,-1,-1,1,-1,-1,-1,-1,-1,3,-1,-1,-1,-1,-1,1], 
      [1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,1], 
      [1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,1], 
      [1,-1,-1,-1,-1,-1,1,-1,-1,2,-1,-1,-1,-1,-1,1], 
      [1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,1], 
      [1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,1], 
      [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]]; 
  var minimap = {
    init: function(){
      this.element = document.getElementById('minimap');
      this.context = this.element.getContext("2d");
      this.element.width = 300;
      this.element.height = 300;
      this.width = this.element.width;
      this.height = this.element.height;
      this.cellsAcross = map[0].length;
      this.cellsDown = map.length;
      this.cellWidth = this.width/this.cellsAcross;
      this.cellHeight = this.height/this.cellsDown;
      this.colors = ["#ffff00", "#ff00ff", "#00ffff", "#0000ff"];
      this.draw = function(){
        for(var y = 0; y < this.cellsDown; y++){
          for(var x = 0; x < this.cellsAcross; x++){
            var cell = map[y][x];
            if (cell===-1){
              this.context.fillStyle = "#ffffff"
            }else{
              this.context.fillStyle = this.colors[map[y][x]];
            };
            this.context.fillRect(this.cellWidth*x, this.cellHeight*y, this.cellWidth, this.cellHeight);
          };
        };
      };
    }
  };
  this.draw = function(){
    minimap.draw();
    player.draw(); 
  };
  this.setup = function() {
    minimap.init();
    player.init();
  };
  this.update = function(){
    if(jaws.pressed("left")) { player.direction = -1 };
    if(jaws.pressed("right")) { player.direction = 1 };
    if(jaws.pressed("up")) { player.speed = 1 };
    if(jaws.pressed("down")) { player.speed = -1 }; 

    if(jaws.on_keyup(["left", "right"], function(){
       player.direction = 0;
    })); 
    if(jaws.on_keyup(["up", "down"], function(){
       player.speed = 0;
    })); 
    player.move();
  };
}
