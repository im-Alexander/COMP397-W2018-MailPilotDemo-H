module scenes {
  export class PlayScene extends objects.Scene {
    // Private Instance Variables
    private _ocean: objects.Ocean;
    private _plane: objects.Plane;
    private _island: objects.Island;
    private _clouds: objects.Cloud[];
    private _cloudNum: number;
    private _scoreBoard: managers.ScoreBoard;
    private _bulletManager: managers.Bullet;

    private _engineSound: createjs.AbstractSoundInstance;
    private _coin: objects.Coin;
    private _enemy: objects.Enemy;

    // Public Properties

    // Constructor
    constructor() {
      super();

      this.Start();
    }

    // Private Mathods



    // Public Methods

    // Initialize Game Variables and objects
    public Start(): void {
      this._ocean = new objects.Ocean();
      this._plane = new objects.Plane();
      managers.Game.plane = this._plane;

      // make a reference to the bullet manager in the game manager
      this._bulletManager = new managers.Bullet();
      managers.Game.bulletManger = this._bulletManager;

      // create an enemy object
      this._enemy = new objects.Enemy();

      this._coin = new objects.Coin();
      this._island = new objects.Island();

      // instantiate the cloud array
      this._clouds = new Array<objects.Cloud>();
      this._cloudNum = 2;
      // loop and add each cloud to the array
      for (let count = 0; count < this._cloudNum; count++) {
        this._clouds[count] = new objects.Cloud();
      }

      this._engineSound = createjs.Sound.play("engine");
      this._engineSound.loop = -1; // play forever
      this._engineSound.volume = 0.3;

      // create the scoreboard UI for the Scene
      this._scoreBoard = new managers.ScoreBoard();
      managers.Game.scoreBoard = this._scoreBoard;

      this.Main();
    }

    // triggered every frame
    public Update(): void {
      //console.log("Num Objects: " + this.numChildren);

      this._ocean.Update();
      this._plane.Update();

      this._enemy.Update();

      this._bulletManager.Update();

      this._coin.x = this._island.x;
      this._coin.y = this._island.y;
      this._coin.Update();

      this._island.Update();

      // check collision between plane and coin
      managers.Collision.Check(this._plane, this._coin);

      this._clouds.forEach(cloud => {
        cloud.Update();
        // check collision between plane and current cloud
        managers.Collision.Check(this._plane, cloud);
      });

      this._bulletManager.Bullets.forEach(bullet => {
        managers.Collision.Check(bullet, this._enemy);
      });

      // if lives fall below zero switch scenes to the game over scene
      if(this._scoreBoard.Lives <= 0) {
        this._engineSound.stop();
        managers.Game.currentScene = config.Scene.OVER;
      }

    }

    // This is where the fun happens
    public Main(): void {
      // add the ocean to the scene
      this.addChild(this._ocean);

      // add the island to the scene
      this.addChild(this._island);

      // add the coin to the scene
      this.addChild(this._coin);

      // add the plane to the scene
      this.addChild(this._plane);
      this.addChild(this._plane.planeFlash); // add the plane flashing effect

      // add the enemy plane to the scene
      this.addChild(this._enemy);

      // add the bullets to the scene
      this._bulletManager.Bullets.forEach(bullet => {
        this.addChild(bullet);
      });

      // add clouds to the scene

      this._clouds.forEach(cloud => {
        this.addChild(cloud);
      });

      // add scoreboard labels to the scene
      this.addChild(this._scoreBoard.LivesLabel);
      this.addChild(this._scoreBoard.ScoreLabel);
    }
  }
}
