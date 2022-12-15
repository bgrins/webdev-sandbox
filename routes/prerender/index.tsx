import { faker } from "../../deps.ts";
import { Head } from "$fresh/runtime.ts";

// Check Header Sec-Purpose: prefetch;prerender
// Link to the sleep page - including with a param to allow caching

export default function Home() {
  return (
    <>
      <Head>
        <link rel="prerender" href="../sleep/3" />
      </Head>
      {faker.lorem
        .paragraphs(10)
        .split("\n")
        .map((p) => (
          <p>{p}</p>
        ))}
    </>
  );
}
