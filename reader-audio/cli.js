import { load } from "https://deno.land/std@0.208.0/dotenv/mod.ts";
import convert_ssml_to_mp3 from "./convert_ssml_to_mp3.js";
import convert_html_to_ssml from "./convert_html_to_ssml.js";
import convert_html_to_reader from "./convert_html_to_reader.js";
import { parse } from "https://deno.land/std@0.207.0/flags/mod.ts";
import prettier from "npm:prettier@3.1.0";
import S3 from "npm:aws-sdk@2.1509.0/clients/s3.js";

let {
  GCLOUD_API_KEY,
  S3_ACCOUNT_ID,
  S3_ACCESS_KEY_ID,
  S3_ACCESS_KEY_SECRET,
  S3_BUCKET,
} = await load();

const flags = parse(Deno.args, {
  boolean: ["save-to-s3", "verbose", "skip-transcribe", "skip-reader", "wayback"],
  string: ["url", "file", "voice-name", "s3-bucket"],
  default: {
    "voice-name": "en-US-Wavenet-D"
  },
});

const { verbose, file, url, wayback } = flags;

if (flags["s3-bucket"]) {
  S3_BUCKET = flags["s3-bucket"]
} else if (!flags["save-to-s3"]) {
  S3_BUCKET = null;
}
const voice_name = flags["voice-name"];

// en-US-News-N

async function process_html(html, { fileName }) {


  if (!flags["skip-reader"]) {
    let reader = convert_html_to_reader(html, {
      verbose,
    });

    if (reader.error) {
      console.error(reader.error);
      Deno.exit(1);
    }

    html = reader.content;
    html = await prettier.format(reader.content, { parser: "html" });
    Deno.writeTextFileSync(fileName + ".reader.html", html);
    console.log("Wrote", fileName + ".reader.html");
  }

  let ssml = await convert_html_to_ssml(html, {
    verbose,
  });
  Deno.writeTextFileSync(fileName + ".ssml", ssml);
  console.log("Wrote", fileName + ".ssml");

  if (!flags["skip-transcribe"] && !GCLOUD_API_KEY) {
    console.error("GCLOUD_API_KEY is required for transcription.");
  }
  if (!flags["skip-transcribe"] && GCLOUD_API_KEY) {
    let mp3 = await convert_ssml_to_mp3(ssml, {
      GCLOUD_API_KEY,
      audioConfig: {
        audioEncoding: "MP3",
        speakingRate: 1.1,
      },
      voice: {
        languageCode: "en-US",
        name: voice_name,
      },
      verbose,
    });

    // todo pass clipBegin and then inject some intro music (?)
    // todo <mark name="timepoint_1"/> etc to anchor scrolling text with audio
    // "party popper" with spacing after
    Deno.writeFileSync(fileName + ".mp3", mp3);
    console.log("Wrote", fileName + ".mp3");

    if (S3_BUCKET) {
      const s3 = new S3({
        endpoint: `https://${S3_ACCOUNT_ID}.r2.cloudflarestorage.com`,
        accessKeyId: `${S3_ACCESS_KEY_ID}`,
        secretAccessKey: `${S3_ACCESS_KEY_SECRET}`,
        signatureVersion: "v4",
      });

      const file_hash = await digest_sha1(voice_name + "-" + ssml);
      // Todo - save this key information in the kv so they can be listed
      const key = `${file_hash}.mp3`;
      await s3
        .upload({
          Bucket: S3_BUCKET,
          Key: key,
          Body: mp3,
          ContentType: "audio/mpeg",
          ACL: "public-read",
        })
        .promise();
    }
  }
}

if (file) {
  const html = Deno.readTextFileSync(flags.file);
  await process_html(html, { fileName: flags.file });
} else if (url) {
  let fixed_up = fixup_url(url);
  if (!fixed_up) {
    console.error("Invalid URL", url);
    Deno.exit(1);
  }

  let fileName = (fixed_up.host + fixed_up.pathname)
    .replace(/\/$/, "")
    .replace(/[^a-z0-9]/gi, "_")
    .toLowerCase();

  fileName =
    "./reader-audio/fixture/" + fileName + "_" + voice_name.replace(/[^a-z0-9]/gi, "_");
  let html;
  try {
    html = await fetch_page(fixed_up, {
      wayback,
    });
  } catch (e) {
    console.error(e);
    Deno.exit(1);
  }

  // const kv = await Deno.openKv();
  // await kv.set(["opengraph", Math.random()], "hello");
  // const entries = kv.list({ prefix: ["test"] });
  // for await (const entry of entries) {
  //   console.log(entry.key); // ["preferences", "ada"]
  //   console.log(entry.value); // { ... }
  //   console.log(entry.versionstamp); // "00000000000000010000"
  // }


  await process_html(html, { fileName });

  Deno.exit();
}

async function digest_sha1(message) {
  const msgUint8 = new TextEncoder().encode(message); // encode as (utf-8) Uint8Array
  const hashBuffer = await crypto.subtle.digest("SHA-1", msgUint8); // hash the message
  const hashArray = Array.from(new Uint8Array(hashBuffer)); // convert buffer to byte array
  const hashHex = hashArray
    .map((b) => b.toString(16).padStart(2, "0"))
    .join(""); // convert bytes to hex string
  return hashHex;
}

async function fetch_page(url, { verbose = false, wayback = false } = {}) {
  if (wayback) {
    url = `https://archive.org/wayback/available?url=${url.toString()}`;
  }

  let response = await fetch(url);
  if (verbose) {
    console.log("Fetch response", response);
  }
  if (wayback) {
    let json = await response.json();
    if (verbose) {
      console.log("Wayback response", json);
    }
    if (json.archived_snapshots.closest) {
      response = await fetch(json.archived_snapshots.closest.url);
    } else {
      throw new Error("No wayback copy");
    }
  }

  // check text and looks reasonable
  let contentType = response.headers.get("content-type").toLowerCase();
  if (!contentType.startsWith("text/")) {
    throw new Error("Not text");
  }

  let html = await response.text();
  return html;
}

export function is_fetchable_url(string) {
  let url;
  try {
    url = new URL(string);
  } catch (_) {
    return false;
  }
  const is_supported_protocol =
    url.protocol === "http:" ||
    url.protocol === "https:" ||
    url.protocol === "data:";

  const is_localhost = Boolean(
    url.hostname === "localhost" ||
      // [::1] is the IPv6 localhost address.
      url.hostname === "[::1]" ||
      // 127.0.0.1/8 is considered localhost for IPv4.
      url.hostname.match(
        /^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/
      )
  );

  return is_supported_protocol && !is_localhost;
}

export function fixup_url(url) {
  if (!url) {
    return null;
  }
  url = url.toString().trim();
  const is_fetchable = is_fetchable_url(url);
  if (is_fetchable) {
    return new URL(url);
  }

  // There are edge cases with how URLs get resolved for strings like "1" or "1.1". Seems good enough for now.
  const ip4 = RegExp(
    "^((25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\\.){3}(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])"
  );

  const use_http = ip4.test(url) || !url.includes(".");

  url = use_http ? `http://${url}` : `https://${url}`;

  return is_fetchable_url(url) ? new URL(url) : null;
}
