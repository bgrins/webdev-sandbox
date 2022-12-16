import { faker } from "../../deps.ts";
import { Head } from "$fresh/runtime.ts";

// Check Header Sec-Purpose: prefetch;prerender
// Link to the sleep page - including with a param to allow caching

export default function Home() {
  return (
    <>
      <h2>Allowed Prerender - {faker.commerce.productName()}</h2>
      <img src="/og?text=Loaded in the markup&backgroundColor=lightblue&width=600&height=400&fontSize=40" />
      <script src="/prerender.js"></script>
    </>
  );
}
