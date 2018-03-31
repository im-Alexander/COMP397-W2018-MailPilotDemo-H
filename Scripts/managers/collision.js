var managers;
(function (managers) {
    var Collision = /** @class */ (function () {
        function Collision() {
        }
        Collision.Check = function (object1, object2) {
            // create two vec2 objects
            var P1 = new math.Vec2(object1.x, object1.y);
            var P2 = new math.Vec2(object2.x, object2.y);
            if (math.Vec2.Distance(P1, P2) < (object1.halfHeight + object2.halfHeight)) {
                if (!object2.isColliding) {
                    object2.isColliding = true;
                    switch (object2.name) {
                        case "coin":
                            if ((object2.alpha != 0) && (object1.alpha != 0)) {
                                createjs.Sound.play("coin");
                                managers.Game.scoreBoard.Score += 100;
                                object2.alpha = 0;
                                // add a life power up
                                if (managers.Game.scoreBoard.Score % 1000 == 0) {
                                    managers.Game.scoreBoard.Lives += 1;
                                    createjs.Sound.play("life");
                                }
                                if (managers.Game.HighScore <= managers.Game.scoreBoard.Score) {
                                    managers.Game.scoreBoard.HighScore = managers.Game.scoreBoard.Score;
                                    managers.Game.HighScore = managers.Game.scoreBoard.HighScore;
                                }
                            }
                            break;
                        case "cloud":
                            if (object1.alpha != 0) {
                                createjs.Sound.play("explosion");
                                managers.Game.scoreBoard.Lives -= 1;
                                var explosion = new objects.Explosion();
                                explosion.x = object1.x;
                                explosion.y = object1.y;
                                managers.Game.currentSceneObject.addChild(explosion);
                                object1.alpha = 0; // make the plane object invisible
                                managers.Game.plane.planeFlash.alpha = 1;
                                managers.Game.plane.planeFlash.gotoAndPlay("planeflash");
                            }
                            break;
                    }
                }
            }
            else {
                object2.isColliding = false;
            }
        };
        return Collision;
    }());
    managers.Collision = Collision;
})(managers || (managers = {}));
//# sourceMappingURL=collision.js.map