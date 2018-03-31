module scenes {
  export class StartScene extends objects.Scene {
    // Private Instance Variables
    private _welcomeLabel: objects.Label;
    private _startButton: objects.Button;
    private _ocean: objects.Ocean;


    // Public Properties

    // Constructor
    constructor() {
      super();

      this.Start();
    }

    // Private Mathods
    private _startButtonClick():void {
      managers.Game.currentScene = config.Scene.PLAY;
    }


    // Public Methods

    // Initialize Game Variables and objects
    public Start(): void {


      this._ocean = new objects.Ocean();

      this._welcomeLabel = new objects.Label("Mail Pilot", "60px", "Dock51", "#FFFF00", 320, 240, true);
      this._startButton = new objects.Button("startButton", 320, 340);
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
      this.addChild(this._welcomeLabel);

      // add the startButton to the scene
       this.addChild(this._startButton);

       this._startButton.on("click", this._startButtonClick);
    }
  }
}
