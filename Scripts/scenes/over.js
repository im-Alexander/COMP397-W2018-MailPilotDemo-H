var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var scenes;
(function (scenes) {
    var OverScene = /** @class */ (function (_super) {
        __extends(OverScene, _super);
        // Public Properties
        // Constructor
        function OverScene() {
            var _this = _super.call(this) || this;
            _this.Start();
            return _this;
        }
        // Private Mathods
        OverScene.prototype._restartButtonClick = function () {
            managers.Game.currentScene = config.Scene.PLAY;
        };
        // Public Methods
        // Initialize Game Variables and objects
        OverScene.prototype.Start = function () {
            this._ocean = new objects.Ocean();
            this._overLabel = new objects.Label("Game Over", "60px", "Dock51", "#FFFF00", 320, 140, true);
            this._restartButton = new objects.Button("restartButton", 320, 340);
            this._scoreboard = new managers.ScoreBoard();
            this.Main();
        };
        OverScene.prototype.Update = function () {
            this._ocean.Update();
        };
        // This is where the fun happens
        OverScene.prototype.Main = function () {
            // add the ocean object
            this.addChild(this._ocean);
            // add the welcome label to the scene
            this.addChild(this._overLabel);
            // add the backButton to the scene
            this.addChild(this._restartButton);
            // add scoreboard to the scene
            this.addChild(this._scoreboard.HighScoreLabel);
            this._scoreboard.HighScore = managers.Game.HighScore;
            // event listeners
            this._restartButton.on("click", this._restartButtonClick);
        };
        return OverScene;
    }(objects.Scene));
    scenes.OverScene = OverScene;
})(scenes || (scenes = {}));
//# sourceMappingURL=over.js.map