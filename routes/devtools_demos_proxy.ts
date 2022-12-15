import { HandlerContext } from "$fresh/server.ts";

export const config = {
  routeOverride: "/devtools-demos*",
};

export async function handler(req: Request, _ctx: HandlerContext): Promise<Response> {
  const { pathname } = new URL(req.url);

  // 307 redirect to /devtools-demos/index.html
  if (pathname === "/devtools-demos") {
    return new Response(null, {
      status: 307,
      headers: {
        Location: "/devtools-demos/index.html",
      },
    });
  }
  const path = pathname.replace("/devtools-demos", "");

  const url = `https://bgrins.github.io/devtools-demos${path}`;

  return await fetch(url);
}
