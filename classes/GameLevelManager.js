import Phaser from "phaser";
import TitleScene from "../scenes/TitleScene";
import PlayScene from "../scenes/PlayScene";
import LoseScene from "../scenes/LoseScene";
import WinScene from "../scenes/WinScene";

export default class GameLevelManager extends Phaser.Scenes.SceneManager {
  constructor() {
    super(game, scenes);
  }

  update() {}

  destroy() {}
}

const scenes = [TitleScene, PlayScene, LoseScene, WinScene];

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
