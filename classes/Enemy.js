import Character from "./Character.js";
import Phaser from "phaser";

export default class Enemy extends Character {
  constructor(scene, x, y) {
    super(scene, x, y);
    this.attackVal = 10;
  }

  update() {}
}
