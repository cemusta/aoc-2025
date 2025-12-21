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
  let newPosition = startPos + turn;
  let passes = 0;

  // Calculate how many times we pass through 0
  if (startPos === 0 && turn !== 0) {
    // Starting at 0, count passes every 100 units
    passes = Math.floor(Math.abs(turn) / 100);
  } else if (newPosition === 0) {
    // Ending at 0, count based on journey
    passes = Math.ceil(Math.abs(turn) / 100);
  } else if (newPosition < 0) {
    // Crossing zero - count how many times based on total distance
    passes = Math.ceil(Math.abs(turn) / 100);
  } else if (Math.abs(newPosition) >= 100) {
    // Wrapping around without crossing zero
    passes = Math.floor(Math.abs(newPosition) / 100);
  }

  // Handle negative modulo properly
  newPosition = ((newPosition % 100) + 100) % 100;
  if (newPosition === 0 && startPos !== 0) newPosition = startPos > 0 ? 0 : 0;

  return [newPosition, Math.abs(passes)];
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
