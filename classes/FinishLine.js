import Phaser from "phaser";

export default class FinishLine extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y, "power", 0);
    this.scene = scene;
    this.winDisplay = undefined;
    this.updateCounter = 0;

    // Add this to the scene as a Phaser game object
    scene.add.existing(this);
    // Create the physics-based sprite that we will move around and animate
    this.sprite = scene.physics.add
      .existing(this)
      .setDrag(500, 0)
      .setMaxVelocity(200, 400)
      .setCollideWorldBounds(true);
  }

  winning() {
    //this.updateCounter++;
    this.winDisplay = this.scene.add.text(
      this.scene.game.config.width / 3,
      this.scene.game.config.height / 3,
      "YOU WIN",
      {
        font: "13px monospace",
        fill: "#ffffff",
        padding: { x: 1, y: 1 },
        backgroundColor: "#ff0000"
      }
    );

    let timer = this.scene.time.delayedCall(3000, () => {
      this.scene.scene.restart();
    }); // delay in ms
  }

  update() {}

  destroy() {}
}
