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
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-4TWRKLG194"></script>
       
        <script
          type="speculationrules"
          dangerouslySetInnerHTML={{
            __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
  
            gtag('config', 'G-4TWRKLG194');
`,
          }}
        ></script>
      </Head>
      <pre>
        Analytics test
      </pre>
    </>
  );
}
