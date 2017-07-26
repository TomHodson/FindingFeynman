var Page = fabric.util.createClass({

  type: 'Page',
  name: '',
  global: {},
  assets: {},

  initialize: function(options) {
    this.name = options.name;
    this.global = options.global;
  },

  enter: function() {
    this.global.curPage = this;
    this.addToCanvas();
  },

  exit: function() {
    this.removeFromCanvas();
  },

  //move from one page to another (maybe srcPage could just be 'this' I don't know yet)
  moveTo: function(global, srcPage, destPage) {
    return function() {
      console.log("going to from " + srcPage + " to " + destPage);
      global.pages[srcPage].exit();
      global.pages[destPage].enter();
    };
  },

  addToCanvas: function() {
    //prevent it from rerendering the page for each loop iteration
    this.global.canvas.renderOnAddRemove = false;
    for (var key in this.assets) {
      this.global.canvas.add(this.assets[key]);
    }

    //re-enable the default behaviour
    this.global.canvas.renderOnAddRemove = true;
    this.global.canvas.renderAll();
  },

  removeFromCanvas: function() {
    //prevent it from rerendering the page for each loop iteration
    this.global.canvas.renderOnAddRemove = false;
    for (var key in this.assets) {
      this.global.canvas.remove(this.assets[key]);
    }
    //re-enable the default behaviour
    this.global.canvas.renderOnAddRemove = true;
    this.global.canvas.renderAll();
  },

});


var StartPage = fabric.util.createClass(Page, {

  type: 'StartPage',

  initialize: function(options) {
    this.callSuper('initialize', options);
    this.formatAssets();
  },

  formatAssets: function() {
    this.assets = {
      FFlogo: this.global.assets.FFlogo,
      startButton: this.global.assets.startButton
    };

    this.assets.FFlogo.scaleToMaxXY(global.canvas, {width: 1, height: 2/3});
    this.assets.FFlogo.set({
      originX: 'center',
      originY: 'center',
      top: this.global.canvas.height / 3,
      left: this.global.canvas.width / 2,
    });

    this.assets.startButton.scaleToMaxXY(global.canvas, {width: 0.7, height: 1/10});
    this.assets.startButton.set({
      originX: 'center',
      originY: 'center',
      top: global.canvas.height * 4 / 5,
      left: global.canvas.width / 2,
    });

    for (var a in this.assets) {
      this.assets[a].selectable = false;
    }

    this.assets.startButton.on("mousedown", this.moveTo(this.global, "startPage", "menuPage"));
  },

});

var MenuPage = fabric.util.createClass(Page, {

  type: 'MenuPage',

  initialize: function(options) {
    this.callSuper('initialize', options);
    console.log("Initialised menuPage!!!", this);
    this.formatAssets();
  },

  formatAssets: function() {
    this.assets = {
      menuLabel: this.global.assets.menuLabel,
      menuPath: this.global.assets.menuPath,
      level1: this.global.assets.level1,
      // level2: this.global.assets.level2,
      // level3: this.global.assets.level3,
      // level4: this.global.assets.level4,
      // level5: this.global.assets.level5,
      // level6: this.global.assets.level6,
      // level7: this.global.assets.level7,
      // level8: this.global.assets.level8,
      // level9: this.global.assets.level9,
      // level10: this.global.assets.level10,
      // level11: this.global.assets.level11,
      level12: this.global.assets.level12,
    };

    this.assets.menuLabel.scaleToMaxXY(global.canvas, {width: 0.9, height: 1/5});
    this.assets.menuLabel.set({
      originX: 'center',
      originY: 'top',
      top: 0,
      left: global.canvas.width / 2,
    });

    this.assets.menuPath.scaleToMaxXY(global.canvas, {width: 0.9, height: 4/5});
    this.assets.menuPath.set({
      originX: 'center',
      originY: 'top',
      top: this.assets.menuLabel.height,
      left: global.canvas.width / 2,
    });

    this.assets.level1.setFill('white');
    this.assets.level12.setFill('white');


    //stop anyhting from being seletable
    for (var a in this.assets) {
      this.assets[a].selectable = false;
    }

    //setup menu button events
    this.assets.level1.on("mousedown", this.moveTo(this.global, "menuPage", "level1"));
    this.assets.level12.on("mousedown", this.moveTo(this.global, "menuPage", "smPage"));
  },

});
