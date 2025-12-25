export class Grid {
  private grid: string[][];
  readonly rows: number;
  readonly cols: number;

  constructor(input: string) {
    this.grid = input.split("\n").map((line) => line.split(""));
    this.rows = this.grid.length;
    this.cols = this.grid[0]?.length ?? 0;
  }

  get(row: number, col: number): string | undefined {
    if (row < 0 || row >= this.rows || col < 0 || col >= this.cols) {
      return undefined;
    }
    return this.grid[row][col];
  }

  update(row: number, col: number, value: string): boolean {
    this.grid[row][col] = value;
    return true;
  }

  getNeighbors(row: number, col: number): string[] {
    const directions = [
      [-1, -1],
      [-1, 0],
      [-1, 1],
      [0, -1],
      [0, 1],
      [1, -1],
      [1, 0],
      [1, 1],
    ];

    const neighbors: string[] = [];

    for (const [dr, dc] of directions) {
      const cell = this.get(row + dr, col + dc);
      if (cell !== undefined) {
        neighbors.push(cell);
      }
    }

    return neighbors;
  }

  forEach(callback: (cell: string, row: number, col: number) => void): void {
    for (let row = 0; row < this.rows; row++) {
      for (let col = 0; col < this.cols; col++) {
        callback(this.grid[row][col], row, col);
      }
    }
  }
}
