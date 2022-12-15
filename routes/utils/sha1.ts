import { digest_sha1 } from "../../deps.ts";

// export const config = {
//   routeOverride: "/utils/sha1/*",
// };
// const input = new URL(req.url).pathname.replace("/utils/sha1/", "");


export async function handler(
  req: Request,
): Promise<Response> {
  const { searchParams } = new URL(req.url);
  const text = searchParams.get("text");
  if (!text) {
    return new Response("text query parameter is required", { status: 400 });
  }
  const sha1 = await digest_sha1(text)
  return new Response(sha1);
}
