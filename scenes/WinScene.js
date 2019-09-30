import Phaser from "phaser";
import Player from "../classes/Player.js";
import PlayScene from "./PlayScene.js";

export default class WinScene extends Phaser.Scene {
  constructor() {
    super({ key: "WinScene" });
  }
  preload() {
    this.load.spritesheet("baker", "./assets/baker.png", {
      frameWidth: 16,
      frameHeight: 16,
      margin: 0,
      spacing: 0
    });
    this.load.image("titleScreen", "/assets/TITLESCREEN.png");
    this.load.audio("music", "./assets/Hypnotic-Puzzle3.mp3");

    //this.load.audio('introMusic', "./assests/Hypnotic-Puzzle3.mp3");
  }

  create() {
    //console.log("enter");

    //console.log(this);
    const camera = this.cameras.main;
    const cursors = this.input.keyboard.createCursorKeys();
    camera.setBounds(0, 0, this.game.config.width, this.game.config.height);

    this.coolMusic = this.sound.add("music");
    this.coolMusic.play();
    /* 
    let sound = this.sound.add("introMusic");
    this.sound.play('introMusic', {
      loop: true
    });
  */

    this.add.text(
      this.game.config.width / 3,
      this.game.config.height / 3,
      "You win",
      {
        font: "13px monospace",
        fill: "#ff0000",
        padding: { x: 1, y: 1 },
        backgroundColor: "#0000ff"
      }
    );

    //this.input.on("pointerdown", () => console.log("clicked"));
    this.input.on("pointerdown", (pointer, localX, localY, event) => {
      this.coolMusic.stop();
      this.scene.start("TitleScene");
    });
    // ...
    // console.log("exit");
  }
  takeToPlayScene() {
    //this.scene.scene.add("default", sceneConfig, true);
    // var newScene = game.scene.add(key, sceneConfig, autoStart, data);
    console.log("clicked");
    this.scene.start("default");
    // game.scene.add(key, sceneConfig, autoStart);
  }

  /* </End> Helper functions added by kris */
}
