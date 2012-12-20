var PlayerEntity = me.ObjectEntity.extend({
  init: function(x, y, settings) {
    this.parent(x, y, settings);
    me.game.viewport.follow(this.pos, me.game.viewport.AXIS.BOTH);
    this.setVelocity(3, 12);
  },
  update: function() {
    if (me.input.isKeyPressed('left')) { this.doWalk(true); } 
    else if (me.input.isKeyPressed('right')) { this.doWalk(false); } 
    else { this.vel.x = 0; };
    if (me.input.isKeyPressed('jump')) { this.doJump(); }
    me.game.collide(this);
    this.updateMovement();
    if (this.bottom > 490){ this.gameOver(); }
    if (this.vel.x!=0 || this.vel.y!=0) {
      this.parent(this);
      return true;
    }
    return false;
  },
  gameOver: function() {
    me.state.change(me.state.MENU);
  }
});
