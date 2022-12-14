import { Head } from "$fresh/runtime.ts";
import Counter from "../islands/Counter.tsx";

// https://wpt.live/

export default function Home() {
  return (
    <>
      <p class="note">A set of utilities to test out web APIs:</p>
      <ul>
        <li>
          <a href="/og">Opengraph image generator</a>
        </li>
        <li>
          <a href="/prefetch">Prefetch</a>
        </li>
      </ul>
      <p class="note">See also:</p>
      <ul>
        <li>
          <a href="https://wpt.live/">https://wpt.live/</a>
        </li>
        <li>
          <a href="https://bgrins.github.io/devtools-demos/">
            https://bgrins.github.io/devtools-demos/
          </a>
        </li>
      </ul>
    </>
  );
}
