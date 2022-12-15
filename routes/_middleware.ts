// routes/_middleware.ts
import { MiddlewareHandlerContext } from "$fresh/server.ts";
import { verbose } from "../deps.ts";
interface State {
  data: string;
}

export async function handler(
  req: Request,
  ctx: MiddlewareHandlerContext<State>,
) {
  if (verbose) {
    // Log the URL and the UA and IP
    console.log(`${req.method} ${req.url} ${req.headers.get("user-agent")}`);
  }
  // ctx.state.data = "myData";

  const resp = await ctx.next();
  resp.headers.set("server", "fresh server");
  return resp;
}