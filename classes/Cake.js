import Phaser from "phaser";
import Enemy from "./Enemy";
const INIT_X = 50;
const INIT_Y = 5;
export default class Cake extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, speed) {
    super(scene, INIT_X, INIT_Y, "cake");
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

    this.scene.physics.add.collider(this, this.scene.platforms);
    this.scene.physics.add.collider(this.scene.player, this);
    this.scene.physics.add.collider(
      this.scene.enemy,
      this,
      this.scene.enemyAndCakeCallback
    );

    this.scene.physics.add.collider(
      this,
      this.scene.finishLine,
      this.scene.playerAndFinishLineCallback
    );
    this.scene.physics.add.collider(
      this,
      this.scene.obstacles,
      this.scene.cakeAndObstacleCallback
    );

    // Create the physics-based sprite that we will move around and animate
    scene.physics.add
      .existing(this)
      .setDrag(250, 0)
      .setMaxVelocity(200, 400)
      .setFriction(this.friction)
      .setCollideWorldBounds(true)
      .setBounce(1.5, 0);

    this.healthDisplay = scene.add
      .text(20, 10, "Health:" + this.health, {
        font: "10px monospace",
        fill: "#ffffff",
        padding: { x: 8, y: 1 },
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
    //console.log(this.healthDiplay);
  }

  takeAwayHealth() {
    this.updateCounter++;
    if (this.updateCounter % 30 === 0) {
      this.health -= 1;
    }

    this.healthDisplay.setText("Health:" + this.health);

    if (this.health === 0) {
      this.scene.events.emit("cakeTouched");
      this.scene.cake = new Cake(this.scene, 80, 5);
      this.destroy();

      //new Cake(this.scene, 80, 5)
    }
  }

  update() {}
}
