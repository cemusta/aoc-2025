import { expect } from "@std/expect";
import { applyTurn, day1 } from "./day1.ts";
import * as log from "@std/log";

log.setup({
  loggers: {
    default: {
      level: undefined,
    },
  },
});

Deno.test("Day1 - part1 should find correct result", () => {
  const result = day1("./src/day1/sample1.txt", 1);
  expect(result).toBe(3);
});

Deno.test("Day1 - part2 should find correct result", () => {
  const result = day1("./src/day1/sample1.txt", 2);
  expect(result).toBe(6);
});

// parameter 3 should throw error
Deno.test("Day1 - invalid part should throw error", () => {
  expect(() => {
    day1("./src/day1/sample1.txt", 3);
  }).toThrow("Invalid part");
});

Deno.test("Day1 - applyTurn", async (t) => {
  const testCases = [
    { name: "99 to 0", startPos: 99, turn: 1, expected: [0, 1] },
    { name: "0 to 99", startPos: 0, turn: -1, expected: [99, 0] },
    { name: "0 to 1", startPos: 0, turn: 1, expected: [1, 0] },
    { name: "1 to 0", startPos: 1, turn: -1, expected: [0, 1] },
    { name: "99 to 0, double turn", startPos: 99, turn: 101, expected: [0, 2] },
    { name: "99 to 0, 11 turns", startPos: 99, turn: 1001, expected: [0, 11] },
    { name: "1 to 0, double negative turn", startPos: 1, turn: -101, expected: [0, 2] },
    { name: "1 to 0, negative 11 turns", startPos: 1, turn: -1001, expected: [0, 11] },
    { name: "99 start, negative 101 step turn", startPos: 99, turn: -101, expected: [98, 1] },
    { name: "60 start, negative 150 step turn", startPos: 60, turn: -150, expected: [10, 1] },

    { name: "positive turn within bounds", startPos: 30, turn: 20, expected: [50, 0] },
    { name: "negative turn within bounds", startPos: 30, turn: -20, expected: [10, 0] },
    { name: "landing exactly on zero with negative turn", startPos: 50, turn: -50, expected: [0, 1] },
    { name: "landing exactly on zero with positive turn", startPos: 50, turn: +50, expected: [0, 1] },
    { name: "landing on zero with large neg turn", startPos: 50, turn: -250, expected: [0, 3] },
    { name: "landing on zero with large pos turn", startPos: 50, turn: +250, expected: [0, 3] },
    { name: "crossing zero from positive to negative", startPos: 30, turn: -80, expected: [50, 1] },
    { name: "turn positive beyond 100", startPos: 50, turn: 80, expected: [30, 1] },
    { name: "multiple turns positive", startPos: 50, turn: 350, expected: [0, 4] },
    { name: "start at 0, turn 100", startPos: 0, turn: 100, expected: [0, 1] },
    { name: "start at 0, turn -100", startPos: 0, turn: -100, expected: [0, 1] },
    { name: "small positive turn from zero", startPos: 0, turn: 25, expected: [25, 0] },
    { name: "small negative turn from zero", startPos: 0, turn: -25, expected: [75, 0] },
    { name: "starting at 99 and wrapping", startPos: 99, turn: 50, expected: [49, 1] },
    { name: "landing on exactly 200", startPos: 0, turn: 200, expected: [0, 2] },
    { name: "landing on exactly -200", startPos: 0, turn: -200, expected: [0, 2] },
    { name: "large crossing positive to negative", startPos: 10, turn: -300, expected: [10, 3] },
    { name: "from positive to exactly -100", startPos: 50, turn: -150, expected: [0, 2] },
    { name: "edge case at 1", startPos: 1, turn: -1, expected: [0, 1] },
    { name: "big turn case 1", startPos: 50, turn: 1000, expected: [50, 10] },
    { name: "big turn case 2", startPos: 50, turn: -1000, expected: [50, 10] },

    { name: "from 99 backward wrap", startPos: 99, turn: -50, expected: [49, 0] },
    { name: "from 1 to 0 positive", startPos: 1, turn: 99, expected: [0, 1] },
    { name: "barely not wrapping positive", startPos: 50, turn: 49, expected: [99, 0] },
    { name: "barely not wrapping negative", startPos: 50, turn: -50, expected: [0, 1] },
    { name: "from 0 to 99 via positive wrap", startPos: 0, turn: 99, expected: [99, 0] },
    { name: "from 99 to 98", startPos: 99, turn: -1, expected: [98, 0] },
    { name: "exact 300 from middle", startPos: 50, turn: 300, expected: [50, 3] },
    { name: "exact -300 from middle", startPos: 50, turn: -300, expected: [50, 3] },
    { name: "99 plus 101", startPos: 99, turn: 101, expected: [0, 2] },
    { name: "0 minus 101", startPos: 0, turn: -101, expected: [99, 1] },
    { name: "mid position exact double wrap", startPos: 25, turn: 200, expected: [25, 2] },
    { name: "mid position exact double wrap neg", startPos: 25, turn: -200, expected: [25, 2] },
  ];

  for (const { name, startPos, turn, expected } of testCases) {
    await t.step(name, () => {
      const result = applyTurn(startPos, turn);
      expect(result).toEqual(expected);
    });
  }
});
