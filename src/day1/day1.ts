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

export function part1(input: string): number {
  const turns = parseInput(input);

  let x = 50;

  let skeps = 0;

  for (const turn of turns) {
    x += turn;
    x = (x + 100) % 100;
    if (x == 0) skeps += 1;
  }

  log.info(`steps: ${skeps}`);

  return skeps;
}

// export function part2(input: string): number {
//   return 0;
// }

if (import.meta.main) {
  part1("./src/day1/input.txt");
  // part2("./src/day1/input.txt");
}
