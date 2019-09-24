import Phaser from "phaser";
import Player from "../classes/Player.js";
import Enemy from "../classes/Enemy.js";
import Cake from "../classes/Cake.js";
import Powerup from "../classes/Powerup.js";
import FinishLine from "../classes/FinishLine.js";

export default class PlayScene extends Phaser.Scene {
  constructor() {
    super("PlayScene");
    console.log("wow");
  }
  preload() {
    this.load.spritesheet("johnny", "./assets/johnny_sprite.png", {
      frameWidth: 16,
      frameHeight: 16,
      margin: 0,
      spacing: 0
    });
    this.load.spritesheet("cake", "./assets/cake.png", {
      frameWidth: 16,
      frameHeight: 16,
      margin: 0,
      spacing: 0
    });
    this.load.spritesheet("ghost", "./assets/ghost.png", {
      frameWidth: 16,
      frameHeight: 16,
      margin: 0,
      spacing: 0
    });
    this.load.spritesheet("baker", "./assets/baker.png", {
      frameWidth: 16,
      frameHeight: 16,
      margin: 0,
      spacing: 0
    });
    this.load.spritesheet("finishLine", "./assets/finish line.png", {
      frameWidth: 16,
      frameHeight: 16,
      margin: 0,
      spacing: 0
    });

    this.load.image("power", "./assets/powerup.png");
  }

  create() {
    this.player = new Player(this, 40, 5);
    this.enemy = new Enemy(this, 10, 0);
    this.cake = new Cake(this, 80, 5);
    this.powerup = new Powerup(this, 100, 5);
    this.finishLine = new FinishLine(this, 500, 100);

    this.player.setDepth(1);

    const camera = this.cameras.main;
    const cursors = this.input.keyboard.createCursorKeys();
    camera.setBounds(0, 0, this.game.config.width, this.game.config.height);

    this.platforms = [
      this.addPhysicalRectangle(150 / 2, 100 / 2, 500 / 2, 10 / 2, 0xaa0000),
      this.addPhysicalRectangle(350 / 2, 200 / 2, 500 / 2, 10 / 2, 0xaa0000),
      this.addPhysicalRectangle(250 / 2, 300 / 2, 500 / 2, 10 / 2, 0xaa0000)
    ];
    //Player collisions
    this.physics.add.collider(this.player, this.platforms);
    //powerup collisions
    this.physics.add.collider(this.powerup, this.platforms);
    //vehicle collisions
    this.physics.add.collider(this.cake, this.platforms);
    //player and vehicle collisions
    this.physics.add.collider(this.player, this.cake);
    //enemy collisions
    this.physics.add.collider(this.enemy, this.platforms);
    //enemy and vehicle collision
    this.physics.add.collider(this.enemy, this.cake, this.enemyAndCakeCallback);

    //player and finishline collision
    this.physics.add.collider(
      this.cake,
      this.finishLine,
      this.playerAndFinishLineCallback
    );

    this.enemy.body.setAllowGravity(false);
  }
  enemyAndCakeCallback(enemy, cake) {
    cake.takeAwayHealth();
  }
  playerAndPowerupCallback(player, powerup) {
    powerup.activate();
  }
  playerAndFinishLineCallback(cake, finishLine) {
    finishLine.winning();
  }

  update(time, delta) {
    this.player.update(time, delta);
    this.enemy.update(time, delta);
  }

  /* <Begin> helper functions added by Kris */
  //
  //

  addPhysicalRectangle(x, y, width, height, color, alphaIThinkMaybe) {
    // TODO: alphaIThinkMaybe name change
    let rect = this.add.rectangle(x, y, width, height, color, alphaIThinkMaybe);
    rect = this.physics.add.existing(rect, true);

    return rect;
  }

  /* </End> Helper functions added by kris */
}
