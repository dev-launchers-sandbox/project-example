import Phaser from "phaser";

export default class Powerup extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y, "power", 0);
    this.scene = scene;

    // Add this to the scene as a Phaser game object
    scene.add.existing(this);
    // Create the physics-based sprite that we will move around and animate
    this.sprite = scene.physics.add
      .existing(this)
      .setDrag(500, 0)
      .setMaxVelocity(200, 400)
      .setCollideWorldBounds(true);
  }

  update() {}

  destroy() {}
}
