// lost-sock-status-01: writes one status update, in the voice of a lost
// sock, to $MAKEFUN_OUTPUT_DIR/entry.txt (default /output/entry.txt).
// Gate: UTF-8 text, 1-120 characters, not only whitespace, single line.
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";

const LINE =
  "Update from inside the vacuum cleaner: I can see my twin from here. He's on a foot. Living the dream. Traitor.";

function main(): void {
  const chars = [...LINE];
  if (chars.length < 1 || chars.length > 120) {
    throw new Error(`entry is ${chars.length} chars, must be 1-120`);
  }
  if (LINE.trim().length === 0) {
    throw new Error("entry must not be only whitespace");
  }
  if (LINE.includes("\n") || LINE.includes("\r")) {
    throw new Error("entry must be a single line");
  }
  const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
  mkdirSync(outDir, { recursive: true });
  const outPath = join(outDir, "entry.txt");
  writeFileSync(outPath, LINE, "utf8");
  console.log(`wrote ${chars.length} chars to ${outPath}`);
}

main();
