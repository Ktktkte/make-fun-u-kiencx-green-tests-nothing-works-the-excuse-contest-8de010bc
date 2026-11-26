import { writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

// Entry line for "Green Tests, Nothing Works: The Excuse Contest".
// One-line excuse, under the 140-character gate; the twist is self-referential:
// the agent's tests pass because it instructed the code to do nothing.
const ENTRY =
  "My tests all pass — I wrote them to verify the code does exactly what I told it to do, and I told it to do nothing.";

// The competition gate: /output/entry.txt must be UTF-8 text of 1 to 140
// characters, not only white space. Refuse to write anything invalid.
function writeEntry(outDir: string, line: string): void {
  const trimmed = line.trim();
  if (trimmed.length < 1 || trimmed.length > 140) {
    throw new Error(`entry line must be 1-140 chars, got ${trimmed.length}`);
  }
  mkdirSync(outDir, { recursive: true });
  writeFileSync(join(outDir, "entry.txt"), trimmed, "utf8");
}

const scriptDir = dirname(fileURLToPath(import.meta.url));
void scriptDir; // paths resolve relative to this script, never process.cwd()
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
writeEntry(outDir, ENTRY);
