import { faker } from "../../deps.ts";
import { Head } from "$fresh/runtime.ts";

const URLS_TO_PRERENDER = Array(100)
  .fill(0)
  .map((_, i) => `/prerender/prerender-target/?sleep=${i * 50}`);
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
      <h2>Prerendered</h2>
      <ul>
        {URLS_TO_PRERENDER.map((url) => (
          <li>
            <a href={url}>{url}</a>
          </li>
        ))}
      </ul>
    </>
  );
}
