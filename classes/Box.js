import Phaser from "phaser";

export default class Box extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y, "box");
    this.scene = scene;
    //player and powerup collisions

    // Add this to the scene as a Phaser game object
    scene.add.existing(this);

    // Create the physics-based sprite that we will move around and animate
    this.sprite = scene.physics.add
      .existing(this)
      //.setDrag(500, 0)
      .setMaxVelocity(200, 400)
      .setCollideWorldBounds(true);
    this.body.setMaxVelocity(0, 200);
  }
}
