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
    ],
    finishLine: {
      x: 50,
      y: 5
    },
    obstacles: [
      {
        x: 175,
        y: 75
      }
    ],
    teleporters: [],

    cake: {
      x: 45,
      y: 125
    },

    levelWidth: 500 / 2,
    levelHeight: 300 / 2
  },
  {
    level: 2,
    levelName: "Smash",
    levelWidth: 550,
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
    ],
    finishLine: {
      x: 80,
      y: 10
    },
    obstacles: [
      /*  
     {
        x: 70,
        y: 10
      },
      */
      {
        x: 200,
        y: 10
      },
      {
        x: 350,
        y: 10
      }
      /*
      {
        x: 285,
        y: 10
      },
      {
        x: 415,
        y: 10
      },
      {
        x: 435,
        y: 10
      }
      */
    ],
    teleporters: [
      {
        x: width,
        y: 300,
        width: 1550,
        height: 10 / 2,
        destinationX: 50,
        destinationY: 200
      }
    ],
    cake: {
      x: 45,
      y: 250
    }
  },
  {
    level: 3,
    levelWidth: 800,
    levelHeight: 500,
    platforms: [
      {
        x: 0,
        y: 500,
        width: 100,
        height: 50
      },
      {
        x: 100,
        y: 460,
        width: 50,
        height: 5
      }
    ],
    obstacles: [
      {
        x: 10,
        y: 490
      }
    ],

    teleporters: [
      {
        x: width,
        y: 500,
        width: 1550,
        height: 10 / 2,
        destinationX: 35,
        destinationY: 450
      }
    ],
    cake: {
      x: 35,
      y: 450
    }
  },

  {
    level: 4,
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
    finishLine: {
      x: 999,
      y: 5
    },
    obstacles: [
      {
        x: 50,
        y: 5
      },
      {
        x: 100,
        y: 10
      }
    ],

    teleporters: [],
    levelWidth: 1000,
    levelHeight: 300 / 2
  },
  {
    level: 5,
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
    finishLine: {
      x: 999,
      y: 650
    },
    obstacles: [
      {
        x: 250,
        y: 10
      },
      {
        x: 400,
        y: 700
      }
    ],
    levelWidth: 1000,
    levelHeight: 700
  }
];
