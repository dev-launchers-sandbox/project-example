import Phaser from "phaser";
import Player from "../classes/Player.js";
import Enemy from "../classes/Enemy.js";
import Cake from "../classes/Cake.js";
import Powerup from "../classes/Powerup.js";
import FinishLine from "../classes/FinishLine.js";
import Obstacle from "../classes/Obstacle.js";
import RandomDataPoints from "../classes/RandomDataPoints.js";
import Score from "../classes/Score.js";
import { STAGE_CONFIG } from "../settings/StageConfig.js";
import smashSound from "../assets/thump2.mp3";
import jump from "../assets/jump.wav";
import yay from "../assets/yay.wav";
import chomp from "../assets/chomp.wav";

export default class PlayScene extends Phaser.Scene {
  constructor(key, numObstacles, level) {
    /*
      if key already exists,set it to the current key
      else, if key value doesn't already exist set key to "PlayScene"
    */
    if (key) {
      super(key);
    } else {
      super("PlayScene");
    }
    this.numObstacles = numObstacles;
    /*
      if level value already exists, set level to the current level
      else, if level value doesn't already exist set level to 0
    */
    if (level) {
      this.level = level;
    } else {
      this.level = 0;
    }
    /*
      if number of obstacles already exists, set number of obstacles to the current number of obstacles
      else, if number of obstacles doesn't already exist set number of obstacles to 1
    */
    if (numObstacles) {
      this.numObstacles = numObstacles;
    } else {
      this.numObstacles = 1;
    }
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
      frameWidth: 32,
      frameHeight: 32,
      margin: 0,
      spacing: 0
    });
    this.load.spritesheet("trap", "./assets/small_traps.png", {
      frameWidth: 16,
      frameHeight: 16,
      margin: 0,
      spacing: 0
    });
    this.load.spritesheet("trap", "./assets/small_traps.png", {
      frameWidth: 16,
      frameHeight: 16,
      margin: 0,
      spacing: 0
    });

    this.load.image("power", "./assets/powerup.png");
    this.load.image("PlaySceneIMage", "./assets/Hungryghostbc.png");
    //loading audio
    this.load.audio("smash", smashSound);
    this.load.audio("jump", jump);
    this.load.audio("yay", yay);
    this.load.audio("chomp", chomp);
  }

  create() {
    this.game.events.on("obstacleDestroy", this.destroyObstacle, this);
    const camera = this.cameras.main;
    const cursors = this.input.keyboard.createCursorKeys();
    camera.setBounds(0, 0, this.game.config.width, this.game.config.height);
    camera.setZoom(1.15);
    //creates player
    this.player = new Player(this, 30, 5);
    //make the game caemra follow the player
    camera.startFollow(this.player);

    //background image
    this.add.image(
      this.game.config.width / 2,
      this.game.config.height / 2,
      "PlaySceneIMage"
    );
    //creates enemy
    this.enemy = new Enemy(this, 10, 0);
    //creates powerup
    this.powerup = new Powerup(this, 100, 5);
    //creates finishline
    this.finishLine = new FinishLine(this, 500, 100);
    //creates score
    this.score = new Score(this);
    //creates randomDataPointsGenerator
    this.randomDataPointsGenerator = new RandomDataPoints();
    //creates a reference to the location of the randomly generated obstacles
    const obstacleLocations = this.randomDataPointsGenerator.datapoints(
      this.numObstacles,
      this.game.config.width - 50,
      this.game.config.height
    );
    //creates obstacle array
    this.obstacles = [];
    //creates obstacles and pushes them into the obstacles array
    obstacleLocations.forEach(point => {
      this.obstacles.push(new Obstacle(this, point.x, point.y));
    });
    //creates cake
    this.cake = new Cake(this);
    //creates reference to stage config data
    let stageData = STAGE_CONFIG;
    let level = this.level;
    //accesses platform data based on current level
    this.platforms = stageData[level].platforms;
    //this array gets all the platforms for the current level,so we can perform collisions with multiple platforms
    this.platformArray = [];
    console.log(this.platforms.length);

    if (level === this.platforms.length) {
      console.log("if statement works");
      this.scene.start("WinScene");
    }
    /*
      this loop goes through the platforms of the current level
      then it phyisically creates the platforms for the level
      then it pushes all the platforms for that level into the array
    */
    for (let i = 0; i < this.platforms.length; i++) {
      let platform = this.platforms[i];
      this.physicalPlatform = this.addPhysicalRectangle(
        platform.x,
        platform.y,
        platform.width,
        platform.height,
        this.RandomColor()
      );
      this.platformArray.push(this.physicalPlatform);
    }
    //collisions between objects and platforms
    this.platformCollisions();
    //collisions between player and cake
    this.physics.add.collider(this.player, this.cake);
    //turns off physics gravity for the ghost
    this.enemy.body.setAllowGravity(false);
  }
  //function for collisions between objects and platforms
  platformCollisions() {
    this.physics.add.collider(this.player, this.platformArray);
    this.physics.add.collider(this.cake, this.platformArray);
    this.physics.add.collider(this.powerup, this.platformArray);
    this.physics.add.collider(this.enemy, this.platformArray);
    this.physics.add.collider(this.obstacles, this.platformArray);
    this.physics.add.collider(this.finishLine, this.platformArray);
  }
  /*
    this method is called when GameLevelManger switches level
    It's intended to destroy every object reference from the game
  */
  destroyObstacle() {
    console.log("obstacle destroy methodd has been called");
    this.obstacles.forEach(obstacle => {
      obstacle.destroy();
    });
    this.finishLine.destroy();
  }
  /*
    gets called when enemy and cake collide
    when called it takes away cakes health and "cakeTouch" event is emitted
  */
  enemyAndCakeCallback(enemy, cake) {
    // console.lo(this);
    //cake.takeAwayHealth();
    this.game.events.emit("cakeTouched");
  }
  /*
    gets called when player and powerup collide
  */
  playerAndPowerupCallback(player, powerup) {
    powerup.activate();
  }
  /*
    gets called when cake and finishline touch
    when they collide, function emits "finish;ineTouched"
  */
  cakeAndFinishLineCallback(cake, finishLine) {
    this.game.events.emit("finishLineTouched");
  }
  /*
    gets called when cake and obstacle collide
    when they collide, function emits "obstacleTouches"
  */
  cakeAndObstacleCallback(cake, obstacle) {
    this.game.events.emit("obstacleTouched");
  }
  //changes the tint for any object
  changeTint(platform) {
    let rand = Math.random() * 0xaa;
    platform.tint = Math.floor(rand);
  }
  /* Color are in RGB format. The first byte is blue value, the second byte is the green value, and the thrid byte is the red
     value
  */
  //when called it destroys any instances of obstacle and finishline
  destroy() {
    this.obstacles.forEach(obstacle => {
      obstacle.destroy();
    });
    this.finishLine.destroy();
  }
  //when called it restarts the entire scene
  restart() {
    this.scene.restart();
  }
  //returns a random rgb value
  RandomColor() {
    return this.randomRed() + this.randomGreen() + this.randomBlue();
  }
  //return a random hex value for blue
  randomBlue() {
    return Math.floor(Math.random() * 0xff);
  }
  //returns a random hex value for green
  randomGreen() {
    return Math.floor(Math.random() * 0xff) << 8;
  }
  //returns a random hex value for red
  randomRed() {
    return Math.floor(Math.random() * 0xaa) << 16;
  }
  //calls player and enemy updates
  update(time, delta) {
    this.player.update(time, delta);
    this.enemy.update(time, delta);
  }

  update(time, delta) {
    this.player.update(time, delta);
    this.enemy.update(time, delta);
    this.cake.update(time, delta);
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

  /*
    Method to switch to win scene, use as a callback for Score object
  */

  /* </End> Helper functions added by kris */
}
