function afterAssetsLoaded(global) {
  console.log("Loaded assets: ", global.assets);
  // for (var a in global.assets) {
  //   global.canvas.add(global.assets[a]).renderAll();
  // }

  startPage = new StartPage([ global.assets.FFlogo, global.assets.startButton ],{
                                name: "startPage",
                                global: global,
                              });

  startPage.formatAssets();
  // startPage.showScreen();
  startPage.addToCanvas();

//  level1(global);
}

function loadAssets(global, function_to_run_after_assets_are_loaded) {

  //info on the assets that we're gonna load
  global.assets_to_load = [
    {url: "FindingFeynmanLogo.svg", name: "FFlogo"},
    {url: "StartButton.svg", name: "startButton"},
    {url: "DoneButton.svg", name: "doneButton"},
    {url: "DotIcon.svg", name: "dot"},
    //{url: "EmmyNoether.svg", name: "noether"},
    {url: "EraserIcon.svg", name: "eraser"},
    {url: "HelpIcon.svg", name: "help"},
    {url: "MenuIcon.svg", name: "menu"},
    {url: "NextButton.svg", name: "nextButton"},
    {url: "SMIcon.svg", name: "sm"},
    {url: "SpeechBubble.svg", name: "speechBubble"},
    {url: "SquiggleIcon.svg", name: "squiggle"},
    ];

  global.assets = {};
  function recurse_on_assets(global, assets_to_load) {
    //pop an asset of the list, removing it
    var asset = global.assets_to_load.pop();

    if(asset === undefined) {
      console.log("got to the base case, calling afterAssetsLoaded");
      //now all the assets are loaded we can call the main function
      function_to_run_after_assets_are_loaded(global);
    }
    //if there are still assets left to load
    else {
      fabric.loadSVGFromURL("assets/" + asset.url, function(objs, opt) {
        console.log("loaded asset " + asset.name);
        var object = fabric.util.groupSVGElements(objs, opt);
        
        //make a new field on assets for this asset
        global.assets[asset.name] = object;

        //this is the recursive part
        recurse_on_assets(global, assets_to_load);
      });}  
  }
  recurse_on_assets(global, global.assets_to_load);
}

//this just makes the global variables and then calls loadAssets
function main() {
  //ALL GLOBAL STATE SHOULD BE HERE!
  //make a canvas object bound to the html canvas tag with id = "canvas"
  console.log("Entered main");
  var global = {};
  global.canvas = new fabric.Canvas('canvas');
  global.canvas.setWidth(window.innerWidth);
  global.canvas.setHeight(window.innerHeight);
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
window.onload=main;


