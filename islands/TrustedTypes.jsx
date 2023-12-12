import { IS_BROWSER } from "$fresh/runtime.ts";
import { useRef, useEffect } from "preact/hooks";
import DOMPurify from "npm:dompurify";

export default function TrustedTypes() {
  if (!IS_BROWSER) return <div></div>;

  const container = useRef(null);
  useEffect(() => {
    const element = container.current;
    const html = DOMPurify.sanitize(
      `<img src=x onerror="alert('XSS')"></img>`
    , {
      RETURN_TRUSTED_TYPE: true
    });

    element.innerHTML = html.toString();
  }, [container]);

  return <div><span ref={container}></span></div>;
}
