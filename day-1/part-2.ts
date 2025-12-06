import { open } from "node:fs/promises";
import path from "node:path";

const STARTING_POSITION = 50;
const DIAL_SIZE = 100;

const file = await open(path.resolve(import.meta.dirname, "input"));

let previousPosition: number;
let currentPosition = STARTING_POSITION;
let password = 0;

for await (const line of file.readLines()) {
  const direction = line.startsWith("L") ? -1 : 1;
  const rotation = Number(line.slice(1));

  const remainder = rotation % DIAL_SIZE;
  const rawNextPosition = currentPosition + remainder * direction;
  const isOverflow =
    (currentPosition !== 0 && rawNextPosition < 0) ||
    rawNextPosition >= DIAL_SIZE;

  previousPosition = currentPosition;
  currentPosition = (rawNextPosition + DIAL_SIZE) % DIAL_SIZE;

  password += Math.floor(rotation / DIAL_SIZE);

  if (currentPosition === 0 || isOverflow) password++;
}

console.log("Password is:", password);
console.assert(password === 6616);
