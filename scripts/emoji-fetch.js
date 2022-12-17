//  deno run -A scripts/emoji-fetch.js

// See https://github.com/node-unicode/unicode-15.0.0/blob/06c0e214595efee15e76919b63a0721fa6fce85a/README.md
import names from "https://esm.sh/@unicode/unicode-15.0.0/Names/index.js";
import code_points from "https://esm.sh/@unicode/unicode-15.0.0/Binary_Property/Emoji/code-points.js";

console.log(names);
let n = 100;
let emojis = {};
for (let code_point of code_points) {
  let hex = code_point.toString(16);
  let emoji = String.fromCodePoint("0x" + hex);

  emojis[emoji] = names.get(code_point);
}

Deno.writeTextFileSync(
  "./routes/emoji/emojis.json",
  JSON.stringify(emojis, null, 2)
);
