import { expect } from "@std/expect";
import { Grid } from "./grid.ts";

Deno.test("Grid - constructor should parse input correctly", () => {
  const input = "abc\ndef\nghi";
  const grid = new Grid(input);

  expect(grid.rows).toBe(3);
  expect(grid.cols).toBe(3);
  expect(grid.get(0, 0)).toBe("a");
  expect(grid.get(2, 2)).toBe("i");
});

Deno.test("Grid - constructor should handle empty input", () => {
  const input = "";
  const grid = new Grid(input);

  expect(grid.rows).toBe(1);
  expect(grid.cols).toBe(0);
});

Deno.test("Grid - get should return correct value for valid coordinates", () => {
  const input = "123\n456\n789";
  const grid = new Grid(input);

  expect(grid.get(0, 0)).toBe("1");
  expect(grid.get(1, 1)).toBe("5");
  expect(grid.get(2, 2)).toBe("9");
});

Deno.test("Grid - get should return undefined for out of bounds coordinates", () => {
  const input = "abc\ndef";
  const grid = new Grid(input);

  expect(grid.get(-1, 0)).toBeUndefined();
  expect(grid.get(0, -1)).toBeUndefined();
  expect(grid.get(2, 0)).toBeUndefined();
  expect(grid.get(0, 3)).toBeUndefined();
});

Deno.test("Grid - update should modify cell value", () => {
  const input = "abc\ndef";
  const grid = new Grid(input);

  expect(grid.update(0, 0, "X")).toBe(true);
  expect(grid.get(0, 0)).toBe("X");

  expect(grid.update(1, 2, "Y")).toBe(true);
  expect(grid.get(1, 2)).toBe("Y");
});

Deno.test("Grid - getNeighbors should return 8 neighbors for center cell", () => {
  const input = "123\n456\n789";
  const grid = new Grid(input);

  const neighbors = grid.getNeighbors(1, 1);
  expect(neighbors.length).toBe(8);
  expect(neighbors).toEqual(["1", "2", "3", "4", "6", "7", "8", "9"]);
});

Deno.test("Grid - getNeighbors should return 3 neighbors for top-left corner", () => {
  const input = "123\n456\n789";
  const grid = new Grid(input);

  const neighbors = grid.getNeighbors(0, 0);
  expect(neighbors.length).toBe(3);
  expect(neighbors).toEqual(["2", "4", "5"]);
});

Deno.test("Grid - getNeighbors should return 3 neighbors for bottom-right corner", () => {
  const input = "123\n456\n789";
  const grid = new Grid(input);

  const neighbors = grid.getNeighbors(2, 2);
  expect(neighbors.length).toBe(3);
  expect(neighbors).toEqual(["5", "6", "8"]);
});

Deno.test("Grid - getNeighbors should return 5 neighbors for top edge cell", () => {
  const input = "123\n456\n789";
  const grid = new Grid(input);

  const neighbors = grid.getNeighbors(0, 1);
  expect(neighbors.length).toBe(5);
  expect(neighbors).toEqual(["1", "3", "4", "5", "6"]);
});

Deno.test("Grid - forEach should iterate over all cells", () => {
  const input = "ab\ncd";
  const grid = new Grid(input);

  const cells: string[] = [];
  const positions: [number, number][] = [];

  grid.forEach((cell, row, col) => {
    cells.push(cell);
    positions.push([row, col]);
  });

  expect(cells).toEqual(["a", "b", "c", "d"]);
  expect(positions).toEqual([
    [0, 0],
    [0, 1],
    [1, 0],
    [1, 1],
  ]);
});

Deno.test("Grid - forEach should handle single row", () => {
  const input = "abc";
  const grid = new Grid(input);

  let count = 0;
  grid.forEach(() => count++);

  expect(count).toBe(3);
});
