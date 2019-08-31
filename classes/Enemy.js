import Character from "./Character.js";
import Phaser from "phaser";

export default class Enemy extends Character {
  constructor(scene, x, y) {
    super(scene, x, y);
    this.attackVal = 10;
    this.step = 1;
    this.updateCounter = 0;
    this.distance = 10;

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

  moveRandomlyTowards(targetX, targetY, distance) {
    let x = this.scene.vehicle.x + Math.random() * distance;
    let y = this.scene.vehicle.y + Math.random() * distance;

    this.updateCounter++;
    if (this.updateCounter % 60) {
      //console.log(x)
    }

    this.moveTowards(
      this.scene.vehicle.x + distance,
      this.scene.vehicle.y + distance
    );
  }

  update() {
    //this.moveTowards(this.scene.vehicle.x, this.scene.vehicle.y);
    this.moveRandomlyTowards(
      this.scene.vehicle.x,
      this.scene.vehicle.y,
      this.distance
    );
    /*
    this.updateCounter++;
    if(this.updateCounter % 60){
      console.log(this.x)
    }
    */
  }
}
