import { open } from "node:fs/promises";
import path from "node:path";

const STARTING_POSITION = 50;
const TOTAL_NUMBERS_COUNT = 100;

const file = await open(path.resolve(import.meta.dirname, "example"));

let position = STARTING_POSITION;
let solution = 0;

for await (const line of file.readLines()) {
  const direction = line.startsWith("L") ? -1 : 1;
  const num = Number(line.slice(1));

  position =
    (position + num * direction + TOTAL_NUMBERS_COUNT) % TOTAL_NUMBERS_COUNT;

  const circles = Math.floor(num / TOTAL_NUMBERS_COUNT);

  solution += circles;
  if (circles === 0 && position === 0) solution++;
}

console.log("Solution is:", solution);
