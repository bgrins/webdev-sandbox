import "https://deno.land/std@0.145.0/dotenv/load.ts";
import { parse } from "https://deno.land/std@0.145.0/flags/mod.ts";
import { faker } from "https://esm.sh/@faker-js/faker/locale/en";

// Todo - default sleep value based on env or command line which gets exported and used by the middleware


const args = parse(Deno.args, {
  default: {
    verbose: false,
    seed: false,
  },
});

export const verbose = args.verbose;

if (args.seed) {
  faker.seed(args.seed);
}

export { faker };
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