import { Head } from "$fresh/runtime.ts";

export default function Home() {
  return (
    <>
      <Head>
        <title>Analytics test</title>
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-4TWRKLG194"></script>
       
        <script
          type="speculationrules"
          dangerouslySetInnerHTML={{
            __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}

            gtag('consent', 'default', {
              'ad_storage': 'denied',
              'ad_user_data': 'denied',
              'ad_personalization': 'denied',
              'analytics_storage': 'denied'
            });
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
