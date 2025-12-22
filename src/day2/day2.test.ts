import { expect } from "@std/expect";

import * as log from "@std/log";
import { day2, isInvalidPart1, isInvalidPart2 } from "./day2.ts";

log.setup({
  loggers: {
    default: {
      level: "ERROR",
    },
  },
});

Deno.test("Day2 - part1 should find correct result from sample", () => {
  const result = day2("./src/day2/sample1.txt", 1);
  expect(result).toBe(1227775554);
});

Deno.test("Day2 - part2 should find correct result from sample", () => {
  const result = day2("./src/day2/sample1.txt", 2);
  expect(result).toBe(4174379265);
});

Deno.test("Day2 - isInvalidPart1", async (t) => {
  const isInvalidPart1Tests = [
    { input: 11, expected: true, description: "11 is invalid, 1 repeating when divided to half" },
    { input: 12, expected: false, description: "12 is valid" },
    { input: 22, expected: true, description: "22 is invalid, 1 repeating when divided to half" },
    { input: 1234, expected: false, description: "1234 is valid" },
    { input: 1212, expected: true, description: "1212 is invalid, 12 repeating when divided to half" },
    // more test cases
    { input: 123123, expected: true, description: "123123 is invalid, 123 repeating when divided to half" },
    { input: 123456, expected: false, description: "123456 is valid" },
    { input: 1111, expected: true, description: "1111 is invalid, 11 repeating when divided to half" },
    { input: 1122, expected: false, description: "1122 is valid" },
    { input: 9999, expected: true, description: "9999 is invalid, 99 repeating when divided to half" },
  ];

  for (const { input, expected, description } of isInvalidPart1Tests) {
    await t.step(description, () => {
      const result = isInvalidPart1(input);
      expect(result).toEqual(expected);
    });
  }
});

Deno.test("Day2 - isInvalidPart2", async (t) => {
  const isInvalidPart2Tests = [
    { input: 11, expected: true, description: "11 is invalid, repeated twice" },
    { input: 12, expected: false, description: "12 is valid" },
    { input: 22, expected: true, description: "22 is invalid, repeated twice" },
    { input: 111, expected: true, description: "111 is invalid, repeated thrice" },
    { input: 1212, expected: true, description: "1212 is invalid, repeated twice" },
    { input: 121212, expected: true, description: "121212 is invalid, repeated thrice" },
    { input: 1698528, expected: false, description: "1698528 is valid" },
    { input: 824824824, expected: true, description: "824824824 is invalid, repeated thrice" },
    { input: 2121212121, expected: true, description: "2121212121 is invalid, repeated four times" },
  ];

  for (const { input, expected, description } of isInvalidPart2Tests) {
    await t.step(description, () => {
      const result = isInvalidPart2(input);
      expect(result).toEqual(expected);
    });
  }
});
