import Duration from "./duration";

declare class Stopwatch {
  private startTime: [number, number] | null;
  private endTime: [number, number] | null;
  private pausedDuration: number;
  private pauseStartTime: [number, number] | null;

  constructor();

  start(): void;

  stop(): void;

  pause(): void;

  resume(): void;

  reset(): void;

  getDuration(): Duration;

  printDuration(): void;
}

export default Stopwatch;
