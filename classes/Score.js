import Phaser from "phaser";
import Cake from "./Cake.js";
import GameLevelManager from "./GameLevelManager";
import FinishLine from "./FinishLine.js";

const WINNING_SCORE = 1;
const INIT_X = 150;
const INIT_Y = 25;

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

    scene.add.existing(this);

    // this.scene.game.events.on("obstacleTouched", this.enemyAndCakeTouch, this);
    //this.scene.game.events.on("cakeTouched", this.enemyAndCakeTouch, this);
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
    this.score += 1;
    /*
      Updates and renders the score when cake touches the finishline
      TODO: Fix error thrown when the game switches level and the cake collides with the finishline
    */
    this.scene.cake.destroy();
    this.scene.cake = new Cake(this.scene);

    this.updateScore();
    if (this.score === WINNING_SCORE) {
      //this.scene.game.events.emit("win");
      this.scene.game.events.emit("changeLevel");
      this.destroy();
    }
  }

  /* 
    enemyAndCakeTouch: gets called when cake collides with the obstacle and ghost
    when called it decrements score anf score gets updated
  */
  enemyAndCakeTouch() {
    this.updateCounter++;
    if (this.updateCounter % 30 === 0) {
      this.scene.cake.health -= 1;
    }

    if (this.scene.cake.health === 0) {
      this.scene.cake.destroy();
      this.scene.cake = new Cake(this.scene);
    }

    this.scene.cake.healthDisplay.setText("Health:" + this.scene.cake.health);
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
    this.scene.game.events.off(
      "finishLineTouched",
      this.cakeAndFinishlineTouch,
      this
    );
    super.destroy();
  }
}
