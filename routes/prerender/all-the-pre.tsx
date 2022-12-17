import { faker } from "../../deps.ts";
import { Head } from "$fresh/runtime.ts";

const URLS_TO_PRERENDER = Array(3)
  .fill(0)
  .map((_, i) => `/prerender/prerender-target/?prerender&sleep=${i * 1000}`);
const URLS_TO_PREFETCH = Array(3)
  .fill(0)
  .map((_, i) => `/prerender/prerender-target/?prefetch&sleep=${i * 1000}`);
const URLS_TO_NOSTATE_PREFETCH = Array(3)
  .fill(0)
  .map(
    (_, i) => `/prerender/prerender-target/?nostateprefetch&sleep=${i * 1000}`
  );
const URLS_TO_PRECONNECT = Array(3)
  .fill(0)
  .map((_, i) => `/prerender/prerender-target/?preconnect&sleep=${i * 1000}`);
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
      "urls": ${JSON.stringify(URLS_TO_PRERENDER)}         
    }
  ]
}
`,
          }}
        ></script>
      </Head>
      <h2>Prerendered (blink only)</h2>
      <ul>
        {URLS_TO_PRERENDER.map((url) => (
          <li>
            <a href={url}>{url}</a>
          </li>
        ))}
      </ul>
      <h2>Prefetched - TODO</h2>
      <ul>
        {URLS_TO_PREFETCH.map((url) => (
          <li>
            <a href={url}>{url}</a>
          </li>
        ))}
      </ul>
      <h2>No state prefetched (blink only) - TODO</h2>
      <ul>
        {URLS_TO_NOSTATE_PREFETCH.map((url) => (
          <li>
            <a href={url}>{url}</a>
          </li>
        ))}
      </ul>
      <h2>Preconnect - TODO</h2>
      <ul>
        {URLS_TO_PRECONNECT.map((url) => (
          <li>
            <a href={url}>{url}</a>
          </li>
        ))}
      </ul>
    </>
  );
}
