/// <reference path="_references.ts"/>

// IIFE - Immediately Invoked Function Expression
(function () {

  // Game Variables
  let canvas = document.getElementById("canvas");
  let stage: createjs.Stage;
  let helloLabel: objects.Label;
  let clickMeButton: objects.Button;
  let assetManager: createjs.LoadQueue;
  let assetManifest: any[];
  let currentScene: objects.Scene;
  let currentState: number;
  let keyboardManager: managers.Keyboard;
  let textureAtlasData: any;
  let textureAtlas: createjs.SpriteSheet;

  textureAtlasData = {

    "images": [
      ""
      //"./Assets/sprites/textureAtlas.png"
    ],

    "frames": [
      [2, 2, 32, 32, 0, 0, 0],
    [36, 2, 32, 32, 0, 0, 0],
    [70, 2, 32, 32, 0, 0, 0],
    [2, 36, 226, 178, 0, 0, 0],
    [2, 216, 44, 40, 0, 0, 0],
    [48, 216, 44, 40, 0, 0, 0],
    [94, 216, 44, 40, 0, 0, 0],
    [140, 216, 44, 40, 0, 0, 0],
    [186, 216, 44, 40, 0, 0, 0],
    [2, 258, 44, 40, 0, 0, 0],
    [48, 258, 44, 40, 0, 0, 0],
    [94, 258, 44, 40, 0, 0, 0],
    [140, 258, 44, 40, 0, 0, 0],
    [186, 258, 44, 40, 0, 0, 0],
    [2, 300, 93, 74, 0, 0, 0],
    [97, 300, 93, 74, 0, 0, 0],
    [2, 376, 93, 74, 0, 0, 0],
    [97, 376, 65, 65, 0, 0, 0],
    [164, 376, 65, 65, 0, 0, 0],
    [2, 452, 65, 65, 0, 0, 0],
    [69, 452, 65, 65, 0, 0, 0],
    [136, 452, 65, 65, 0, 0, 0],
    [2, 519, 65, 65, 0, 0, 0],
    [69, 519, 65, 65, 0, 0, 0],
    [136, 519, 62, 63, 0, 0, 0],
    [2, 586, 65, 65, 0, 0, 0],
    [69, 586, 65, 65, 0, 0, 0],
    [136, 586, 65, 65, 0, 0, 0],
    [2, 653, 200, 60, 0, 0, 0],
    [204, 653, 32, 32, 0, 0, 0],
    [2, 715, 32, 32, 0, 0, 0],
    [36, 715, 32, 32, 0, 0, 0],
    [70, 715, 32, 32, 0, 0, 0],
    [104, 715, 32, 32, 0, 0, 0],
    [138, 715, 32, 32, 0, 0, 0],
    [172, 715, 32, 32, 0, 0, 0],
    [2, 749, 200, 60, 0, 0, 0]
  ],

    "animations": {
      "cloud": { "frames": [0] },
      "coin": {
        "frames": [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
        "speed": 0.33
      },
      "explosion": {
        "frames": [11, 12, 13, 14, 15, 16, 17],
        "speed": 0.16
      },
      "island": { "frames": [18] },
      "plane": {
        "frames": [19, 20, 21],
        "speed": 0.5
      },
      "planeflash": {
        "frames": [22, 23, 22, 23, 22, 23],
        "speed": 0.08
      },
      "restartButton": { "frames": [24] },
      "smallexplosion": { "frames": [30,31,32,33,34,35] },
      "startButton": { "frames": [25] }
    }

  };
  
  assetManifest = [
    { id: "textureAtlas", src: "./Assets/sprites/textureAtlas.png" },
    { id: "ocean", src: "./Assets/images/ocean.gif" },
    { id: "engine", src: "./Assets/audio/engine.ogg" },
    { id: "coin", src: "./Assets/audio/coin.wav" },
    { id: "life", src: "./Assets/audio/life.wav" },
    { id: "explosion", src: "./Assets/audio/explosion.mp3" }
  ];

  // preloads assets
  function Init(): void {
    console.log("Initialization Started...");
    assetManager = new createjs.LoadQueue(); // creates the assetManager object
    assetManager.installPlugin(createjs.Sound); // asset manager can also load sounds
    assetManager.loadManifest(assetManifest);
    assetManager.on("complete", Start, this);
  }

  function Start(): void {
    console.log("Starting Application...")
    textureAtlasData.images = [assetManager.getResult("textureAtlas")];
    textureAtlas = new createjs.SpriteSheet(textureAtlasData);

    stage = new createjs.Stage(canvas);
    stage.enableMouseOver(20); // turn this on for buttons
    createjs.Ticker.framerate = 60; // 60 FPS
    createjs.Ticker.on("tick", Update);

    managers.Game.stage = stage;
    managers.Game.currentScene = config.Scene.START;
    currentState = config.Scene.START;

    keyboardManager = new managers.Keyboard();
    managers.Game.keyboardManager = keyboardManager;
    managers.Game.assetManager = assetManager;
    managers.Game.textureAtlas = textureAtlas;

    Main();
  }

  function Update(): void {
    // if the scene that is playing returns another current scene
    // then call Main again and switch the scene
    if (currentState != managers.Game.currentScene) {
      Main();
    }

    currentScene.Update();

    stage.update(); // redraws the stage
  }

  function Main(): void {
    stage.removeAllChildren();

    switch (managers.Game.currentScene) {
      case config.Scene.START:
        currentScene = new scenes.StartScene();
        break;
      case config.Scene.PLAY:
        currentScene = new scenes.PlayScene();
        break;
      case config.Scene.OVER:
        currentScene = new scenes.OverScene();
        break;
    }

    currentState = managers.Game.currentScene;
    managers.Game.currentSceneObject = currentScene;
    stage.addChild(currentScene);
  }

  window.onload = Init;

})();
