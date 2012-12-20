game.things = (function(){
  var items = {
    bat: {
      name: 'bat',
      effects: {
        'player_inventory': { message: "<p>You picked up the bat!</p>",
                            object: "addItem",
                            subject: "deleteItem"
        },
        'dino': { message: "<p>You hit the dino with the bat.</p><p>Now he's angry.</p>",
                  subject: 'deleteItem',
                  object: 'deleteItem',
                  callback: function(){game.screen.callDino()}

        },
        'empty': {
              message: "<p>You set the bat down over there.</p>",
              object: "addItem",
              subject: "deleteItem"
        }
      }
    },
    dino: {
      name: 'dino',
      effects: {
        'player_inventory': { message: "<p>You can't move the dino...</p>" } 
      }
    }
  };

  var get = function(name){
    return this.items[name];
  };
  var dropItemInto = function(itemNode, target){
    var sourceContext = itemNode.parentElement.parentElement.id;
    if(sourceContext !== target){
      var item = itemNode.firstChild.id;
      var itemObject = this.get(item);

      if (target === 'player_inventory'){
        var effects = itemObject.effects[target];
      }else if(game.slide.getInventory(target)){
        var effects = itemObject.effects[game.slide.getInventory(target)];
      }else{
        var effects = itemObject.effects['empty'];
      };

      var targetObject;
      if (!!effects.object === true){
        if(target==="player_inventory"){
          targetObject = game.playerInventory;
        }else{
          targetObject = game.slide;
        };
        targetObject[effects.object](itemObject);
      };
      if (!!effects.subject === true){
        if(sourceContext === "player_inventory"){
          var sourceObject = game.playerInventory;
        }else{
          var sourceObject = game.slide;
        };
        sourceObject[effects.subject](itemObject);
      };
      if (!!effects.message === true){
        game.slide.setText(effects.message);
      };
      if(!!effects.callback  === true){
        effects.callback();
      };
      game.screen.draw();
    };
  };

  return{
    items: items,
    get: get,
    dropItemInto: dropItemInto
  }
})();

game.slide = (function(){
  var inventory = {
    slide1: 'bat',
    slide2: 'dino',
    slide3: null
  };
  var addItem = function(item){
    inventory[game.slide.currentSlide()] = item.name;
  };
  var deleteItem = function(item){
    inventory[game.slide.currentSlide()] = null;
  };
  var findTextNode = function(slideId){
    return document.querySelector("#" + slideId + " .slide-text .event-text");
  };
  var getInventory = function(slideId){
    return inventory[slideId];
  };
  var setText = function(message, slideId){
    if (!!slideId === false){
      slideId = currentSlide();
    }
    return findTextNode(slideId).innerHTML = message;
  };
  var currentSlide = function(){
    return game.stepsTaken[game.stepsTaken.length - 1];
  };
  var draw = function(slideId){
    if(!slideId === true){
      slideId = this.currentSlide();
    };
    var item = inventory[slideId];
    var inventoryBox = document.querySelector ('#'+slideId+' .inventory-box');
    if (item === null){
      inventoryBox.innerHTML = "";
      inventoryBox.classList.add("empty");
    }
    else{
      inventoryBox.innerHTML = "<img src='"+item+".png' alt='"+item+"' class='item' id='"+item+"'>";
      inventoryBox.classList.remove("empty");
    }
  };

  return {
    addItem: addItem,
    deleteItem: deleteItem,
    setText: setText,
    getInventory: getInventory,
    draw: draw,
    currentSlide: currentSlide
  };
})();
game.playerInventory = (function(){
  var items = {
    bat: false
  };
  var clearInventory = function(){
    playerInventoryBoxes = document.querySelectorAll('#player_inventory .inventory-box');
    [].forEach.call(playerInventoryBoxes, function(inventoryBox) {
      inventoryBox.classList.add("empty");
      inventoryBox.innerHTML = "";
    });
  };
  var addItem = function(item){
    if (this.items[item.name] === false){
      this.items[item.name] = true;
    };
    return this.items;
  };
  var deleteItem = function(item){
    if (this.items[item.name] === true){
      this.items[item.name] = false;
    };
    return this.items;
  };
  var draw = function(){
    clearInventory();
    var counter = 0;
    var inventoryBoxes = document.querySelectorAll('#player_inventory .inventory-box');
    for(var item in this.items){
      if(this.items[item] === true){
        inventoryBoxes[counter].classList.remove("empty");
        inventoryBoxes[counter].innerHTML = "<img src='"+item+".png' alt='"+item+"' class='item' id='"+item+"'>";
      }
      counter = counter + 1;
    };
  };
  return {
    items: items,
    addItem: addItem,
    deleteItem: deleteItem,
    draw: draw
  };
})();

game.screen = (function(){
  var draw = function(){
    game.playerInventory.draw();
    game.slide.draw(game.slide.currentSlide());
  };
  var callDino = function(){
    $('body').raptorize({ 'enterOn' : 'timer', 'delayTime' : 2000 });
  };
  return {
    callDino: callDino,
    draw: draw
  }
})();
