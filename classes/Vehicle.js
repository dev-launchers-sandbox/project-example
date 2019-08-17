import Phaser from "phaser";

export default class Vehicle extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, speed) {
    super(scene, x, y, speed, "Vehicle");
    this.scene = scene;
    this.x = x;
    this.y = y;
    this.gravity = 0;
    this.friction = 10;
    this.speed = speed;

    // Create the physics-based sprite that we will move around and animate
    this.sprite = scene.physics.add
      .sprite(x, y, "johnny", 0)
      .setDrag(100, 0)
      .setMaxVelocity(200, 400)
      .setFriction(this.friction)
      .setCollideWorldBounds(true)

      .setBounce(1.5, 0);
  }

  update() {}

  destroy() {}
}
