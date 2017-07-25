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

    var width = 0.3 * Math.min(global.canvas.width, global.canvas.height);
    var height = width / 10;
    var pad = width / 10;

    var loadBar = new fabric.Rect({
      originY: 'center',
      fill: 'orange',
      left: pad,
      height: height,
      width: width,
    });
    var bg = new fabric.Rect({
      originY: 'center',
      fill: 'black',
      width: width + 2 * pad,
      height: height + pad * 2,
    });
    var bar = new fabric.Group([bg, loadBar]);
    global.canvas.add(bar);
    bar.center();
    loadBar.finalWidth = Math.round(global.canvas.width / 3);
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
          console.log("loaded asset " + asset.name);
          var object = fabric.util.groupSVGElements(objs, opt);

          //make a new field on assets for this asset
          global.assets[asset.name] = object;

          //this is the recursive part
          recurse_on_assets(global, assets_to_load);
        });
      }
    }
    recurse_on_assets(global, global.assets_to_load);
    }
