import Phaser from "phaser";

export default class RandomDataPoints {
  constructor() {
    this.rnd = new Phaser.Math.RandomDataGenerator([Date.now().toString()]);
  }
  /*
   * constraint: {xmin, xmax, y}
   * constraints is an array of constraints
   */
  datapoints(numPoints, borderNumX, borderNumY, constraints) {
    var points = [];
    for (var i = 0; i < numPoints; i++) {
      //var constraint = this.rnd.pick();
      const x = this.rnd.between(60, borderNumX);
      const y = this.rnd.between(0, borderNumY);
      points.push({
        x: x,
        y: y
      });
    }
    return points;
  }
  update() {}

  destroy() {}
}
