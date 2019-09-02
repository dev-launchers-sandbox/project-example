import Phaser from "phaser";
import Character from "./Character.js";

export default class Player extends Character {
  constructor(scene, x, y) {
    super(scene, x, y);

    // Track the arrow keys & OPQA
    const {
      LEFT,
      RIGHT,
      UP,
      Q,
      O,
      P,
      A,
      D,
      W,
      S
    } = Phaser.Input.Keyboard.KeyCodes;
    this.keys = scene.input.keyboard.addKeys({
      left: LEFT,
      right: RIGHT,
      up: UP,
      q: Q,
      o: O,
      p: P,
      a: A,
      d: D,
      w: W,
      s: S
    });
  }

  update() {
    const keys = this.keys;
    const sprite = this;
    const onGround = sprite.body.blocked.down;
    const acceleration = onGround ? 600 : 200;

    // Apply horizontal acceleration when left/a or right/d are applied
    if (keys.left.isDown || keys.a.isDown) {
      sprite.setAccelerationX(-acceleration);
      sprite.setFlipX(true);
    } else if (keys.right.isDown || keys.d.isDown) {
      sprite.setAccelerationX(acceleration);
      sprite.setFlipX(false);
    } else {
      sprite.setAccelerationX(0);
    }

    // Only allow the player to jump if they are on the ground
    if (onGround && (keys.up.isDown || keys.w.isDown)) {
      sprite.setVelocityY(-5000 * 2);
    }

    // Update the animation/texture based on the state of the player
    if (onGround) {
      if (sprite.body.velocity.x !== 0) {
        sprite.anims.play("johnny-walk", true);
      } else {
        sprite.anims.play("johnny-idle", true);
      }
    } else {
      sprite.anims.stop();
      sprite.setTexture("johnny", 4);
    }
  }

  destroy() {}
}
