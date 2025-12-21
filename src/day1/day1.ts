import * as log from "@std/log";

function parseInput(input: string): number[] {
  const data = Deno.readTextFileSync(input);

  const turns: number[] = [];

  data.split("\n").map((line) => {
    const firstChar = line.charAt(0);
    if (firstChar === "L") {
      turns.push(-parseInt(line.slice(1), 10));
    } else if (firstChar === "R") {
      turns.push(parseInt(line.slice(1), 10));
    }
  });

  return turns;
}

export function applyTurn(startPos: number, turn: number): [number, number] {
  const rawNewPosition = startPos + turn;
  let passes = 0;

  if (turn > 0) {
    // Count how many times we pass through position 0
    passes = Math.floor(rawNewPosition / 100);
  } else if (turn < 0) {
    // Moving left (negative direction)
    if (startPos === 0) {
      // Starting at 0, count complete laps backward
      passes = Math.floor(Math.abs(turn) / 100);
    } else if (rawNewPosition < 0) {
      // We've crossed 0 going backwards
      const distancePastZero = Math.abs(rawNewPosition);
      passes = 1 + Math.floor(distancePastZero / 100);
    } else if (rawNewPosition === 0) {
      // Landing exactly on 0 from a positive position counts as 1 pass
      passes = 1;
    }
  }

  // Wrap position to 0-99 range
  const newPosition = ((rawNewPosition % 100) + 100) % 100;

  return [newPosition, passes];
}

export function day1(input: string, part = 1): number {
  const turns = parseInput(input);

  let currentPos = 50;

  let stops = 0;
  let passes = 0;

  for (const turn of turns) {
    const [newPosition, turnPasses] = applyTurn(currentPos, turn);

    log.info(
      `Current: ${currentPos.toString().padStart(2, " ")}, turn:${turn
        .toString()
        .padStart(5, " ")} > New: ${newPosition
        .toString()
        .padStart(2, " ")}, passes: ${turnPasses}`
    );

    currentPos = newPosition;

    // part 2 counter
    passes += turnPasses;

    // part 1 counter
    if (currentPos == 0) stops += 1;
  }

  log.info(`steps: ${stops}, passes: ${passes}`);

  if (part === 1) return stops;
  if (part === 2) return passes;

  throw new Error("Invalid part");
}

if (import.meta.main) {
  day1("./src/day1/input.txt");
}
