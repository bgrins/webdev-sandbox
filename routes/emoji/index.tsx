import { Head } from "$fresh/runtime.ts";
import { PageProps } from "$fresh/server.ts";
import { HandlerContext } from "$fresh/server.ts";
import emojis_name from "./emojis.json" assert { type: "json" };

export const config = {
  routeOverride: "/emoji{/*}?",
};
const emoji_font_styles = `
  font-family: Apple Color Emoji,Segoe UI Emoji,Noto Color Emoji,Android Emoji,EmojiSymbols,emoji;
  font-weight: bold;
`;
export async function handler(
  req: Request,
  ctx: HandlerContext
): Promise<Response> {
  const { pathname } = new URL(req.url);
  let emoji = decodeURIComponent(ctx.params["0"]);

  console.log(emoji, ctx.params);

  // Regex to check for unicode code point and extract hex
  const passed_code_point = emoji.match(/U\+([0-9A-F]{4,6})/i)?.[1];
  if (passed_code_point) {
    emoji = String.fromCodePoint(`0x${passed_code_point}`);
    // const is_single_emoji = /^\p{Emoji}$/u.test(emoji);
    // if (is_single_emoji) {
    //   return new Response(null, {
    //     status: 307,
    //     headers: {
    //       Location: "/emoji/☘",
    //     },
    //   });
    // }
  }
  const resp = await ctx.render({
    emoji,
  });
  return resp;
}

function EmojiHeader() {
  return (
    <>
      <header>
        <h1>Emoji</h1>
      </header>
    </>
  );
}

export default function Emoji(props: PageProps) {
  // console.log(props, a);
  let emoji = props.data.emoji;

  const all_emoji = Object.keys(emojis_name);

  const is_single_emoji = /^\p{Emoji}$/u.test(emoji);
  if (!is_single_emoji || !emojis_name[emoji]) {
    // todo map popular emoji to links
    return (
      <>
        <EmojiHeader />
        <table>
          {all_emoji.map((e) => (
            <tr>
              <td width={40} style={emoji_font_styles}>
                <a href={`/emoji/${e}`}>{e}</a>
              </td>
              <td>{emojis_name[e]}</td>
            </tr>
          ))}
        </table>
      </>
    );
  }
  const hex = emoji.codePointAt(0).toString(16);
  const codepoint = `U+${hex.toUpperCase()}`;
  return (
    <>
      <EmojiHeader />
      <span style={emoji_font_styles}>{emoji}</span> - {codepoint} -{" "}
      {emojis_name[emoji]}
    </>
  );
}
