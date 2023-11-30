import convert_html_to_ssml from "../../reader-audio/convert_html_to_ssml.js";
import convert_html_to_reader from "../../reader-audio/convert_html_to_reader.js";

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

import { HandlerContext } from "$fresh/server.ts";

export async function handler(
  req: Request,
  ctx: HandlerContext
): Promise<Response> {
  const { searchParams } = new URL(req.url);
  const url = searchParams.get("url");

  if (!url) {
    const resp = await ctx.render({});
    return resp;
  }

  let verbose = false;
  let fixed_up = fixup_url(url);
  let html = await fetch_page(fixed_up, { verbose });
  let reader = convert_html_to_reader(html, {
    verbose,
  });

  if (reader.error) {
    console.error(reader.error);
    Deno.exit(1);
  }

  html = reader.content;
  let ssml = await convert_html_to_ssml(html, {
    verbose,
  });

  ssml = ssml.split("<s>").join("\n<s>");
  const resp = await ctx.render({
    html,
    ssml,
  });
  return resp;
}

export default function Home(props) {
  const { html, ssml } = props.data;
  return (
    <>
      <form action="/ssml" method="GET">
        <input type="text" name="url" placeholder="URL" />
        <input type="submit" value="Submit" />
      </form>
      {!html && !ssml && <p>Enter a URL to convert to SSML</p>}
      {html && ssml && (
        <>
          <details open>
            <summary>Reader SSML</summary>
            <pre>{ssml}</pre>
          </details>
          <details open>
            <summary>Reader HTML</summary>
            <pre>{html}</pre>
          </details>
          <details open>
            <summary>Reader HTML</summary>
            <iframe sandbox="" srcdoc={html} width="100%"></iframe>
          </details>
        </>
      )}
    </>
  );
}
