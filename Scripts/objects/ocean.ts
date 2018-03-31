module objects {
  export class Ocean extends createjs.Bitmap {
    // private instance variables
    private _dy: number;

    // public properties

    // Constructor
    constructor() {
      super(managers.Game.assetManager.getResult("ocean"));
      this.Start();
    }

    // private methods

    // reset the objects location to some value
    private _reset():void {
      this.y = -960;
    }

    // move the object to some new location
    private _move():void {
      this.y += this._dy;
    }

    // check to see if some boundary has been passed
    private _checkBounds():void {
      if(this.y >= 0) {
        this._reset();
      }
    }

    // public methods

    // Initializes variables and creates new objects
    public Start():void {
      this._dy = 5;
      this._reset();
    }

    // updates the game object every frame
    public Update():void {
      this._move();
      this._checkBounds();
    }
  }
}
