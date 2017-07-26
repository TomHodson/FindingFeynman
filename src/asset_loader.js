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
    {url: "Level10Icon.svg", name: "level10"},
    {url: "Level11Icon.svg", name: "level11"},
    {url: "Level12Icon.svg", name: "level12"},
    {url: "Level1Icon.svg", name: "level1"},
    {url: "Level2Icon.svg", name: "level2"},
    {url: "Level3Icon.svg", name: "level3"},
    {url: "Level4Icon.svg", name: "level4"},
    {url: "Level5Icon.svg", name: "level5"},
    {url: "Level6Icon.svg", name: "level6"},
    {url: "Level7Icon.svg", name: "level7"},
    {url: "Level8Icon.svg", name: "level8"},
    {url: "Level9Icon.svg", name: "level9"},
    {url: "MenuLabel.svg", name: "menuLabel"},
    {url: "MenuPageStuff.svg", name: "menuPage"},
    {url: "MenuPath.svg", name: "menuPath"},
    {url: "MenuIcon.svg", name: "menu"},
    {url: "NextButton.svg", name: "nextButton"},
    {url: "SM_Background.svg", name: "smBackground"},
    {url: "SM_bottom.svg", name: "smBottom"},
    {url: "SM_charm.svg", name: "smCharm"},
    {url: "SM_down.svg", name: "smDown"},
    {url: "SM_electron.svg", name: "smElectron"},
    {url: "SM_electron_neutrino.svg", name: "smElectronNeutrino"},
    {url: "SM_gluon.svg", name: "smGluon"},
    {url: "SM_Higgs.svg", name: "smHiggs"},
    {url: "SM_muon.svg", name: "smMuon"},
    {url: "SM_muon_neutrino.svg", name: "smMuonNeutrino"},
    {url: "SM_Nope.svg", name: "smNope"},
    {url: "SM_photon.svg", name: "smPhoton"},
    {url: "SM_strange.svg", name: "smStrange"},
    {url: "SM_tauon.svg", name: "smTauon"},
    {url: "SM_tauon_neutrino.svg", name: "smTauonNeutrino"},
    {url: "SM_top.svg", name: "smTop"},
    {url: "SM_up.svg", name: "smUp"},
    {url: "SM_W.svg", name: "smW"},
    {url: "SM_Z.svg", name: "smZ"},
    {url: "SMIcon.svg", name: "sm"},
    {url: "StandardModelImage_2.svg", name: "smImage"},
    {url: "SpeechBubble.svg", name: "speechBubble"},
    {url: "SquiggleIcon.svg", name: "squiggle"},
    ];

    //just use relative sizes and scale later
    var width = Math.min(0.5*global.canvas.width, 1.0*global.canvas.height);
    var height = Math.max(15, width / 50);
    console.log(height);
    var pad = height / 5;


    var text = new fabric.Text('Loading', {
      left: width/2, top: -height - 4*pad,
      originX: 'center', originY: 'bottom',
      textAlign: 'center'
    });
    text.scaleToHeight(3 * height);


    var loadBar = new fabric.Rect({
      originY: 'center', originX: 'left',
      fill: 'white',
      //stroke: "black", strokeWidth: pad,
      left: pad,
      height: height, width: 0,
      rx: pad, ry: pad,
    });
    var bg = new fabric.Rect({
      originY: 'center', originX: 'left',
      fill: 'black',
      left: 0,
      rx: pad, ry: pad,
      //stroke: "black", strokeWidth: pad,
      width: width + 2 * pad,
      height: height + 2 * pad,
    });

    var bar = new fabric.Group([bg, loadBar, text]);
    global.canvas.add(bar);
    bar.center();
    loadBar.finalWidth = width;
    loadBar.N = global.assets_to_load.length;

    global.assets = {};

    function recurse_on_assets(global, assets_to_load) {
      //pop an asset of the list, removing it
      var asset = global.assets_to_load.pop();

      loadBar.animate('width', loadBar.finalWidth * (1 - global.assets_to_load.length / loadBar.N), {
        onChange: global.canvas.renderAll.bind(global.canvas),
        duration: 100,
        easing: fabric.util.ease.easeOutBounce,
      });

      if (asset === undefined) {
        console.log("got to the base case, calling afterAssetsLoaded");
        global.canvas.remove(bar);
        //now all the assets are loaded we can call the main function
        function_to_run_after_assets_are_loaded(global);
      }
      //if there are still assets left to load
      else {
        fabric.loadSVGFromURL("dist/assets/" + asset.url, function(objs, opt) {
          var object = fabric.util.groupSVGElements(objs, opt);
          console.log("loaded asset " + asset.name, object.type);

          //make a new field on assets for this asset
          //note we're converting from a PathGroup object to a Group
          //not sure which is better
          //UPDATE: PathGroups seem to have an issue with calculating their bounding boxes
          //2: casting to normal groups like new fabric.Group(object) doesn't work
          global.assets[asset.name] = object;
          //this is the recursive part
          recurse_on_assets(global, assets_to_load);
        });
      }
    }
    recurse_on_assets(global, global.assets_to_load);
    }
