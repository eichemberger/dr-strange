declare class Duration {
  readonly hours: number;
  readonly minutes: number;
  readonly seconds: number;
  readonly milliseconds: number;

  constructor(
    hours?: number,
    minutes?: number,
    seconds?: number,
    milliseconds?: number
  );
}

export = Duration;
