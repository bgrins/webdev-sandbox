import { DOMParser } from "https://esm.sh/linkedom@0.16.4";

// Ideas
// * For abbr do something like <say-as interpret-as="characters">12345</say-as>
//   or <sub alias="World Wide Web Consortium">W3C</sub>
// * Maybe read the title and inject <break time="3s"/> after it or h1
// * See dates at https://cloud.google.com/text-to-speech/docs/ssml#examples

const TEXT_NODE = 3;
const ELEMENT_NODE = 1;
const PROSODY_ELEMENTS = {
  h1: { volume: "loud", pitch: "high" },
  h2: { volume: "loud", pitch: "medium" },
  h3: { volume: "medium", pitch: "medium" },
  h4: { volume: "medium", pitch: "medium" },
  h5: { volume: "medium", pitch: "medium" },
  h6: { volume: "medium", pitch: "medium" },
  strong: { level: "strong" },
  em: {},
  b: { level: "moderate" },
  i: { rate: "slow" },
  u: { pitch: "+10%" },
  small: { volume: "soft" },
  sub: { pitch: "low" },
  sup: { pitch: "high" },
  mark: { level: "reduced" },
  q: {},
  cite: { rate: "medium" },
  code: { rate: "medium" },
  pre: { rate: "medium" },
  blockquote: { rate: "medium" },
};

const IGNORE_DESCENDANTS_ELEMENTS = [
  "script",
  "style",
  "head",
  "noscript",
  "iframe",
  "frame",
  "frameset",
  "select",
  "input",
  "textarea",
  "button",
];
const ONLY_DESCRIBE_ELEMENTS = ["img", "audio", "video", "canvas"];

function escapeHTML(string) {
  const lookup = {
    "&": "&amp;",
    '"': "&quot;",
    "'": "&apos;",
    "<": "&lt;",
    ">": "&gt;",
  };
  return string.replace(/[&"'<>]/g, (c) => lookup[c]);
}

export default function htmlToSsml(htmlContent, { verbose = false } = {}) {
  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlContent, "text/html");

  function handleNode(node) {
    if (node.nodeType === TEXT_NODE) {
      let textContent = node.textContent.replace(/[ \t\r]+/g, " ");
      textContent = textContent.replace(/\n+/g, "");
      textContent = escapeHTML(textContent);
      return textContent;
    } else if (node.nodeType === ELEMENT_NODE) {
      const tagName = node.tagName.toLowerCase();
      if (IGNORE_DESCENDANTS_ELEMENTS.includes(tagName)) {
        return "";
      }

      if (ONLY_DESCRIBE_ELEMENTS.includes(tagName)) {
        return `<s>${tagName} content.</s>`;
      }

      if (PROSODY_ELEMENTS[tagName]) {
        const attributes = Object.keys(PROSODY_ELEMENTS[tagName])
          .map((key) => `${key}='${PROSODY_ELEMENTS[tagName][key]}'`)
          .join(" ");
        return `<prosody ${attributes}>${Array.from(node.childNodes)
          .map(handleNode)
          .join("")}</prosody>`;
      }

      if (tagName === "ul") {
        return `${Array.from(node.childNodes)
          .filter(
            (child) => child.tagName && child.tagName.toLowerCase() === "li"
          )
          .map((li) => `<s>List item: ${handleNode(li)}</s>`)
          .join(" ")}`;
      }

      if (tagName === "ol") {
        return `${Array.from(node.childNodes)
          .filter(
            (child) => child.tagName && child.tagName.toLowerCase() === "li"
          )
          .map((li, index) => `<s>Item ${index + 1}: ${handleNode(li)}</s>`)
          .join(" ")}`;
      }

      // Skip to just decendents
      return Array.from(node.childNodes).map(handleNode).join("");
    }
  }

  const ssml = `<speak>${handleNode(doc.documentElement)}</speak>`;
  if (verbose) {
    console.log(ssml.split("<s>").length - 1, "sentences");
  }

  return ssml;
}
