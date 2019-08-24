import Character from "./Character.js";
import Phaser from "phaser";

export default class Enemy extends Character {
  constructor(scene, x, y) {
    super(scene, x, y);
    this.attackVal = 10;
    this.step = 1;
    this.updateCounter = 0;
    /*console.log(this.scene);*/
  }

  update() {
    this.moveTowards(this.scene.vehicle.x, this.scene.vehicle.y);
    /*
    this.updateCounter++;
    if(this.updateCounter % 60){
      console.log(this.x)
    }
    */
  }
}
