import Phaser from "phaser";

export default class Vehicle {
  constructor(scene, x, y, speed) {
    this.scene = scene;
    this.x = x;
    this.y = y;
    this.gravity = 0;
    this.friction = 0.2;
    this.speed = speed;

    // Create the physics-based sprite that we will move around and animate
    this.sprite = scene.physics.add
      .sprite(x, y, "johnny", 0)
      .setDrag(0, 0)
      .setMaxVelocity(200, 400)
      .setFriction(this.friction)
      .setBounce(1, 0);
  }

  update() {}

  destroy() {}
}
