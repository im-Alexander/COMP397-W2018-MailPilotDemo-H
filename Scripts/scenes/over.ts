module scenes {
  export class OverScene extends objects.Scene {
    // Private Instance Variables
    private _overLabel: objects.Label;
    private _restartButton: objects.Button;
    private _ocean: objects.Ocean;

    private _scoreboard: managers.ScoreBoard;

    // Public Properties

    // Constructor
    constructor() {
      super();

      this.Start();
    }

    // Private Mathods
    private _restartButtonClick():void {
      managers.Game.currentScene = config.Scene.PLAY;
    }


    // Public Methods

    // Initialize Game Variables and objects
    public Start(): void {
      this._ocean = new objects.Ocean();
      this._overLabel = new objects.Label("Game Over", "60px", "Dock51", "#FFFF00", 320, 140, true);
      this._restartButton = new objects.Button("restartButton", 320, 340);
      this._scoreboard = new managers.ScoreBoard();

      this.Main();
    }

    public Update(): void {
      this._ocean.Update();
    }

    // This is where the fun happens
    public Main(): void {
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
    }
  }
}
