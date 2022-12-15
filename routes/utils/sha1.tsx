import { digest_sha1 } from "../../deps.ts";
import { HandlerContext } from "$fresh/server.ts";

// export const config = {
//   routeOverride: "/utils/sha1/*",
// };
// const input = new URL(req.url).pathname.replace("/utils/sha1/", "");

export async function handler(
  req: Request,
  ctx: HandlerContext
): Promise<Response> {
  const { searchParams } = new URL(req.url);
  const text = searchParams.get("text");
  if (!text) {
    return ctx.render();

    // return new Response("text query parameter is required", { status: 400 });
  }
  const sha1 = await digest_sha1(text);
  return new Response(sha1);
}

export default function Form() {
  return (
    <>
      <form action="/utils/sha1" method="get">
        <input type="text" name="text" />
        <button type="submit">Submit</button>
      </form>
    </>
  );
}
