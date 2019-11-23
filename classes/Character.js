import Phaser from "phaser";

export default class Character extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y, "baker", 0);
    this.scene = scene;

    // Add this to the scene as a Phaser game object
    scene.add.existing(this);
    // Create the physics-based sprite that we will move around and animate
    this.sprite = scene.physics.add
      .existing(this)
      .setDrag(250, 0)
      .setMaxVelocity(200, 400)
      .setCollideWorldBounds(true);
    // Create the animations we need from the player spritesheet

    const anims = scene.anims;
    anims.create({
      key: "baker-idle",
      frames: anims.generateFrameNumbers("baker", { start: 1, end: 1 }),
      frameRate: 3,
      repeat: -1
    });
    this.anims.play("baker-idle", true);

    /*anims.create({
      key: "johnny-walk",
      frames: anims.generateFrameNumbers("johnny", { start: 5, end: 7 }),
      frameRate: 12,
      repeat: -1
    });*/
  }

  /*
   * moveTowards
   * this fucntion will allow for any character
   * to move towards the targetX and targetY position
   */
  moveTowards(targetX, targetY) {
    if (this.x > targetX) {
      this.x -= 1;
    } else if (this.x < targetX) {
      this.x += 1;
    } else if (this.x !== targetX) {
      this.x -= 1;
    }
    if (this.y > targetY) {
      this.y -= 1;
    } else if (this.y < targetY) {
      this.y += 1;
    }
  }
}
