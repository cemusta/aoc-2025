import { expect } from "@std/expect";

import * as log from "@std/log";
import { day3, findMaximumJoltage } from "./day3.ts";

log.setup({
  loggers: {
    default: {
      level: undefined,
    },
  },
});

Deno.test("Day3 - part1 should find correct result from sample", () => {
  const result = day3("./src/day3/sample1.txt", 1);
  expect(result).toBe(357);
});

Deno.test("Day3 - part2 should find correct result from sample", () => {
  const result = day3("./src/day3/sample1.txt", 2);
  expect(result).toBe(3121910778619);
});

Deno.test("Day3 - findMaximumJoltage with 2 digits", async (t) => {
  const maximumJoltageTests = [
    { input: "987654321111111", expected: 98, description: "Sample bank 1" },
    { input: "811111111111119", expected: 89, description: "Sample bank 2" },
    { input: "234234234234278", expected: 78, description: "Sample bank 3" },
    { input: "818181911112111", expected: 92, description: "Sample bank 4" },
  ];

  for (const { input, expected, description } of maximumJoltageTests) {
    await t.step(description, () => {
      const result = findMaximumJoltage(input);
      expect(result).toEqual(expected);
    });
  }
});

Deno.test("Day3 - findMaximumJoltage with 12 digits", async (t) => {
  const maximumJoltageTests = [
    { input: "987654321111111", expected: 987654321111, description: "Sample bank 1" },
    { input: "811111111111119", expected: 811111111119, description: "Sample bank 2" },
    { input: "234234234234278", expected: 434234234278, description: "Sample bank 3" },
    { input: "818181911112111", expected: 888911112111, description: "Sample bank 4" },
  ];

  for (const { input, expected, description } of maximumJoltageTests) {
    await t.step(description, () => {
      const result = findMaximumJoltage(input, 12);
      expect(result).toEqual(expected);
    });
  }
});
