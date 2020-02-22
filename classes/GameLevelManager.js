import Phaser from "phaser";
import TitleScene from "../scenes/TitleScene";
import PlayScene from "../scenes/PlayScene";
import LoseScene from "../scenes/LoseScene";
import WinScene from "../scenes/WinScene";
import InstructionScene from "../scenes/InstructionScene.js";
import Score from "./Score";

export const changeLevelEvent = "changeLevel";

const sceneBaseName = "PlayScene";

export default class GameLevelManager extends Phaser.Scene {
  constructor() {
    super({
      key: "Manager",
      active: true,
      visible: false
    });
    this.updateCounter = 0;
    this.level = 0;
    this.generateNum = 1;
    this.currentKey = sceneBaseName;
    this.gameLives = 3;
    this.numOfObs = 1;
  }
  create() {
    this.game.events.on("changeLevel", this.switchLevel, this);
    this.game.events.on("win", this.win, this);
    this.game.events.on("lost", this.lost, this);

    //this.game.events.on("goToWinScene", this.goToWinScene, this);
  }

  update() {}

  destroy() {}

  switchLevel() {
    this.game.events.emit("obstacleDestroy");
    this.level++;
    this.numOfObs++;

    this.scene.remove(this.currentKey);
    //this.scene.start("PlayScene");
    let playScene = new PlayScene(
      this.generateNewKey(),
      this.numOfObs,
      this.level
    );
    this.scene.add("PlayScene", playScene, true);
    //this.scene.start("PlayScene");
    //console.log(changeLevelEvent);
    if (this.level === 6) {
      this.scene.start("WinScene");
    }
  }

  generateNewKey() {
    this.generateNum++;
    const keyString = this.generateNum.toString();

    return sceneBaseName + keyString;
  }

  win() {
    let playScene = this.scene.get(this.currentKey);
    playScene.destroy();
    //this.destroy();

    //this.scene.scene.start("WinScene");
  }
  lost() {
    let playScene = this.scene.get(this.currentKey);
    playScene.destroy();
    playScene.restart();

    //this.scene.scene.start("LoseScene");
  }
}

const scenes = [
  TitleScene,
  PlayScene,
  LoseScene,
  WinScene,
  InstructionScene,
  GameLevelManager
];

const gameConfig = {
  type: Phaser.AUTO,
  parent: "game-container",
  pixelArt: true,
  zoom: 2,
  backgroundColor: "#000000",
  scene: scenes,
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 500 }
    }
  },
  scale: {
    parent: "game-container",
    mode: Phaser.Scale.FIT,
    width: 500 / 2,
    height: 300 / 2
  }
}; // You'll wanna use the css in the html file, we can use t

const game = new Phaser.Game(gameConfig);
