import { expect } from "@std/expect";

import * as log from "@std/log";
import { day4 } from "./day4.ts";

log.setup({
  loggers: {
    default: {
      level: "ERROR",
    },
  },
});

Deno.test("Day4 - part1 should find correct result from sample", () => {
  const result = day4("./src/day4/sample1.txt", 1);
  expect(result).toBe(13);
});

Deno.test("Day4 - part2 should find correct result from sample", () => {
  const result = day4("./src/day4/sample1.txt", 2);
  expect(result).toBe(43);
});
