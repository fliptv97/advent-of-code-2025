import { readFile } from "node:fs/promises";

const filePath = new URL("./input.txt", import.meta.url);
const contents = await readFile(filePath, { encoding: "utf8" });

const answer = contents
  .trim()
  .split(",")
  .flatMap((range) => {
    let [firstId, lastId] = range.split("-").map(Number);

    if (!firstId || !lastId) throw new Error("Invalid input data");

    return Array.from({ length: lastId - firstId + 1 }, (_, i) =>
      String(firstId + i),
    ).filter(
      (id) =>
        id.length % 2 === 0 &&
        id.slice(0, id.length / 2) === id.slice(id.length / 2),
    );
  })
  .reduce((acc, curr) => acc + Number(curr), 0);

console.log(answer);
