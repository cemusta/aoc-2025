import * as log from "@std/log";

function parseInput(input: string): { start: number; end: number }[] {
  const data = Deno.readTextFileSync(input);

  const ranges: { start: number; end: number }[] = [];

  data.split(",").map((part) => {
    const [start, end] = part.split("-").map(Number);
    ranges.push({ start, end });
  });

  return ranges;
}

export function day2(input: string, part = 1): number {
  log.info(`Starting Day 2, part ${part}`);
  const ranges = parseInput(input);

  let sum = 0;

  const invalidFunction = part === 1 ? isInvalidPart1 : isInvalidPart2;

  for (const range of ranges) {
    log.debug(`Processing range: ${range.start} - ${range.end}`);
    for (let i = range.start; i <= range.end; i++) {
      if (invalidFunction(i)) {
        log.debug(`Found invalid ID: ${i}`);
        sum += i;
      }
    }
  }

  log.info(`Total sum of invalid IDs: ${sum}`);
  return sum;
}

export function isInvalidPart1(id: number): boolean {
  // split number into two halves, if uneven length, return false
  const str = id.toString();
  if (str.length % 2 !== 0) {
    return false;
  }

  const halfLength = str.length / 2;
  const firstHalf = str.slice(0, halfLength);
  const secondHalf = str.slice(halfLength);

  return firstHalf === secondHalf;
}

export function isInvalidPart2(id: number): boolean {
  const str = id.toString();
  const len = str.length;

  // Try different pattern lengths from 1 to half the string length
  for (let patternLength = 1; patternLength <= len / 2; patternLength++) {
    // Only check if the pattern divides evenly into the string
    if (len % patternLength === 0) {
      const pattern = str.slice(0, patternLength);
      const repetitions = len / patternLength;

      // Check if repeating the pattern creates the original string
      // and it repeats at least twice
      if (repetitions >= 2 && pattern.repeat(repetitions) === str) {
        return true;
      }
    }
  }

  return false;
}

if (import.meta.main) {
  day2("./src/day2/input.txt", 1);
  day2("./src/day2/input.txt", 2);
}
