var jsApp = {
  onload: function() {
    if (!me.video.init('jsapp', 320, 240, true, 2.0)) {
      alert("html 5 canvas is not supported by this browser.");
      return;
    }
    me.loader.onload = this.loaded.bind(this);
    me.loader.preload(resources);
    me.state.change(me.state.LOADING);
  },
  loaded: function() {
    me.state.set(me.state.PLAY, new PlayScreen());
    me.state.change(me.state.PLAY);
  }
};
window.onReady(function() {
  jsApp.onload();
});
