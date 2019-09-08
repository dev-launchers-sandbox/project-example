import Phaser from "phaser";
import Enemy from "./Enemy";

export default class Vehicle extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, speed) {
    super(scene, x, y, "cake");
    this.scene = scene;

    //TODO; add animation

    // Add this to the scene as a Phaser game object
    scene.add.existing(this);

    this.gravity = 10;
    this.friction = 10;
    this.speed = speed;
    this.health = 10;
    this.updateCounter = 0;
    this.losingDisplay = undefined;

    // Create the physics-based sprite that we will move around and animate
    scene.physics.add
      .existing(this)
      .setDrag(250, 0)
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
    this.updateCounter++;
    if (this.updateCounter % 30 === 0) {
      this.health -= 1;
    }

    this.healthDisplay.setText("Health:" + this.health);

    if (this.health === 0) {
      this.losing();
      this.destroy();
      console.log("destroy");
    }
  }

  losing() {
    this.losingDisplay = this.scene.add.text(500 / 3, 350 / 3, "YOU LOOSE", {
      font: "25px monospace",
      fill: "#ffffff",
      padding: { x: 1, y: 1 },
      backgroundColor: "#000000"
    });
    let timer = this.scene.time.delayedCall(5000, () => {
      this.scene.scene.restart();
    }); // delay in ms
  }

  update() {}
}
