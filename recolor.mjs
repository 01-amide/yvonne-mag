// Run from the project root with:  node recolor.mjs
import { readdirSync, readFileSync, writeFileSync, statSync } from "node:fs";
import { join } from "node:path";

// These files do color math on hex strings in JS, so var() would break them.
const SKIP = ["HappyBirthday.tsx", "SoundsOfHer.tsx"];

const replacements = [
  // [old hex, new CSS variable]  (the lookahead avoids 8-digit hex like #e5989b88)
  [/#e5989b(?![0-9a-fA-F])/gi, "var(--accent)"],
  [/#c9747a(?![0-9a-fA-F])/gi, "var(--accent-deep)"],
  [/#d4849a(?![0-9a-fA-F])/gi, "var(--accent-deep)"],
  [/#f4a4a7(?![0-9a-fA-F])/gi, "var(--accent-light)"],
  [/#ecdfcc(?![0-9a-fA-F])/gi, "var(--bg)"],
  [/#(1a1008|0a0605|080608)(?![0-9a-fA-F])/gi, "var(--bg-deep)"],
  [/#3d2b2b(?![0-9a-fA-F])/gi, "var(--text)"],
  [/#7a5a5a(?![0-9a-fA-F])/gi, "var(--subtext)"],
  [/#b07a7d(?![0-9a-fA-F])/gi, "var(--muted)"],
  [/rgba\(229,\s*152,\s*155,/g, "rgba(var(--accent-rgb), "],
  [/'Georgia', serif/g, "var(--font-sans)"],
];

function walk(dir) {
  return readdirSync(dir).flatMap((name) => {
    const p = join(dir, name);
    return statSync(p).isDirectory() ? walk(p) : [p];
  });
}

let changed = 0;
for (const file of walk("src")) {
  if (!file.endsWith(".tsx") || SKIP.some((s) => file.endsWith(s))) continue;
  const before = readFileSync(file, "utf8");
  let after = before;
  for (const [pattern, value] of replacements) after = after.replace(pattern, value);
  if (after !== before) {
    writeFileSync(file, after);
    changed++;
    console.log("updated", file);
  }
}
console.log(`\nDone. ${changed} files updated.`);
console.log("Left alone on purpose: 8-digit hex like #e5989b88 (fix by hand).");
