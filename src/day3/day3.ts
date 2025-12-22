import * as log from "@std/log";

function parseInput(input: string): string[] {
  const data = Deno.readTextFileSync(input);
  return data.split("\n");
}

export function day3(input: string, part = 1): number {
  log.info(`Starting Day 3, part ${part}`);
  const batteryBanks = parseInput(input);

  let sum = 0;

  for (const bank of batteryBanks) {
    // Process each bank
    sum += part === 1 ? findMaximumJoltage(bank) : findMaximumJoltage(bank, 12);
  }

  log.info(`Total sum of battery jolts: ${sum}`);
  return sum;
}

export function findMaximumJoltage(batteryBank: string, digits = 2): number {
  let result = "";
  let startPos = 0;

  for (let i = 0; i < digits; i++) {
    const remainingNeeded = digits - i - 1;
    const searchEnd = batteryBank.length - remainingNeeded;

    let maxDigit = "0";
    let maxPos = startPos;

    for (let j = startPos; j < searchEnd; j++) {
      if (batteryBank[j] > maxDigit) {
        maxDigit = batteryBank[j];
        maxPos = j;
      }
    }

    result += maxDigit;
    startPos = maxPos + 1;
  }

  return parseInt(result);
}

if (import.meta.main) {
  day3("./src/day3/input.txt", 1);
  day3("./src/day3/input.txt", 2);
}
