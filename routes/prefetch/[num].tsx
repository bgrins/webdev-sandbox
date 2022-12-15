import { Head } from "$fresh/runtime.ts";
import { PageProps } from "$fresh/server.ts";
import { HandlerContext } from "$fresh/server.ts";

export async function handler(
  req: Request,
  ctx: HandlerContext
): Promise<Response> {
  const { searchParams } = new URL(req.url);

  const { num } = ctx.params;
  const num_images = Math.min(10, parseInt(num));
  const image_urls = Array.from({ length: num_images }).map(
    (_, i) => `/og?text=Image+${i + 1}`
  );
  if (!num_images) {
    return new Response("Invalid number", { status: 400 });
  }
  console.log(ctx);
  const prefetches = searchParams.getAll("prefetch");
  console.log(prefetches);
  const resp = await ctx.render({ num_images, image_urls });
  for (const url of image_urls) {
    resp.headers.append("Link", `<${url}>; rel=prefetch`);
  }
  // resp.headers.set("Link", "</images/big.jpeg>; rel=prefetch");
  return resp;
}

export default function Home(props: PageProps) {
  console.log(props, "props");
  const { num_images, image_urls } = props.data;
  // Use dangerouslySetInnerHTML to render the images so it doesn't append a unique param
  // like &__frsh_c=n78s9ba62gc0 to the image file (as we're trying to prefetch exactly this)
  const img_html = image_urls.map((url) => `<img src="${url}" />`).join("");
  return (
    <>
      <Head>
        <title>Document loading {num_images} images</title>
      </Head>
      <div>Document loading {num_images} images</div>
      <div
        className="image-grid"
        dangerouslySetInnerHTML={{
          __html: img_html,
        }}
      ></div>
    </>
  );
}
