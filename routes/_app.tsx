import { AppProps } from "$fresh/server.ts";
import { Head } from "$fresh/runtime.ts";
import IconBrandGithub from "https://deno.land/x/tabler_icons_tsx@0.0.2/tsx/brand-github.tsx";

export default function App(props: AppProps) {
  const { Component } = props;
  return (
    <>
      <Head>
        <link rel="stylesheet" href="/styles.css" />
        <title>webdev sandbox</title>
      </Head>

      <header>
        <h1>
          <a href="/">webdev sandbox</a>
        </h1>
        <a class="repo-link" href="https://github.com/bgrins/webdev-sandbox">
          <IconBrandGithub></IconBrandGithub>
        </a>
      </header>

      <div class="content-wrapper">
        <Component />
      </div>
    </>
  );
}
