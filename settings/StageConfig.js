import Phaser from "phaser";

const width = 250 / 2;
const height = 300 / 2;

export const STAGE_CONFIG = [
  {
    level: 1,
    platforms: [
      {
        x: width,
        y: height,
        width: 500 / 2,
        height: 10 / 2
      }
    ]
  },
  {
    level: 2,
    platforms: [
      {
        x: width,
        y: height,
        width: 500 / 2,
        height: 10 / 2
      },
      {
        x: 10 / 2,
        y: 100 / 2,
        width: 550 / 2,
        height: 10 / 2
      },
      {
        x: 390 / 2,
        y: 200 / 2,
        width: 450 / 2,
        height: 10 / 2
      }
    ]
  },
  {
    level: 3,
    platforms: [
      {
        x: width,
        y: height,
        width: 500 / 2,
        height: 10 / 2
      },
      {
        x: 250 / 2,
        y: 150 / 2,
        width: 300 / 2,
        height: 10 / 2
      },
      {
        x: 10 / 2,
        y: 75 / 2,
        width: 300 / 2,
        height: 10 / 2
      },
      {
        x: 0 / 2,
        y: 225 / 2,
        width: 350 / 2,
        height: 10 / 2
      },
      {
        x: 500 / 2,
        y: 225 / 2,
        width: 500 / 2,
        height: 10 / 2
      }
    ]
  }
];
