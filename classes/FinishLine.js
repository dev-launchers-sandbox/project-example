import Phaser from "phaser";
import Cake from "../classes/Cake.js";

export default class FinishLine extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y, "finishLine", 0);
    this.scene = scene;
    this.winDisplay = undefined;
    this.updateCounter = 0;
    this.score = 0;
    this.friction = 10;

    // Add this to the scene as a Phaser game object
    scene.add.existing(this);

    // Create the physics-based sprite that we will move around and animate
    this.sprite = scene.physics.add
      .existing(this)
      .setDrag(500, 0)
      .setMaxVelocity(200, 400)
      .setCollideWorldBounds(true);


    this.scoreDisplay = scene.add.text(160, 0, "Score: " + this.score, {
      font: "10px monospace",
      fill: "#ffffff",
      padding: { x: 8, y: 1 },
      backgroundColor: "#000000"
    });






  }

  winning() {
    this.updateCounter++;

    console.log(this.score);

    this.score += 1;

    this.scoreDisplay.setText("Score: " + this.score);


    if (this.score === 5) {
      this.scene.scene.start("WinScene");
    }
    this.scene.cake.destroy();
    this.scene.cake = new Cake(this.scene, 80, 5);
  }

  update() {}

  destroy() {}
}
