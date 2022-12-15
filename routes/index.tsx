import { Head } from "$fresh/runtime.ts";
import Counter from "../islands/Counter.tsx";

// https://wpt.live/

const utilities = [
  {
    name: "Opengraph image generator",
    href: "/og",
  },
  {
    name: "Prefetch",
    href: "/prefetch",
  },
  {
    name: "nanoid generator",
    href: "/utils/nanoid",
  },
];
const see_also = [
  {
    href: "https://wpt.live/",
  },
  {
    href: "https://bgrins.github.io/devtools-demos/",
  },
];

export default function Home() {
  return (
    <>
      <p class="note">A set of utilities to test out web APIs:</p>
      <ul>
        {utilities.map((link) => (
          <li>
            <a href={link.href}>{link.name || link.href}</a>{" "}
          </li>
        ))}
      </ul>
      <p class="note">See also:</p>
      <ul>
        {see_also.map((link) => (
          <li>
            <a href={link.href}>{link.name || link.href}</a>{" "}
          </li>
        ))}
      </ul>
    </>
  );
}
