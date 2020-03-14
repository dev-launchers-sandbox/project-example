import Phaser from "phaser";

const COLOR = 0xff0000;

export default class Teleporter extends Phaser.GameObjects.Rectangle {
  constructor(scene, x, y, width, height, destinationX, destinationY, color) {
    super(scene, x, y, width, height, color);
    this.scene = scene;
    this.width = width;
    this.height = height;
    this.destinationX = destinationX;
    this.destinationY = destinationY;

    // Add this to the scene as a Phaser game object
    scene.add.existing(this, true);
    // Create the physics-based sprite that we will move around and animate

    this.sprite = scene.physics.add.existing(this, true);
    //.setDrag(250, 0)
    //.setMaxVelocity(200, 400)
    //.setCollideWorldBounds(true);
  }
  // when called it telepo
  teleport(sprite) {
    sprite.x = this.destinationX;
    sprite.y = this.destinationY;
  }

  update() {}

  destroy() {}
}
