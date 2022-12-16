import { faker } from "../../deps.ts";
import { Head } from "$fresh/runtime.ts";
import { HandlerContext } from "$fresh/server.ts";

// Check Header Sec-Purpose: prefetch;prerender
// Link to the sleep page - including with a param to allow caching

export async function handler(
  req: Request,
  ctx: HandlerContext
): Promise<Response> {
  const resp = await ctx.render();
  resp.headers.set("Sec-Purpose", "prefetch;prerender");
  return resp;
}

export default function Home() {
  return (
    <>
      <h2>Disabled Prerender - {faker.commerce.productName()}</h2>
      <img src="/og?text=Loaded in the markup&backgroundColor=lightblue&width=600&height=400&fontSize=40" />
      <script src="/prerender.js"></script>
    </>
  );
}
