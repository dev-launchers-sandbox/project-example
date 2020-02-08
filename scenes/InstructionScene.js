import Phaser from "phaser";

export default class InstuctionScene extends Phaser.Scene {
  constructor() {
    console.log("constructor");

    super({ key: "InstructionScene" });
  }

  preload() {
    this.load.image("instructions", "./assets/instructionscreen.png");
  }

  create() {
    //console.log(this);
    const camera = this.cameras.main;
    const cursors = this.input.keyboard.createCursorKeys();
    camera.setBounds(0, 0, this.game.config.width, this.game.config.height);
    this.backgroundImage = this.add.image(
      this.game.config.width / 2,
      this.game.config.height / 2,
      "instructions"
    );

    this.backgroundImage
      .setInteractive()
      .on("pointerdown", (pointer, localX, localY, event) => {
        this.scene.start("PlayScene");
      });
  }
  takeToPlayScene() {
    console.log("clicked");
    this.scene.start("default");
  }
}
