import Phaser from "phaser";

export default class Powerup extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y, "power", 0);
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

    // When the player collides with the powerup, the powerpul will activate then destroy itself.
    scene.physics.add.overlap(
      scene.player,
      this,
      () => {
        this.activate();
        this.destroy();
      },
      null,
      scene
    );
  }

  activate() {
    //gives us easier access to scene
    let scene = this.scene;
    //changes the gravity of dynamic objets to -10
    this.scene.physics.world.gravity.y = -10;
    //when 5 seconds pass the graivty gets set back to default
    this.scene.time.delayedCall(
      5000,
      () => {
        scene.physics.world.gravity.y = 500;
      },
      null,
      this.scene
    );
    console.log("powerup activated");
  }

  destroy() {
    super.destroy();
  }
}
