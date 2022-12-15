import { Head } from "$fresh/runtime.ts";
import { PageProps } from "$fresh/server.ts";
import { HandlerContext } from "$fresh/server.ts";
import { delay } from "https://deno.land/std/async/mod.ts";

export const config = {
  routeOverride: "/sleep{/*}?",
};
const MAX_SECONDS = 10;
// /books{/old}?
export async function handler(
  req: Request,
  ctx: HandlerContext
): Promise<Response> {
  const seconds = Math.min(MAX_SECONDS, parseInt(ctx.params["0"]) || 0);

  if (!seconds) {
    return new Response(
      `/sleep/{seconds} where seconds is a number (max ${MAX_SECONDS} seconds)`
    );
  }
  console.log(`Sleeping for ${seconds} seconds...`);
  await delay(seconds * 1000);
  // console.log(ctx, seconds);
  return new Response(`Slept for ${seconds} seconds...`);
}
