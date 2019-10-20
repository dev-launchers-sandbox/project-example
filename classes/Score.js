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
    this.updateCounter = 0;

    scene.add.existing(this);

    this.scene.emitter.on("cakeTouched", this.obstacleAndCakeTouch, this);
    this.scene.emitter.on(
      "finishLineTouched",
      this.cakeAndFinishlineTouch,
      this
    );
    this.scene.emitter.on("obstacleTouched", this.obstacleAndCakeTouch, this);
  }
  //winnning:
  cakeAndFinishlineTouch() {
    this.updateCounter++;

    this.score += 1;
    console.log("current score ", this.score);

    this.updateScore();

    if (this.score === WINNING_SCORE) {
      this.win();
    }
    this.scene.cake.destroy();
    this.scene.cake = new Cake(this.scene);
  }

  //obstacleAndCakeTouch: gets called when cake and obstacle touch
  obstacleAndCakeTouch() {
    this.updateCounter++;

    this.score -= 1;

    this.updateScore();

    if (this.score < 0) {
      this.lost();
    }

    /*
    let timer = this.scene.time.delayedCall(5000, () => {
      this.scene.scene.restart();
    }); // delay in ms
    */
  }
  //updateScore: updates the score when score changes
  updateScore() {
    this.setText("Score:" + this.score);
  }

  // Lost: this is called when you lose
  lost() {
    this.scene.obstacles.forEach(obstacle => {
      obstacle.destroy();
    });
    this.scene.scene.start("LoseScene");
  }

  win() {
    this.scene.obstacles.forEach(obstacle => {
      obstacle.destroy();
    });
    this.scene.scene.start("WinScene");
  }
  update() {}

  destroy() {
    super.destroy();
  }
}
