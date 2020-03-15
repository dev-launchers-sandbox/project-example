import Phaser from "phaser";

export default class FinishLine extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y, "finishLine", 0);
    this.scene = scene;
    //this.winDisplay = undefined;
    this.updateCounter = 0;
    //this.score = 0;
    this.friction = 10;

    // Add this to the scene as a Phaser game object and makes it static
    scene.add.existing(this, true);

    // Create the physics-based sprite that we will move around and animate
    this.sprite = scene.physics.add.existing(this, true);
    //.setDrag(500, 0)
    //.setMaxVelocity(200, 400)
    //.setCollideWorldBounds(true);
  }

  update() {}

  destroy() {
    super.destroy();
  }
}
