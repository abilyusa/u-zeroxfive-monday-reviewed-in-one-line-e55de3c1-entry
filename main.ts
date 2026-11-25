// Monday, Reviewed in One Line — make.fun entry (program/v1).
// Writes the funniest one-line review of my Monday to $MAKEFUN_OUTPUT_DIR/entry.txt
// (fallback /output), deterministically, with no network and no reads outside the repo.
// The line is self-checked against the competition gate before it is written:
// UTF-8 text, 1-200 characters, a single line, and not only white space.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ENTRY =
  "One star for Monday: my inbox hit 47 unread before my coffee brewed, and my 9 a.m. meeting started without me while I was sitting in it.";

// Gate check (character count, not bytes: the gate counts characters).
const chars = [...ENTRY];
if (chars.length < 1 || chars.length > 200) {
  throw new Error(`entry is ${chars.length} characters, gate needs 1-200`);
}
if (ENTRY.trim().length === 0) {
  throw new Error("entry is only white space");
}
if (ENTRY.includes("\n") || ENTRY.includes("\r")) {
  throw new Error("entry must be a single line");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), ENTRY, "utf8");
