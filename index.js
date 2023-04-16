const Duration = require("./duration");

class Stopwatch {
  constructor() {
    this.startTime = null;
    this.endTime = null;
  }

  start() {
    this.startTime = process.hrtime();
  }

  stop() {
    if (!this.startTime) {
      throw new Error("stopwatch hasn't started yet.");
    }
    this.endTime = process.hrtime(this.startTime);
  }

  getDuration() {
    if (!this.endTime) {
      throw new Error("stopwatch hasn't stopped yet.");
    }

    const durationInMilliseconds =
      this.endTime[0] * 1e3 + this.endTime[1] / 1e6;

    const ms = durationInMilliseconds % 1000;
    const seconds = Math.floor(durationInMilliseconds / 1000) % 60;
    const minutes = Math.floor(durationInMilliseconds / (1000 * 60)) % 60;
    const hours = Math.floor(durationInMilliseconds / (1000 * 60 * 60));

    return new Duration(hours, minutes, seconds, ms);
  }

  printDuration() {
    const duration = this.getDuration();

    let formattedDuration = "";

    if (duration.hours > 0) {
      formattedDuration += `${duration.hours} h ${duration.minutes} min ${
        duration.seconds
      } s ${duration.milliseconds.toFixed(2)} ms`;
    } else if (duration.minutes > 0) {
      formattedDuration += `${duration.minutes} min ${
        duration.seconds
      } s ${duration.milliseconds.toFixed(2)} ms`;
    } else if (duration.seconds > 0) {
      formattedDuration += `${
        duration.seconds
      } s ${duration.milliseconds.toFixed(2)} ms`;
    } else {
      formattedDuration += `${duration.milliseconds.toFixed(2)} ms`;
    }

    console.log(formattedDuration);
  }

  reset() {
    this.startTime = null;
    this.endTime = null;
  }
}

module.exports = Stopwatch;
