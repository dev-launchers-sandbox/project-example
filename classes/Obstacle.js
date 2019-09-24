/* Im making a obstacle class to make 
the game more challenging*/

import Phaser from "phaser";

export default class Obstacle extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y, "power", 0);
    this.scene = scene;

    // Add this to the scene as a Phaser game object
    //scene.physics.add.existing(this);
    // Create the physics-based sprite that we will move around and animate

    this.changeTint(this);
    // Add this to the scene as a Phaser game object
    scene.add.existing(this); // add to rendering engine

    scene.physics.add // add to physics engine
      .existing(this)
      .setDrag(0, 0)
      .setMaxVelocity(0, 0)
      .setFriction(this.friction)
      .setCollideWorldBounds(true)
      .setBounce(0, 0);
  }

  playerLost() {
    this.losingDisplay = this.scene.add.text(
      this.scene.game.config.width / 3,
      this.scene.game.config.height / 3,
      "YOU LOOSE",
      {
        font: "13px monospace",
        fill: "#ffffff",
        padding: { x: 1, y: 1 },
        backgroundColor: "#000000"
      }
    );
    let timer = this.scene.time.delayedCall(5000, () => {
      this.scene.scene.restart();
    });
  } // delay in ms

  changeTint(sprite) {
    sprite.tint = Math.random() * 0xffffff;
  }

  update() {}

  destroy() {}
}
