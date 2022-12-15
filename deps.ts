import "https://deno.land/std@0.145.0/dotenv/load.ts";

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
