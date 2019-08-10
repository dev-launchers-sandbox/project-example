import Character from "./Character.js";
import Phaser from "phaser";

export default class Enemy extends Character {
  constructor(scene, x, y) {
    super(scene, x, y);
    this.attackVal = 10;
    this.step = 1;
    this.updateCounter = 0;
  }

  update() {
    /*
    this.updateCounter++;
    this.updateCounter % 60;
    this.x = this.x + this.step;
    if (this.x > 50) this.step = this.step + -1;
    else if (this.x < 0) this.step = this.step + 1;

    console.log(this.step);
    */
  }
}
