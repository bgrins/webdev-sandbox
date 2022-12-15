import "https://deno.land/std@0.145.0/dotenv/load.ts";
import { parse } from "https://deno.land/std@0.145.0/flags/mod.ts";


export const { verbose } = parse(Deno.args, {
  default: {
    verbose: false,
  },
});

// https://github.com/ai/nanoid/blob/main/nanoid.js
export const nanoid = (t = 21) =>
  crypto
    .getRandomValues(new Uint8Array(t))
    .reduce(
      (t, e) =>
      (t +=
        (e &= 63) < 36
          ? e.toString(36)
          : e < 62
            ? (e - 26).toString(36).toUpperCase()
            : e > 62
              ? "-"
              : "_"),
      ""
    );


// https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/digest
export async function digest_sha1(message: string) {
  const msgUint8 = new TextEncoder().encode(message); // encode as (utf-8) Uint8Array
  const hashBuffer = await crypto.subtle.digest("SHA-1", msgUint8); // hash the message
  const hashArray = Array.from(new Uint8Array(hashBuffer)); // convert buffer to byte array
  const hashHex = hashArray
    .map((b) => b.toString(16).padStart(2, "0"))
    .join(""); // convert bytes to hex string
  return hashHex;
}