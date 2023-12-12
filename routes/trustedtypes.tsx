import TrustedTypes from "../islands/TrustedTypes.jsx";
import { HandlerContext } from "$fresh/server.ts";


// Content-Security-Policy: require-trusted-types-for 'script'; report-uri //my-csp-endpoint.example


export async function handler(
  req: Request,
  ctx: HandlerContext
): Promise<Response> {
  const resp = await ctx.render();
  resp.headers.set("Content-Security-Policy", "trusted-types myEscapePolicy dompurify default; require-trusted-types-for 'script'; report-uri /my-csp-endpoint");
  return resp;
}


// Check Header Sec-Purpose: prefetch;prerender
// Link to the sleep page - including with a param to allow caching

export default function Home() {
  return (
    <>
    <TrustedTypes />
    </>
  );
}
