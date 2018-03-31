module objects {
  export class Enemy extends objects.GameObject {
    // private instance variables

    // public properties

    // Constructor
    constructor() {
      super("enemy");
      this.Start();
    }

    // private methods

    // public methods

    // Initializes variables and creates new objects
    public Start():void {
      this._dy = 10;
      this.Reset();
    }

    // updates the game object every frame
    public Update():void {
      this.Move();
      this.CheckBounds();
    }

    // reset the objects location to some value
    public Reset():void {
      this.x = Math.floor((Math.random() * (640 - this.width)) + this.halfWidth);
      this.y = -480;
      this.alpha = 0;
    }

    // move the object to some new location
    public Move():void {
      this.y += this._dy;
    }

    // check to see if some boundary has been passed
    public CheckBounds():void {
      // turn enemy back on when it appears on the screen
      if((this.y >= 0) && (this.alpha == 0)) {
        this.alpha = 1;
      }

      // check lower bounds
      if(this.y >= 480 + this.height) {
        this.Reset();
      }
    }
  }
}
