var PlayerEntity = me.ObjectEntity.extend({
  init: function(x, y, settings) {
    this.parent(x, y, settings);
    me.game.viewport.follow(this.pos, me.game.viewport.AXIS.BOTH);
  },
  update: function() {
    this.updateMovement();
    if (this.vel.x!=0 || this.vel.y!=0) {
      this.parent(this);
      return true;
    }
    return false;
  }
});
