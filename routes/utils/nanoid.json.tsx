import { HandlerContext } from "$fresh/server.ts";
import { nanoid } from "../../deps.ts";

export async function handler(
  req: Request,
  ctx: HandlerContext
): Promise<Response> {
  return new Response(JSON.stringify(nanoid()), {
    headers: {
      // Application json
      "content-type": "application/json",
    },
  });
}
