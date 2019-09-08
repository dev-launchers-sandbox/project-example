import Phaser from "phaser";

export default class Powerup extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y, "power", 0);
    this.scene = scene;

    // Add this to the scene as a Phaser game object
    scene.add.existing(this);
    // Create the physics-based sprite that we will move around and animate
    this.sprite = scene.physics.add
      .existing(this)
      //.setDrag(500, 0)
      .setMaxVelocity(200, 400)
      .setCollideWorldBounds(true);
  }

  moveAway(targetX, targetY) {
    if (this.x < targetX) {
      this.x -= 0.5;
    } else if (this.x > targetX) {
      this.x += 0.5;
    }
    if (this.y < targetY) {
      this.y -= 0.5;
    } else if (this.y > targetY) {
      this.y += 0.5;
    }
  }

  activate() {
    this.scene.enemy.moveAway(this.scene.player.x, this.scene.player.y);
  }

  update() {}

  destroy() {}
}
