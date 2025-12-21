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

  for (const range of ranges) {
    log.info(`Processing range: ${range.start} - ${range.end}`);
    for (let i = range.start; i <= range.end; i++) {
      if (findInvalidId(i)) {
        log.info(`Found invalid ID: ${i}`);
        sum += i;
      }
    }
  }

  log.info(`Total sum of invalid IDs: ${sum}`);
  return sum;
}

export function findInvalidId(x: number): boolean {
  // split number into two halves, if uneven length, return false
  const str = x.toString();
  if (str.length % 2 !== 0) {
    return false;
  }

  const halfLength = str.length / 2;
  const firstHalf = str.slice(0, halfLength);
  const secondHalf = str.slice(halfLength);

  return firstHalf === secondHalf;
}

if (import.meta.main) {
  day2("./src/day2/input.txt");
}
