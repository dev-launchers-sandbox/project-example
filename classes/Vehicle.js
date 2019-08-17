import Phaser from "phaser";

export default class Vehicle extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, speed) {
    super(scene, x, y, "johnny");
    this.scene = scene;

    // Add this to the scene as a Phaser game object
    scene.add.existing(this);

    this.gravity = 0;
    this.friction = 10;
    this.speed = speed;

    // Create the physics-based sprite that we will move around and animate
    scene.physics.add
      .existing(this)
      .setDrag(100, 0)
      .setMaxVelocity(200, 400)
      .setFriction(this.friction)
      .setCollideWorldBounds(true)
      .setBounce(1.5, 0);
  }

  update() {}

  destroy() {}
}
