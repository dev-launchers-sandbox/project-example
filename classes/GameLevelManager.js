import Phaser from "phaser";
import TitleScene from "../scenes/TitleScene";
import PlayScene from "../scenes/PlayScene";
import LoseScene from "../scenes/LoseScene";
import WinScene from "../scenes/WinScene";

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
    this.level = 1;
    this.generateNum = 1;
    this.currentKey = sceneBaseName;
    this.gameLives = 3;
    this.numOfObs = 0;
  }
  create() {
    this.game.events.on("changeLevel", this.switchLevel, this);
    //this.game.events.on("goToWinScene", this.goToWinScene, this);
  }

  update() {}

  destroy() {}

  switchLevel() {
    this.level++;
    this.numOfObs++;

    this.scene.remove(this.currentKey);
    //this.scene.start("PlayScene");
    let playScene = new PlayScene(this.generateNewKey(), this.numOfObs);
    this.scene.add("PlayScene", playScene, true);
    //this.scene.start("PlayScene");
    console.log("current level: ", this.level);
    //console.log(changeLevelEvent);
    if (this.level === 6) {
      console.log("yo this actually worked");
      this.scene.start("WinScene");
    }
  }

  generateNewKey() {
    this.generateNum++;
    const keyString = this.generateNum.toString();

    console.log(keyString);
    return sceneBaseName + keyString;
  }
}

const scenes = [TitleScene, PlayScene, LoseScene, WinScene, GameLevelManager];

const gameConfig = {
  type: Phaser.AUTO,
  width: 500 / 2,
  height: 300 / 2,
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
  }
};

const game = new Phaser.Game(gameConfig);
