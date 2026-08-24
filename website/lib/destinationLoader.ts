import fs from "fs";
import path from "path";

import { Destination } from "@/types/destination";

const DATA_FOLDER = path.join(
  process.cwd(),
  "data",
  "zimbabwe"
);

export function getDestination(
  filename: string
): Destination {
  const filePath = path.join(
    DATA_FOLDER,
    `${filename}.json`
  );

  const json = fs.readFileSync(filePath, "utf8");

  return JSON.parse(json);
}

export function getAllDestinations(): Destination[] {
  const files = fs
    .readdirSync(DATA_FOLDER)
    .filter((file) => file.endsWith(".json"));

  return files.map((file) => {
    const json = fs.readFileSync(
      path.join(DATA_FOLDER, file),
      "utf8"
    );

    return JSON.parse(json);
  });
}