import Phaser from "phaser";
import Cake from "./Cake.js";
import GameLevelManager from "./GameLevelManager";
import FinishLine from "./FinishLine.js";

const WINNING_SCORE = 1;
const INIT_X = 160;
const INIT_Y = 10;

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
    this.setScrollFactor(0, 0);

    this.setScrollFactor(0, 0);

    scene.add.existing(this);

    this.scene.game.events.on("obstacleTouched", this.enemyAndCakeTouch, this);
    this.scene.game.events.on("cakeTouched", this.enemyAndCakeTouch, this);
    this.scene.game.events.on(
      "finishLineTouched",
      this.cakeAndFinishlineTouch,
      this
    );
  }
  /*
    cakeAndEnemyTouch(): gets called when cake and finsihline collide
    when called it increments score, updates score, and checks if you win
  */
  cakeAndFinishlineTouch() {
    this.updateCounter++;
    console.log("the cake is touching the finsihline");
    this.score += 1;
    console.log("current score ", this.score);

    this.updateScore();
    //this.setText("Score: " + this.score);

    if (this.score === WINNING_SCORE) {
      this.scene.game.events.emit("win");
      this.scene.game.events.emit("changeLevel");
    }
    this.scene.cake.destroy();
    this.scene.cake = new Cake(this.scene);
  }

  /* 
    enemyAndCakeTouch: gets called when cake collides with the obstacle and ghost
    when called it decrements score anf score gets updated
  */
  enemyAndCakeTouch() {
    //console.log("called method");
    this.updateCounter++;
    if (this.updateCounter % 30 === 0) {
      this.health -= 1;
    }

    this.updateScore();
    //this.setText("Score: " + this.score);
    /*
    if (this.score < 0) {
      console.log("emitter works");
      this.scene.game.events.emit("lost");
    }
    */

    /*
    let timer = this.scene.time.delayedCall(5000, () => {
      this.scene.scene.restart();
    }); // delay in ms
    */
  }
  //updateScore: updates the score when score gets incremented or decremented
  updateScore() {
    //console.log("I'm a working score function");
    this.setText("Score: " + this.score);
  }

  // Lost: this is called when you lose

  update() {}
}
