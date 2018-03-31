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
            [2, 2, 16, 16, 0, 0, 0],
            [20, 2, 226, 178, 0, 0, 0],
            [2, 182, 44, 40, 0, 0, 0],
            [48, 182, 44, 40, 0, 0, 0],
            [94, 182, 44, 40, 0, 0, 0],
            [140, 182, 44, 40, 0, 0, 0],
            [186, 182, 44, 40, 0, 0, 0],
            [2, 224, 44, 40, 0, 0, 0],
            [48, 224, 44, 40, 0, 0, 0],
            [94, 224, 44, 40, 0, 0, 0],
            [140, 224, 44, 40, 0, 0, 0],
            [186, 224, 44, 40, 0, 0, 0],
            [2, 266, 93, 74, 0, 0, 0],
            [97, 266, 93, 74, 0, 0, 0],
            [2, 342, 93, 74, 0, 0, 0],
            [97, 342, 65, 65, 0, 0, 0],
            [164, 342, 65, 65, 0, 0, 0],
            [2, 418, 65, 65, 0, 0, 0],
            [69, 418, 65, 65, 0, 0, 0],
            [136, 418, 65, 65, 0, 0, 0],
            [2, 485, 65, 65, 0, 0, 0],
            [69, 485, 65, 65, 0, 0, 0],
            [136, 485, 62, 63, 0, 0, 0],
            [2, 552, 65, 65, 0, 0, 0],
            [69, 552, 65, 65, 0, 0, 0],
            [136, 552, 65, 65, 0, 0, 0],
            [2, 619, 65, 65, 0, 0, 0],
            [69, 619, 65, 65, 0, 0, 0],
            [2, 686, 200, 60, 0, 0, 0],
            [204, 686, 32, 32, 0, 0, 0],
            [2, 748, 32, 32, 0, 0, 0],
            [36, 748, 32, 32, 0, 0, 0],
            [70, 748, 32, 32, 0, 0, 0],
            [104, 748, 32, 32, 0, 0, 0],
            [138, 748, 32, 32, 0, 0, 0],
            [2, 782, 200, 60, 0, 0, 0]
        ],
        "animations": {
            "bullet": { "frames": [0] },
            "cloud": { "frames": [1] },
            "coin": {
                "frames": [2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
                "speed": 0.33
            },
            "enemy": {
                "frames": [12, 13, 14],
                "speed": 0.25
            },
            "explosion": {
                "frames": [15, 16, 17, 18, 19, 20, 21],
                "speed": 0.16
            },
            "island": { "frames": [22] },
            "plane": { "frames": [23, 24, 25] },
            "planeflash": {
                "frames": [26, 27, 26, 27, 26, 27],
                "speed": 0.08
            },
            "restartButton": { "frames": [28] },
            "smallexplosion": {
                "frames": [29, 30, 31, 32, 33, 34],
                "speed": 0.16
            },
            "startButton": { "frames": [35] }
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