/* Im making a obstacle class to make 
the game more challenging*/

import Phaser from "phaser";

export default class Obstacle extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y, "trap", 0);
    this.scene = scene;

    // Add this to the scene as a Phaser game object
    //scene.physics.add.existing(this);
    // Create the physics-based sprite that we will move around and animate

    //this.changeTint(this);
    // Add this to the scene as a Phaser game object
    scene.add.existing(this); // add to rendering engine

    this.physicalSprite = scene.physics.add // add to physics engine
      .existing(this)
      .setDrag(0, 0)
      .setMaxVelocity(0, 100)
      .setFriction(this.friction)
      .setCollideWorldBounds(true)
      .setBounce(0, 0);
  }

  playerLost() {
    this.scene.emitter.emit("obstacleTouched");
    console.log("touched");
  }

  update() { }

  destroy() {
    super.destroy();
  }
}
