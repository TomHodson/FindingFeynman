function afterAssetsLoaded(global) {
  console.log("Loaded assets: ", global.assets);
  // for (var a in global.assets) {
  //   global.canvas.add(global.assets[a]).renderAll();
  // }
  global.pages.startPage = new StartPage({
    global: global,
    name: "startPage",
  });

  global.pages.menuPage = new MenuPage({
    global: global,
    name: "menuPage",
  });

  global.pages.level1 = new Level1({
    global: global,
    name: "level1",
  });

  global.pages.smPage = new SMPage({
    global: global,
    name: "smPage",
  });

  global.pages.startPage.enter();
}

//this just makes the global variables and then calls loadAssets
function main() {
  //ALL GLOBAL STATE SHOULD BE HERE!
  //make a canvas object bound to the html canvas tag with id = "canvas"
  console.log("Entered main");
  window.global = {};
  var global = window.global;
  global.canvas = new fabric.Canvas('canvas');
  global.canvas.setWidth((window.innerWidth > 0) ? window.innerWidth : screen.width);
  global.canvas.setHeight((window.innerHeight > 0) ? window.innerHeight : screen.height);
  global.canvas.calcOffset();


  console.log("canvas has dimensions width:", global.canvas.width, "height:", global.canvas.height);

  global.assets = {};
  global.pages = {};

  //this might disable the annoying touch scrolling on a phone, dunno
  //canvas.allowTouchScrolling = false;

  //make a background image?
  //canvas.backgroundImage = ...

  //make it better for ios?
  //canvas.enableRetinaScaling = true;

  //this loads assets and then calls the arguments
  loadAssets(global, afterAssetsLoaded);
}

//this is the entry point to all the code, ever.
window.onload = main;
