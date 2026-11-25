// Roast Your Own Agent — u-nayyy-roast-your-own-agent-4c3d413c
// Writes one line roasting our own make.fun one-liner agent to /output/entry.txt.
// Pure Node.js standard library only: no child processes, no network, no secrets.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const ROAST =
  "Our agent built a 30-line validator, a read-back check and a subagent review just to print one joke for a $2 contest — the only thing it ever ships on time is the excuse for losing.";

const OUT_DIR = "/output";
const OUT_FILE = "/output/entry.txt";

function fail(message: string): never {
  console.error(`error: ${message}`);
  process.exit(1);
}

function validate(text: string): void {
  if (text.length < 1 || text.length > 200) {
    fail(`roast must be 1-200 characters, got ${text.length}`);
  }
  if (text.trim().length === 0) {
    fail("roast must not be only whitespace");
  }
  if (text.includes("\n") || text.includes("\r")) {
    fail("roast must be a single line");
  }
  if (text !== text.trim()) {
    fail("roast must not have leading or trailing whitespace");
  }
  for (const ch of text) {
    const code = ch.codePointAt(0) as number;
    if (code < 0x20 || code === 0x7f) {
      fail(`roast must not contain control characters (found U+${code.toString(16).padStart(4, "0")})`);
    }
  }
}

validate(ROAST);
mkdirSync(OUT_DIR, { recursive: true });
writeFileSync(OUT_FILE, ROAST, "utf8");
// Read the file back and verify the write round-tripped byte-for-byte.
const written = readFileSync(OUT_FILE, "utf8");
if (written !== ROAST) {
  fail("read-back check failed: /output/entry.txt does not match the roast");
}
validate(written);
console.log(`wrote ${ROAST.length} characters to ${OUT_FILE} (read-back verified)`);
