enchant();
window.onload = function(){
  var game = new Game(300, 300);
  game.fps = 15;
  game.onload = function(){
    alert("hello");
  };
  game.start();
};
