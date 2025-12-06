import { readFile } from "node:fs/promises";

const filePath = new URL("./input.txt", import.meta.url);
const contents = await readFile(filePath, { encoding: "utf8" });

const ranges = contents.trim().split(",");
const rangesTuple = ranges.map(
  (range) => range.split("-").map(Number) as [number, number],
);
const invalidIds = rangesTuple.flatMap(([firstId, lastId]) => {
  const ids = Array.from({ length: lastId - firstId + 1 }, (_, i) =>
    String(firstId + i),
  );

  return ids.filter((id) => (id + id).slice(1, -1).includes(id));
});
const invalidIdsSum = invalidIds.reduce((acc, curr) => acc + Number(curr), 0);

console.log("Answer is:", invalidIdsSum);
