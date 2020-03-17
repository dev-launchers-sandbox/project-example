import Phaser from "phaser";
import TitleScene from "../scenes/TitleScene";
import PlayScene from "../scenes/PlayScene";
import LoseScene from "../scenes/LoseScene";
import WinScene from "../scenes/WinScene";
import InstructionScene from "../scenes/InstructionScene.js";
import UIScene from "../scenes/UIScene.js";
import { STAGE_CONFIG } from "../settings/StageConfig.js";
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
    this.currentLevel = 0;
    this.stageData = STAGE_CONFIG;
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
    console.log("current level: ", this.currentLevel);
    console.log("stage data length", this.stageData.length);
    this.game.events.emit("obstacleDestroy");
    this.level++;
    this.numOfObs++;
    this.currentLevel++;

    // Remove old scene with old identifier
    this.scene.remove(this.currentKey);

    // Create new identifiier for scene we're about to create
    this.currentKey = this.generateNewKey();

    // Create the scene
    let playScene = new PlayScene(
      this.currentKey,
      this.numOfObs,
      this.level,
      this.currentLevel
    );

    // Add the newly create scene to our scene list, and tie it to the identifier we just created (so we can destroy it later)
    this.scene.add(this.currentKey, playScene, true);

    // (This logic should be handling all of the win stuff!)
    // Much cleaner here
    // TODO: Change '3' to use stageData.length instead of hardcoding
    if (this.currentLevel === this.stageData.length) {
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
  GameLevelManager,
  UIScene
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
};

const game = new Phaser.Game(gameConfig);
