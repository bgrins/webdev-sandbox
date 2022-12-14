import { ImageResponse } from "https://deno.land/x/og_edge/mod.ts";

export async function handler(req, ctx) {
  const { searchParams } = new URL(req.url);
  const fontSize = searchParams.get("fontSize") || 60;
  const backgroundColor = searchParams.get("backgroundColor") || "lavender";
  const debug = searchParams.get("debug") || false;
  let text = searchParams.getAll("text");
  if (!text.length) {
    text = ["👋", "Try ?text=hello&text=there"];
  }
  console.log(searchParams.getAll("text"));
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          justifyContent: "center",
          fontSize,
          backgroundColor,
        }}
      >
        {text.map((t) => (
          <div>{t}</div>
        ))}
      </div>
    ),
    {
      debug,
    }
  );
}

// export default async function handler(req) {
// }
