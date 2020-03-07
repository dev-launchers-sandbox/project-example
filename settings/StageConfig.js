import Phaser from "phaser";

const width = 250 / 2;
const height = 300 / 2;

export const STAGE_CONFIG = [
  {
    level: 1,
    levelName: "The Beginning",
    platforms: [
      {
        x: width,
        y: height,
        width: 500 / 2,
        height: 10 / 2
      }
    ],
    levelWidth: 500 / 2,
    levelHeight: 300 / 2
  },
  {
    level: 2,
    levelName: "Smash",
    levelWidth: 1000,
    levelHeight: 300,
    platforms: [
      {
        x: 50,
        y: 300,
        width: 100,
        height: 80
      },
      {
        x: 200,
        y: 300,
        width: 100,
        height: 80
      },
      {
        x: 350,
        y: 300,
        width: 100,
        height: 80
      },
      {
        x: 500,
        y: 300,
        width: 100,
        height: 80
      }
    ]
  },
  {
    level: 3,
    levelName: "Just Bouncin'",
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
    ],
    levelWidth: 1000,
    levelHeight: 300 / 2
  },
  {
    level: 4,
    levelName: "In A Pinch",
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
    ],
    levelWidth: 1000,
    levelHeight: 700
  }
];
