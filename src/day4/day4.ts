import * as log from "@std/log";
import { Grid } from "../helpers/grid.ts";

export function day4(input: string, part = 1): number {
  log.info(`Starting Day 4, part ${part}`);

  const data = Deno.readTextFileSync(input);
  const grid: Grid = new Grid(data);

  let result = 0;

  if (part === 1) {
    grid.forEach((cell, row, col) => {
      if (cell !== "@") return;
      const neighbors = grid.getNeighbors(row, col);
      if (neighbors.filter((n) => n === "@").length < 4) result++;
    });
  } else {
    while (true) {
      let removed = 0;

      grid.forEach((cell, row, col) => {
        if (cell !== "@") return;
        const neighbors = grid.getNeighbors(row, col);
        if (neighbors.filter((n) => n === "@").length < 4) {
          removed++;
          grid.update(row, col, ".");
        }
      });

      result += removed;
      log.info(`Removed ${removed} seats this round, total ${result}`);

      if (removed === 0) break;
    }
  }

  log.info(`Day 4, part ${part} result: ${result}`);

  return result;
}

if (import.meta.main) {
  day4("./src/day4/input.txt", 1);
  day4("./src/day4/input.txt", 2);
}
