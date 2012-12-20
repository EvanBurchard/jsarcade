var inventoryObject = (function(){
  var inventory = {};
  var itemables = document.getElementsByClassName("itemable");
  [].forEach.call(itemables, function(itemable) {
    inventory[itemable.id] = [];
  });
  var items = document.getElementsByClassName("item");
  [].forEach.call(items, function(item) {
    var greatGrandpa = item.parentElement.parentElement.parentElement;
    inventory[greatGrandpa.id].push(item.id);
  });
  var add = function(inventorySection, newItem){
    inventory[inventorySection].push(newItem);
    return inventory;
  }
  var remove = function(inventorySection, itemToDelete){
    for (var i = 0; i < inventory[inventorySection].length; i++){
      if (inventory[inventorySection][i] == itemToDelete){
        inventory[inventorySection].splice(i, 1);
      }
    }
    return inventory;
  }
  return {
    get : function(){
            return inventory;
          },
    add : add,
    remove : remove
  }
})();
