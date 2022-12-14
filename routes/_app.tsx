import { AppProps } from "$fresh/server.ts";
import { Head } from "$fresh/runtime.ts";

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
          repository
        </a>
      </header>

      <div class="content-wrapper">
        <Component />
      </div>
    </>
  );
}
