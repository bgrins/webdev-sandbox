import {
  Readability,
  isProbablyReaderable,
} from "npm:@mozilla/readability@^0.4.4";

import { DOMParser } from "https://esm.sh/linkedom";

// import * as ammonia from "https://deno.land/x/ammonia@0.3.1/mod.ts";
// async function sanitize(html) {
//   await ammonia.init();
//   return ammonia.clean(html);
// }

export default function (html, readabilityOptions = {}) {
  const document = new DOMParser().parseFromString(html, "text/html");
  if (!isProbablyReaderable(document)) {
    return {
      error: "Not readerable",
    };
  }

  const reader = new Readability(document, readabilityOptions);
  let article;
  try {
    article = reader.parse();
  } catch (e) {
    return {
      error: "Error parsing",
    };
  }

  if (!article) {
    return {
      error: "No article",
    };
  }

  return article;
}
