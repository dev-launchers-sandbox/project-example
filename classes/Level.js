import Phaser from "phaser";
import Score from "../Score";

export default class Level extends Phaser.Scene {
  constructor() {
    super({
      key: "level",
      active: true,
      visible: false
    });
    this.level = 1;
    this.numOfObs = 0;
    this.gameLives = 3;
    alert("helo");
  }

  create() {}
  update() {}

  destroy() {}
}
