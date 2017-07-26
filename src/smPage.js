var SMPage = fabric.util.createClass(Page, {

  type: 'SMPage',

  initialize: function(options) {
    this.callSuper('initialize', options);
    console.log("Initialised smPage!!!", this);
    this.formatAssets();
  },

  formatAssets: function() {
    this.assets = {
      smImage: this.global.assets.smImage
    };
    this.assets.smImage.scaleToMaxXY(global.canvas, {width: 0.9, height: 1});
    this.assets.smImage.set({
      originX: "center", originY: "top",
      top: 0, left: global.canvas.width/2,
    });

    console.log(this.assets.smImage);

    this.assets.smImage.on("mousedown", this.moveTo(this.global, "smPage", "menuPage"));

  },
});
