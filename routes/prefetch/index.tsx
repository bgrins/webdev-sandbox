import { Head } from "$fresh/runtime.ts";
import { HandlerContext } from "$fresh/server.ts";

export async function handler(
  req: Request,
  ctx: HandlerContext
): Promise<Response> {
  const { searchParams } = new URL(req.url);

  const prefetches = searchParams.getAll("prefetch");
  console.log(prefetches);
  const resp = await ctx.render();
  // Todo: prefetch to links
  // resp.headers.set("X-Custom-Header", "Hello");
  return resp;
}

export default function Home() {
  return (
    <>
      <Head>
        <title>Fresh App</title>
        <link rel="prefetch" href="/prefetch/1" />
        <link rel="prefetch" href="/prefetch/2" />
      </Head>
      <pre>
        Prefetch with /?link=/prefetch/1
      </pre>
      <a href="/prefetch/1">Prefetch with /?link=/prefetch/1</a>
      <a href="/prefetch/2">Prefetch with /?link=/prefetch/1</a>
    </>
  );
}
