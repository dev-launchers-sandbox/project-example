
import Character from "./Character.js";
import Phaser from "phaser";

export default class Enemy extends Character {
  constructor(scene, x, y) {
    super(scene, x, y, "ghost");
    this.attackVal = 10;
    this.step = 1;
    this.updateCounter = 0;
    this.targetX = 0;
    this.targetY = 0;
    this.movementX = 0;
    this.movementY = 0;
    this.updateFrames = 15;
    this.personalSpace = 30;

    const anims = scene.anims;
    anims.create({
      key: "ghost-idle",
      frames: anims.generateFrameNumbers("ghost", { start: 0, end: 2 }),
      frameRate: 3,
      repeat: -1
    });
    this.anims.play("ghost-idle", true);

    /*console.log(this.scene);*/
  }
  moveAway(targetX, targetY) {
    if (this.x < targetX) {
      this.x -= 0.5;
    } else if (this.x > targetX) {
      this.x += 0.5;
    }
    if (this.y < targetY) {
      this.y -= 0.5;
    } else if (this.y > targetY) {
      this.y += 0.5;
    }
  }
  /*
   * moveRandomlyTowards
   * this function will allow the enemy to move
   * randomly towards a characters targetX and targetY
   * from a distance
   */

  moveRandomlyTowards() {
    /*let x = this.scene.vehicle.x + Math.random() * distance;
    let y = this.scene.vehicle.y + Math.random() * distance;
    */
    this.updateCounter++;
    let x = this.randomXMovement();
    if (this.updateCounter % this.updateFrames === 0) {
      this.movementX = this.randomXMovement();
      this.movementY = this.randomYMovement();
    }
    this.targetX =
      this.scene.cake.x +
      this.personalSpace / -2 +
      Math.random() * this.personalSpace;
    this.targetY =
      this.scene.cake.y +
      this.personalSpace / -2 +
      Math.random() * this.personalSpace;
    this.x += this.movementX;
    this.y += this.movementY;
    //this.y += this.randomYMovement();
    /*this.moveTowards(
      this.targetX + this.randomXMovement(),
      this.targetY + this.randomYMovement(),
    );*/
  }

  randomXMovement() {
    let randomBoolean = Math.random() >= 0.5;
    if (randomBoolean) {
      return ((this.x - this.targetX) * Math.random()) / this.updateFrames;
    } else {
      return ((this.targetX - this.x) * Math.random()) / this.updateFrames;
    }
  }

  randomYMovement() {
    let randomBoolean = Math.random() >= 0.5;
    if (randomBoolean) {
      return ((this.y - this.targetY) * Math.random()) / this.updateFrames;
    } else {
      return ((this.targetY - this.y) * Math.random()) / this.updateFrames;
    }
  }

  update() {
    //this.moveTowards(this.scene.vehicle.x, this.scene.vehicle.y);
    this.moveRandomlyTowards();
    /*if (this.updateCounter % 60 === 0) {
      console.log(this.x);
    }
    /*
    this.updateCounter++;
    if(this.updateCounter % 60){
      console.log(this.x)
    }
    */
  }
}
