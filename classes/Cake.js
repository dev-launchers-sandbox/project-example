import Phaser from "phaser";
import Enemy from "./Enemy";
const INIT_X = 45;
const INIT_Y = 5;
const HEALTH = 10;
export default class Cake extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, speed) {
    super(scene, INIT_X, INIT_Y, "cake");
    this.id = Math.floor(Math.random() * Math.floor(10));

    this.scene = scene;
    this.chompSound = this.scene.sound.add("chomp");

    //TODO; add animation

    // Add this to the scene as a Phaser game object
    scene.add.existing(this);

    this.gravity = 10;
    this.friction = 10;
    this.speed = speed;
    this.health = HEALTH;
    this.updateCounter = 0;
    this.losingDisplay = undefined;

    this.scene.physics.add.collider(this.scene.player, this);
    this.scene.physics.add.overlap(
      this.scene.enemy,
      this,
      this.scene.enemyAndCakeCallback,
      null,
      this.scene
    );

    this.scene.physics.add.collider(
      this,
      this.scene.finishLine,
      this.scene.cakeAndFinishLineCallback,
      null,
      this.scene
    );

    this.scene.physics.add.collider(
      this,
      this.scene.teleporters,
      this.scene.spriteAndTeleporterCallback,
      null,
      this.scene
    );

    this.scene.physics.add.collider(this, this.scene.platformArray);

    this.scene.physics.add.collider(
      this,
      this.scene.obstacles,
      this.scene.cakeAndObstacleCallback,
      null,
      this.scene
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
    this.scene.game.events.on("cakeTouched", this.takeAwayHealth, this);
    this.scene.game.events.on("obstacleTouched", this.takeAwayHealth, this);
    console.log("health constructor", this.health);
    //console.log(this.health, "constructor");
  }
  /*
    takeAwayHealth() gets called when ghost and cake touch
    when called it decrements health and if health equals 0 it destroys and makes a new cake
  */
  takeAwayHealth() {
    this.updateCounter++;
    if (this.updateCounter % 30 === 0) {
      this.health -= 1;
    }
    /*
      Updates and renders the text when enemy touches the cake
      TODO: Fix error thrown when the game switches level and the ghost collides with the cake
    */
    //console.log(this.health, "takeAwayHealth");
    this.healthDisplay.setText("Health:" + this.health);
    this.chompSound.play();
    if (this.health === 0) {
      this.scene.cake = new Cake(this.scene, 80, 5);
      this.destroy();
      //new Cake(this.scene, 80, 5)
    }
  }
  /*
    destroys the cake when called
    it unhooks the cake event 
  */
  destroy() {
    this.scene.game.events.off("cakeTouched", this.takeAwayHealth, this);
    this.scene.game.events.off("obstacleTouched", this.takeAwayHealth, this);
    super.destroy();
    console.log("cake destroy method");
  }

  update() {}
}
