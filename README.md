# Dr Strange [![npm version](https://badge.fury.io/js/dr-strange.svg)](https://badge.fury.io/js/dr-strange)

Dr Strange is a simple stopwatch utility package for measuring execution times of code snippets or functions in Node.js applications. It is designed for use during development to help you optimize and analyze the performance of your code.

## Installation

Install Dr Strange as a development dependency:

```sh
npm install --save-dev dr-strange
```

## Usage

```javascript
const Stopwatch = require("dr-strange");

const stopwatch = new Stopwatch();

stopwatch.start();

// Your code here...

stopwatch.stop();

// Get the duration as a Duration object
const duration = stopwatch.getDuration();
console.log(
  `Duration: ${duration.hours} h ${duration.minutes} min ${duration.seconds} s ${duration.milliseconds.toFixed(2)} ms`
);

// Print the formatted duration
stopwatch.printDuration();

// Reset the stopwatch
stopwatch.reset();
```

### Stopwatch methods

- start(): Starts the stopwatch.
- stop(): Stops the stopwatch.
- getDuration(): Returns a Duration object representing the elapsed time. The object contains the properties hours, minutes, seconds, and milliseconds.
- printDuration(): Prints the formatted duration string, adjusting the format based on the elapsed time.
- reset(): Resets the stopwatch, setting the start and end times to null.

## TypeScript Support

This package includes TypeScript definitions for use in TypeScript projects.

```typescript
import Stopwatch from "dr-strange";
import Duration from "dr-strange/duration";

const stopwatch: Stopwatch = new Stopwatch();

stopwatch.start();
stopwatch.stop();

const duration: Duration = stopwatch.getDuration();

console.log(
  `Duration: ${duration.hours}h ${duration.minutes}m ${duration.seconds}s ${duration.milliseconds}ms`
);
```

## Testing

The package includes a suite of tests using the Jest testing framework. To run the tests, execute the following command:

```sh
npm test
```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
