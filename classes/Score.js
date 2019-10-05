import Phaser from "phaser";
import Cake from "./Cake.js";

const WINNING_SCORE = 5;
const INIT_X = 160;
const INIT_Y = 0;

export default class Score extends Phaser.GameObjects.Text {
  constructor(scene) {
    super(scene, INIT_X, INIT_Y, "Score: " + 0, {
      font: "10px monospace",
      fill: "#ffffff",
      padding: { x: 8, y: 1 },
      backgroundColor: "#000000"
    });
    this.scene = scene;
    this.score = 0;

    scene.add.existing(this);

    this.scene.emitter.on("cakeTouched", this.losing, this);
    this.scene.emitter.on("finishLineTouched", this.winning, this);
    this.scene.emitter.on("obstacleTouched", this.losing, this);
  }

  winning() {
    this.updateCounter++;

    this.score += 1;
    console.log("current score ", this.score);

    this.updateScore();

    if (this.score === WINNING_SCORE) {
      this.scene.scene.start("WinScene");
    }
    this.scene.cake.destroy();
    this.scene.cake = new Cake(this.scene);
  }

  

  losing() {
    this.score -= 1;

    this.updateScore();
    if (this.score < 0) {
      this.scene.scene.start("LoseScene");
    }

    /*
    let timer = this.scene.time.delayedCall(5000, () => {
      this.scene.scene.restart();
    }); // delay in ms
    */
  }
  
  updateScore() {
    this.setText("Score:" + this.score);

  }
  

  update() {}

  destroy() {}
}
