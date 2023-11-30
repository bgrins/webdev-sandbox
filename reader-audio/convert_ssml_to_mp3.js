import { decode } from "https://deno.land/std/encoding/base64.ts";
import { SSMLSplit } from "npm:ssml-split@0.5.0";

export default async function convert_ssml_to_mp3(
  ssml,
  {
    GCLOUD_API_KEY,
    voice = {
      languageCode: "en-US",
      name: "en-US-Wavenet-D",
    },
    audioConfig = {
      audioEncoding: "MP3",
    },
    maxBatches = 5,
    verbose = false,
  } = {}
) {
  const ssmlSplit = new SSMLSplit({
    synthesizer: "google",
    // Finds a possible split moment starting from 4000 characters
    softLimit: 4000,
    // Google Text to Speech limitation
    hardLimit: 5000,
    // Allow to split large paragraphs, set to false to keep your <p></p> intact
    breakParagraphsAboveHardLimit: true,
  });

  const batches = ssmlSplit.split(ssml);
  if (batches.length > maxBatches) {
    throw new Error(
      `SSML is too long. It has ${batches.length} batches, but maxBatches is set to ${maxBatches}.`
    );
  }

  console.log(`Split SSMIL into ${batches.length} batches`)
  if (verbose) {
    console.log(batches);
  }
  let audioPieces = [];
  for (let i = 0; i < batches.length; i++) {
    let response = await fetch(
      "https://texttospeech.googleapis.com/v1/text:synthesize",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Goog-Api-Key": GCLOUD_API_KEY,
        },
        body: JSON.stringify({
          input: {
            ssml: batches[i],
          },
          voice,
          audioConfig,
        }),
      }
    );

    let json = await response.json();

    if (verbose) {
      console.log(json);
    }
    if (json.error) {
      console.log(json.error);
      throw new Error(json.error.message);
    }
    let audioContent = decode(json.audioContent);
    audioPieces.push(audioContent);
  }

  let mergedArray = mergeUint8Arrays(audioPieces);
  return mergedArray;
}

function mergeUint8Arrays(arrays) {
  let length = 0;
  arrays.forEach((item) => {
    length += item.length;
  });

  let mergedArray = new Uint8Array(length);
  let offset = 0;
  arrays.forEach((item) => {
    mergedArray.set(item, offset);
    offset += item.length;
  });

  return mergedArray;
}
