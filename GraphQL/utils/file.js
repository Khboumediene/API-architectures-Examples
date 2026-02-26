import { readFile, writeFile } from "node:fs/promises";

export async function readJsonFile(path) {
  try {
    const data = await readFile(path, "utf8");
    return JSON.parse(data);
  } catch (error) {
    if (error.code === "ENOENT") {
      return [];
    }
    throw error;
  }
}

export async function writeJsonFile(path, data) {
  await writeFile(path, JSON.stringify(data, null, 2), "utf8");
}
