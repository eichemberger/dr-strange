const Stopwatch = require("../index");
const Duration = require("../duration");

describe("Stopwatch", () => {
  let stopwatch;

  beforeEach(() => {
    stopwatch = new Stopwatch();
  });

  afterEach(() => {
    stopwatch.reset();
  });

  test("getDuration throws an error if the stopwatch has not stopped", () => {
    stopwatch.start();
    expect(() => stopwatch.getDuration()).toThrow(
      "stopwatch hasn't stopped yet."
    );
  });

  test("getDuration returns a Duration object with hours, minutes, seconds, and milliseconds", (done) => {
    stopwatch.start();

    setTimeout(() => {
      stopwatch.stop();
      const duration = stopwatch.getDuration();

      expect(duration).toBeInstanceOf(Duration);
      expect(duration.hours).toBeDefined();
      expect(duration.minutes).toBeDefined();
      expect(duration.seconds).toBeDefined();
      expect(duration.milliseconds).toBeDefined();

      done();
    }, 500);
  });

  test("printDuration prints a formatted duration string", (done) => {
    console.log = jest.fn();

    stopwatch.start();

    setTimeout(() => {
      stopwatch.stop();
      stopwatch.printDuration();

      expect(console.log).toHaveBeenCalled();
      done();
    }, 500);
  });

  test("stop throws an error if the stopwatch has not started", () => {
    expect(() => stopwatch.stop()).toThrow("stopwatch hasn't started yet.");
  });

  test("reset sets startTime and endTime to null", () => {
    stopwatch.start();
    stopwatch.stop();
    stopwatch.reset();

    expect(stopwatch.startTime).toBeNull();
    expect(stopwatch.endTime).toBeNull();
  });

  test("stopwatch measures elapsed time correctly", (done) => {
    const testDuration = 500; // 500ms
    const tolerance = 20; // 20ms

    stopwatch.start();

    setTimeout(() => {
      stopwatch.stop();
      const duration = stopwatch.getDuration();

      expect(duration.milliseconds).toBeGreaterThanOrEqual(
        testDuration - tolerance
      );
      expect(duration.milliseconds).toBeLessThanOrEqual(
        testDuration + tolerance
      );

      done();
    }, testDuration);
  });

  test("printDuration correctly handles various time ranges", (done) => {
    console.log = jest.fn();

    const simulatedDurations = [
      { hours: 0, minutes: 0, seconds: 0, milliseconds: 123 },
      { hours: 0, minutes: 0, seconds: 5, milliseconds: 678 },
      { hours: 0, minutes: 3, seconds: 25, milliseconds: 901 },
      { hours: 1, minutes: 45, seconds: 30, milliseconds: 456 },
    ];

    simulatedDurations.forEach((simulatedDuration, index) => {
      stopwatch.getDuration = jest
        .fn()
        .mockReturnValue(
          new Duration(
            simulatedDuration.hours,
            simulatedDuration.minutes,
            simulatedDuration.seconds,
            simulatedDuration.milliseconds
          )
        );

      stopwatch.printDuration();

      let expectedDuration = "";

      if (simulatedDuration.hours > 0) {
        expectedDuration += `${simulatedDuration.hours} h ${
          simulatedDuration.minutes
        } min ${
          simulatedDuration.seconds
        } s ${simulatedDuration.milliseconds.toFixed(2)} ms`;
      } else if (simulatedDuration.minutes > 0) {
        expectedDuration += `${simulatedDuration.minutes} min ${
          simulatedDuration.seconds
        } s ${simulatedDuration.milliseconds.toFixed(2)} ms`;
      } else if (simulatedDuration.seconds > 0) {
        expectedDuration += `${
          simulatedDuration.seconds
        } s ${simulatedDuration.milliseconds.toFixed(2)} ms`;
      } else {
        expectedDuration += `${simulatedDuration.milliseconds.toFixed(2)} ms`;
      }

      expect(console.log).toHaveBeenNthCalledWith(index + 1, expectedDuration);
    });

    done();
  });
});
