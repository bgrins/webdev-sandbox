import { faker } from "../../deps.ts";
import { Head } from "$fresh/runtime.ts";

// Check Header Sec-Purpose: prefetch;prerender
// Link to the sleep page - including with a param to allow caching

export default function Home() {
  return (
    <>
      <Head>
        <script
          type="speculationrules"
          dangerouslySetInnerHTML={{
            __html: `
{
  "prerender": [
    {
      "source": "list",
      "urls": ["/prerender/prerender-target/?sleep=1000", "/prerender/prerender-target/?sleep=2000", "/prerender/prerender-target/?sleep=5000"]
    }
  ]
}
`,
          }}
        ></script>
      </Head>
      <h2>Prerendered</h2>
      <ul>
        <li>
          <a href="/prerender/prerender-target/">Normal</a>
        </li>
        <li>
          <a href="/prerender/prerender-target/?sleep=1000">Sleep 1 second</a>
        </li>
        <li>
          <a href="/prerender/prerender-target/?sleep=2000">Sleep 2 seconds</a>
        </li>
        <li>
          <a href="/prerender/prerender-target/?sleep=5000">Sleep 5 seconds</a>
        </li>
      </ul>
      <h2>Not prerendered</h2>
      <ul>
        <li>
          <a href="/prerender/noprerender-target/">Normal</a>
        </li>
        <li>
          <a href="/prerender/noprerender-target/?sleep=1000">Sleep 1 second</a>
        </li>
        <li>
          <a href="/prerender/noprerender-target/?sleep=2000">Sleep 2 seconds</a>
        </li>
        <li>
          <a href="/prerender/noprerender-target/?sleep=5000">Sleep 5 seconds</a>
        </li>
      </ul>
    </>
  );
}
