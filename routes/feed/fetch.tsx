// https://feeds.feedburner.com/briangrinstead

import { HandlerContext } from "$fresh/server.ts";
export const config = {
  routeOverride: "/feed/fetch/*",
};

export async function handler(
  req: Request,
  ctx: HandlerContext
): Promise<Response> {
  const input = new URL(req.url).pathname.replace("/feed/fetch/", "");
  // let r = await fetch(input, { method: "HEAD" });
  const request = new Request(input);

  console.log(request);
  const response = await fetch(request);
  // let text = await response.text();
  return new Response(response.body, {
    headers: {
      "content-type": response.headers.get("content-type"),
    },
  });
}
