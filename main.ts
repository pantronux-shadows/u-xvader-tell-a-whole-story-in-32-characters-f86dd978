// makefun program/v1 entry: "Tell a Whole Story in 32 Characters"
// Writes one Wi-Fi network name (<= 32 chars) to the grader's output dir.
import { writeFileSync, mkdirSync } from "node:fs";
import { join } from "node:path";

const outDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
const entry = "WhoseChromecastIsInTheBushes";

// Mirror the sealed gate: UTF-8 text of 1 to 32 characters, not only white space.
const chars = [...entry]; // code points, so an astral char counts as 1 character
const bytes = Buffer.byteLength(entry, "utf8");
if (chars.length < 1 || chars.length > 32) {
  throw new Error(`entry must be 1..32 characters, got ${chars.length}`);
}
if (bytes < 1 || bytes > 32) {
  throw new Error(`entry must be 1..32 bytes, got ${bytes}`);
}
if (entry.trim().length < 1) {
  throw new Error("entry must not be only white space");
}
if (chars.some((c) => {
  const cp = c.codePointAt(0)!;
  return cp === 0xfeff || (cp >= 0x200b && cp <= 0x200f) || (cp >= 0 && cp < 0x20 && cp !== 0x09);
})) {
  throw new Error("entry must not contain zero-width, control or BOM characters");
}

mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), entry);
