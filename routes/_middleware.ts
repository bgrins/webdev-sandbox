// routes/_middleware.ts
import { MiddlewareHandlerContext } from "$fresh/server.ts";
import { verbose } from "../deps.ts";
import { delay } from "https://deno.land/std/async/mod.ts";
interface State {
  data: string;
}

const MAX_MS = 5000;
export async function handler(
  req: Request,
  ctx: MiddlewareHandlerContext<State>,
) {
  if (verbose) {
    // Log the URL and the UA and IP
    console.log(`${req.method} ${req.url} ${req.headers.get("user-agent")}`);
  }

  const sleep_ms = new URL(req.url).searchParams.get("sleep") || "";
  const seconds = Math.min(MAX_MS, parseInt(sleep_ms) || 0);
  // http GET "http://localhost:8000?sleep=500" -h
  let route_render_start = performance.now();
  const resp = await ctx.next();
  resp.headers.set("X-Server-Component-Render-MS", (performance.now() - route_render_start).toFixed(2).toString());

  if (seconds) {
    resp.headers.set("X-Server-Sleep-MS", seconds.toString());
    console.log(`Sleeping for ${seconds} ms...`);
    await delay(seconds);
  }
  resp.headers.set("X-Server", "webdev-sandbox");
  return resp;
}