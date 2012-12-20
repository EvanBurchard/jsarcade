var itemBoxes = document.querySelectorAll('.inventory-box');
[].forEach.call(itemBoxes, function(itemBox) {
  itemBox.addEventListener('dragstart', handleDragStart);
  itemBox.addEventListener('dragover', handleDragOver);
  itemBox.addEventListener('drop', handleDrop);
});
var draggingObject;
function handleDragStart(e) {
  draggingObject = this;
  e.dataTransfer.setData('text/html', this.innerHTML);
  var dragIcon = document.createElement('img');
  var imageName = this.firstChild.id;
  dragIcon.src = imageName + '.png';
  e.dataTransfer.setDragImage(dragIcon, -10, 10);
}
function handleDragOver(e) {
  e.preventDefault(); 
}
function handleDrop(e) {
  e.preventDefault(); 
  if (draggingObject != this) {
    var draggingGrandpa = draggingObject.parentElement.parentElement;
    var draggedToGrandpa = this.parentElement.parentElement;
    var draggingObjectId = draggingObject.firstChild.id;
    inventoryObject.add(draggedToGrandpa.id, draggingObjectId);
    inventoryObject.remove(draggingGrandpa.id, draggingObjectId);
    draggingObject.innerHTML = this.innerHTML;
    this.innerHTML = e.dataTransfer.getData('text/html');
    this.classList.remove('empty');
    draggingObject.classList.add('empty');
  }
}
