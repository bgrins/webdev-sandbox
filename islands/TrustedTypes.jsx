import { IS_BROWSER } from "$fresh/runtime.ts";
import { useRef, useEffect } from "preact/hooks";
import DOMPurify from "https://esm.sh/dompurify@3.0.6";

export default function TrustedTypes() {
  if (!IS_BROWSER) return <div></div>;

  const container = useRef(null);
  useEffect(() => {
    const element = container.current;
    if (window.trustedTypes && trustedTypes.createPolicy) { // Feature testing
      let el = document.createElement('div');
      element.append(el);
      const escapeHTMLPolicy = trustedTypes.createPolicy('myEscapePolicy', {
        createHTML: string => string.replace(/\</g, '&lt;')
      });
      const escaped = escapeHTMLPolicy.createHTML('<img src=x onerror=alert(1)>');
      el.innerHTML = escaped;  // '&lt;img src=x onerror=alert(1)>'
      console.log(escaped.toString());  // '<img src=x onerror=alert(1)>'

      // https://developer.mozilla.org/en-US/docs/Web/API/TrustedTypePolicyFactory/createPolicy#createhtmlinputargs
      trustedTypes.createPolicy("default", {
        createScriptURL: (s, type, sink) => {
          console.log("Please refactor.");
          return `${s}?default-policy-used&type=${encodeURIComponent(
            type,
          )}&sink=${encodeURIComponent(sink)}`;
        },

        createHTML: string => string.replace(/\</g, '&lt;')
      });

      let script = document.createElement("script");
      script.src = "https://example.com/my-script.js";
      element.append(script);
    }


    const child = document.createElement("div");
    element.append(child);
    const html = DOMPurify.sanitize(
      `<img src=x onerror="alert('XSS')"></img>`
    , {
      RETURN_TRUSTED_TYPE: true
    });

    child.innerHTML = html.toString();
  }, [container]);

  return <div><div ref={container}></div></div>;
}
