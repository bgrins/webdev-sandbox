import { faker } from "../../deps.ts";
import { Head } from "$fresh/runtime.ts";

// Check Header Sec-Purpose: prefetch;prerender
// Link to the sleep page - including with a param to allow caching

export default function Home() {
  return (
    <>
      <h2>{faker.commerce.productName()}</h2>
      <script src="/prerender.js"></script>
    </>
  );
}
