/// <reference path="_references.ts"/>
// IIFE - Immediately Invoked Function Expression
(function () {
    // Game Variables
    var canvas = document.getElementById("canvas");
    var stage;
    var helloLabel;
    var clickMeButton;
    var assetManager;
    var assetManifest;
    var currentScene;
    var currentState;
    var keyboardManager;
    var textureAtlasData;
    var textureAtlas;
    textureAtlasData = {
        "images": [
            ""
            //"./Assets/sprites/textureAtlas.png"
        ],
        "frames": [
            [2, 2, 226, 178, 0, 0, 0],
            [230, 2, 44, 40, 0, 0, 0],
            [276, 2, 44, 40, 0, 0, 0],
            [322, 2, 44, 40, 0, 0, 0],
            [368, 2, 44, 40, 0, 0, 0],
            [414, 2, 44, 40, 0, 0, 0],
            [460, 2, 44, 40, 0, 0, 0],
            [2, 182, 44, 40, 0, 0, 0],
            [48, 182, 44, 40, 0, 0, 0],
            [94, 182, 44, 40, 0, 0, 0],
            [140, 182, 44, 40, 0, 0, 0],
            [186, 182, 65, 65, 0, 0, 0],
            [253, 182, 65, 65, 0, 0, 0],
            [320, 182, 65, 65, 0, 0, 0],
            [387, 182, 65, 65, 0, 0, 0],
            [2, 249, 65, 65, 0, 0, 0],
            [69, 249, 65, 65, 0, 0, 0],
            [136, 249, 65, 65, 0, 0, 0],
            [203, 249, 62, 63, 0, 0, 0],
            [267, 249, 65, 65, 0, 0, 0],
            [334, 249, 65, 65, 0, 0, 0],
            [401, 249, 65, 65, 0, 0, 0],
            [2, 316, 65, 65, 0, 0, 0],
            [69, 316, 65, 65, 0, 0, 0],
            [136, 316, 200, 60, 0, 0, 0],
            [2, 383, 200, 60, 0, 0, 0]
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
    function Init() {
        console.log("Initialization Started...");
        assetManager = new createjs.LoadQueue(); // creates the assetManager object
        assetManager.installPlugin(createjs.Sound); // asset manager can also load sounds
        assetManager.loadManifest(assetManifest);
        assetManager.on("complete", Start, this);
    }
    function Start() {
        console.log("Starting Application...");
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
    function Update() {
        // if the scene that is playing returns another current scene
        // then call Main again and switch the scene
        if (currentState != managers.Game.currentScene) {
            Main();
        }
        currentScene.Update();
        stage.update(); // redraws the stage
    }
    function Main() {
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
//# sourceMappingURL=game.js.map