import Phaser from "phaser";
import Enemy from "./Enemy";

export default class Vehicle extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, speed) {
    super(scene, x, y, "cake");
    this.scene = scene;

    //TODO; add animation

    // Add this to the scene as a Phaser game object
    scene.add.existing(this);

    this.gravity = 0;
    this.friction = 10;
    this.speed = speed;
    this.health = 200;
    this.updatecounter = 0;

    // Create the physics-based sprite that we will move around and animate
    scene.physics.add
      .existing(this)
      .setDrag(100, 0)
      .setMaxVelocity(200, 400)
      .setFriction(this.friction)
      .setCollideWorldBounds(true)
      .setBounce(1.5, 0.4);

    this.healthDisplay = scene.add
      .text(64, 0, "Health:" + this.health, {
        font: "16px monospace",
        fill: "#ffffff",
        padding: { x: 1, y: 1 },
        backgroundColor: "#000000"
      })
      .setScrollFactor(0);

    const anims = scene.anims;
    anims.create({
      key: "cake-idle",
      frames: anims.generateFrameNumbers("cake", { start: 0, end: 3 }),
      frameRate: 3,
      repeat: -1
    });
    this.anims.play("cake-idle", true);
  }

  takeAwayHealth() {
    /*if (this.updatecounter % 60 === 0){*/
    this.health -= 1;

    this.healthDisplay.setText("Health:" + this.health);

    if (this.health === 0) {
      this.destroy();
      console.log("destroy");
    }
    if (this.healthDisplay === 0) {
      console.log("dead");
    }
  }

  update() {}
}
