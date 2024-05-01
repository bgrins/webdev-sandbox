import { Head } from "$fresh/runtime.ts";

export default function Home() {
  return (
    <>
      <Head>
        <title>Analytics test</title>
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-8T41M1RK76"></script>
       
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
  
            gtag('config', 'G-8T41M1RK76');

`,
          }}
        ></script>
      </Head>
      <pre>
        Analytics test
      </pre>
      <main>

    <p>
      Den beste dokumentasjonen for HTML, CSS
      og JavaScript er på
      <a href="https://developer.mozilla.org/en-US/docs/Web/HTML"
        >MDN Web Docs</a
      >
    </p>
    <h1>
      Hovedtittel bør en som regel ha, men kun én per side
    </h1>
    <p>Avsnitt med <em>fremhevede</em> og <strong>viktige</strong> deler.</p>
    <ul>
      <li>Dette er et liste-element</li>
      <li>Dette også</li>
      <li>
        Du kan også nøste inn en liste inne i lista:
        <ul>
          <li>Nøstet listeelement</li>
          <li>Nøstet listeelement</li>
        </ul>
      </li>
      <li>Og fortsette tilbake på hovedliste</li>
      <li>Veldig greit</li>
    </ul>
    <p>Du kan også <strong>lage nummererte lister</strong>:</p>
    <ol>
      <li>Lorem ipsum dolor sit amet, consectetuer adipiscing elit.</li>
      <li>
        Aliquam tincidunt mauris eu risus.
        <ol>
          <li>Lorem ipsum dolor sit amet, consectetuer adipiscing elit.</li>
          <li>Aliquam tincidunt mauris eu risus.</li>
        </ol>
      </li>
      <li>Lorem ipsum dolor sit amet, consectetuer adipiscing elit.</li>
      <li>Aliquam tincidunt mauris eu risus.</li>
    </ol>
    <h2>
      Mellomoverskrift. Viktig for å dele opp innhold
    </h2>
    <p>
      Pellentesque habitant morbi tristique senectus et netus et malesuada fames
      ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget,
      tempor sit amet, ante. Donec eu libero sit amet quam egestas semper.
      Aenean ultricies mi vitae est. Mauris placerat eleifend leo.
    </p>
    <h2>Tabell</h2>
    <table summary="Mest brukte nettlesere i Norge 2019">
      <caption>
        Mest brukte nettlesere i Norge 2019
      </caption>
      <thead>
        <tr>
          <th>Rangering</th>
          <th>Nettleser</th>
          <th>Prosentandel</th>
        </tr>
      </thead>
      <tfoot>
        <tr>
          <th colspan="4">Kilde: statcounter.com</th>
        </tr>
      </tfoot>
      <tbody>
        <tr>
          <th>1</th>
          <td>Chrome</td>
          <td>56,10%</td>
        </tr>
        <tr>
          <th>2</th>
          <td>Safari</td>
          <td>26,60%</td>
        </tr>
        <tr>
          <th>3</th>
          <td>Internet Explorer</td>
          <td>7,36%</td>
        </tr>
        <tr>
          <th>4</th>
          <td>Edge</td>
          <td>5,14%</td>
        </tr>
        <tr>
          <th>5</th>
          <td>Firefox</td>
          <td>4,25%</td>
        </tr>
        <tr>
          <th>6</th>
          <td>Samsung Internet</td>
          <td>3,56%</td>
        </tr>
        <tr>
          <th>7</th>
          <td>Opera</td>
          <td>1,68%</td>
        </tr>
        <tr>
          <th>8</th>
          <td>Android</td>
          <td>0,20%</td>
        </tr>
        <tr>
          <th>9</th>
          <td>Vivaldi</td>
          <td>0,11%</td>
        </tr>
        <tr>
          <th>10</th>
          <td>Chromium</td>
          <td>0,07%</td>
        </tr>
      </tbody>
    </table>

    <h2>En enklere tabell</h2>
    <table>
      <tr>
        <th>
          Table Heading
        </th>
        <th>
          Table Heading
        </th>
      </tr>
      <tr>
        <td>
          table data
        </td>
        <td>
          table data
        </td>
      </tr>
      <tr>
        <td>
          table data
        </td>
        <td>
          table data
        </td>
      </tr>
      <tr>
        <td>
          table data
        </td>
        <td>
          table data
        </td>
      </tr>
      <tr>
        <td>
          table data
        </td>
        <td>
          table data
        </td>
      </tr>
    </table>

    <h2>Blokksitat</h2>
    <blockquote>
      <p>
        Measuring programming progress by lines of code is like measuring
        aircraft building progress by weight.
      </p>
      <footer>
        — <cite><a href="http://www.thegatesnotes.com">Bill Gates</a></cite>
      </footer>
    </blockquote>

    <h2>Preformattert tekst</h2>
    <p>
      Om du vil at teksten skal brekke slik at alle mellomrom og linjeskift blir
      respektert, kan du bruke en spesiell tag som lar det gjøre det. Fin for å
      lime inn kode.
    </p>
    <pre>
      <code>
      </code>
      </pre>

    <dl>
      <dt>Definition list</dt>
      <dd>
        Consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore
        et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
        exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
      </dd>
      <dt>Lorem ipsum dolor sit amet</dt>
      <dd>
        Consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore
        et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
        exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
      </dd>
    </dl>

    <h6>
      This heading plays a relatively small bit part role, if you use it at all
    </h6>
    <p>
      Pellentesque habitant morbi tristique senectus et netus et malesuada fames
      ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget,
      tempor sit amet, ante. Donec eu libero sit amet quam egestas semper.
      Aenean ultricies mi vitae est. Mauris placerat eleifend leo.
    </p>
    <h1>
      Level 1 heading
    </h1>
    <p>
      Sed scelerisque sagittis lorem. Phasellus sodales. Nulla urna justo,
      vehicula in, suscipit nec, molestie sed, tellus.
    </p>
    <h2>
      Level 02 Heading
    </h2>
    <p>
      Sed scelerisque sagittis lorem. Phasellus sodales. Nulla urna justo,
      vehicula in, suscipit nec, molestie sed, tellus.
    </p>

    <h3>
      Level 03 Heading
    </h3>
    <p>
      Sed scelerisque sagittis lorem. Phasellus sodales. Nulla urna justo,
      vehicula in, suscipit nec, molestie sed, tellus.
    </p>

    <h4>
      Level 04 Heading
    </h4>
    <p>
      Sed scelerisque sagittis lorem. Phasellus sodales. Nulla urna justo,
      vehicula in, suscipit nec, molestie sed, tellus.
    </p>

    <h5>
      Level 05 Heading
    </h5>
    <p>
      Sed scelerisque sagittis lorem. Phasellus sodales. Nulla urna justo,
      vehicula in, suscipit nec, molestie sed, tellus.
    </p>

    <h6>
      Level 06 Heading
    </h6>
    <p>
      Sed scelerisque sagittis lorem. Phasellus sodales. Nulla urna justo,
      vehicula in, suscipit nec, molestie sed, tellus.
    </p>

    <blockquote>
      <p>
        Paragraph inside Blockquote: Nam libero leo, elementum in, dapibus a,
        suscipit vitae, purus. Duis arcu. Integer dignissim fermentum enim.
        Morbi convallis felis vel nibh. Sed scelerisque sagittis lorem.
      </p>
    </blockquote>
    <address>
      Address: Example address 224, Sweden
    </address>
    <pre>
      <strong>Preformated:</strong>Testing one row
           and another
      </pre
    >
    <p>
      I am <a href="?abc123">the a tag</a> example<br />
      I am <abbr title="test">the abbr tag</abbr> example<br />
      I am <b>the b tag</b> example<br />
      I am <big>the big tag</big> example<br />
      I am <cite>the cite tag</cite> example<br />
      I am <code>the code tag</code> example<br />
      I am <del>the del tag</del> example<br />
      I am <dfn>the dfn tag</dfn> example<br />
      I am <em>the em tag</em> example<br />
      I am <i>the i tag</i> example<br />
      I am <ins>the ins tag</ins> example<br />
      I am <kbd>the kbd tag</kbd> example<br />
      I am <q>the q tag</q> example<br />
      I am <samp>the samp tag</samp> example<br />
      I am <small>the small tag</small> example<br />
      I am <span>the span tag</span> example<br />
      I am <strong>the strong tag</strong> example<br />
      I am <sub>the sub tag</sub> example<br />
      I am <sup>the sup tag</sup> example<br />
      I am <var>the var tag</var> example<br />
      I am the <span class="small">small class</span> example<br />
      I am the <span class="large">large class</span> example<br />
      I am the <span class="quiet">quiet class</span> example<br />
      I am the <span class="highlight">highlight class</span> example<br />
    </p>

    <hr />

    <ul>
      <li>Unordered list 01</li>
      <li>Unordered list 02</li>
      <li>
        Unordered list 03
        <ul>
          <li>Unordered list inside list level 2</li>
          <li>
            Unordered list inside list level 2
            <ul>
              <li>Unordered list inside list level 3</li>
              <li>Unordered list inside list level 3</li>
            </ul>
          </li>
        </ul>
      </li>
    </ul>
    <ol>
      <li>Ordered list 01</li>
      <li>Ordered list 02</li>
      <li>
        Ordered list 03
        <ol>
          <li>Ordered list inside list level 2</li>
          <li>
            Ordered list inside list level 2
            <ol>
              <li>Ordered list inside list level 3</li>
              <li>Ordered list inside list level 3</li>
            </ol>
          </li>
        </ol>
      </li>
    </ol>

    <dl>
      <dt>
        Description list title 01
      </dt>
      <dd>
        Description list description 01
      </dd>
      <dt>
        Description list title 02
      </dt>
      <dd>
        Description list description 02
      </dd>
      <dd>
        Description list description 03
      </dd>
    </dl>

    <table>
      <caption>
        Table Caption
      </caption>
      <thead>
        <tr>
          <th>
            Table head th
          </th>
          <td>
            Table head td
          </td>
        </tr>
      </thead>
      <tfoot>
        <tr>
          <th>
            Table foot th
          </th>
          <td>
            Table foot td
          </td>
        </tr>
      </tfoot>
      <tbody>
        <tr>
          <th>
            Table body th
          </th>
          <td>
            Table body td
          </td>
        </tr>
        <tr>
          <td>
            Table body td
          </td>
          <td>
            Table body td
          </td>
        </tr>
      </tbody>
    </table>

    <form action="#">
      <fieldset>
        <legend>Form legend</legend>
        <div>
          <label for="f1">Text input:</label>
          <input type="text" id="f1" value="input text" />
        </div>
        <div>
          <label for="pw">Password input:</label>
          <input type="password" id="pw" value="password" />
        </div>
        <div>
          <label>Radio input:</label>
          <label><input type="radio" name="f2" value="yes"/> Yes</label>
          <label><input type="radio" name="f2" value="no"/> No</label>
        </div>
        <div>
          <label for="f3">Checkbox input:</label>
          <input type="checkbox" id="f3" />
        </div>
        <div>
          <label for="f4">Select field:</label>
          <select id="f4">
            <option>
              Option 01
            </option>
            <option>
              Option 02
            </option>
          </select>
        </div>
        <div>
          <label for="f5">Textarea:</label>
          <textarea id="f5" cols="30" rows="5">Textarea text</textarea>
        </div>
        <div>
          <label for="f6">Input Button:</label>
          <input type="button" id="f6" value="button text" />
        </div>
        <div>
          <label
            >Button Elements:
            <span class="small quiet"
              >Can use &lt;button&gt; tag or &lt;a class="button"&gt;</span
            ></label
          >
          <button class="button positive">
            <img
              src="https://raw.githubusercontent.com/ericrasch/html-kitchen-sink/master/web/assets/img/icons/tick.png"
              alt=""
            />
            Save
          </button>
          <a class="button" href="#"
            ><img
              src="https://raw.githubusercontent.com/ericrasch/html-kitchen-sink/master/web/assets/img/icons/key.png"
              alt=""
            />
            Change Password</a
          >
          <a href="#" class="button negative"
            ><img
              src="https://raw.githubusercontent.com/ericrasch/html-kitchen-sink/master/web/assets/img/icons/cross.png"
              alt=""
            />
            Cancel</a
          >
        </div>
      </fieldset>
    </form>

    I am <a href="something.doc">a word document</a> link, so readers know that
    I'm not a normal link.<br />
    I am <a href="something.pdf">a pdf document</a> link, so readers know that
    I'm not a normal link.<br />
    I am <a href="http://www.something.com">an external website</a> link, so
    readers know that I'm not a normal link.<br />
    I am <a href="something.rss">an rss feed</a> link, so readers know that I'm
    not a normal link.<br />
    I am <a href="something.xls">an excel spreadsheet</a> link, so readers know
    that I'm not a normal link.<br />
    I am <a href="aim:something">an AIM screenname</a> link, so readers know
    that I'm not a normal link.<br />
    I am <a href="mailto:something">an email address</a> link, so readers know
    that I'm not a normal link.<br />
    I am <a href="http://yourwebsite.com">an internal link</a>. Change the
    stylesheet's "http://yourwebsite.com" to your domain name so I don't look
    like an external link.<br />

    <br />

    <p class="success">
      <img
        src="https://raw.githubusercontent.com/ericrasch/html-kitchen-sink/master/web/assets/img/icons/tick.png"
        alt=""
      />
      This is a paragraph with class="success" and
      <a href="http://www.something.com">a link</a>.
    </p>
    <p class="error">
      <img
        src="https://raw.githubusercontent.com/ericrasch/html-kitchen-sink/master/web/assets/img/icons/cross.png"
        alt=""
      />
      This is a paragraph with class="error" and
      <a href="http://www.something.com">a link</a>.
    </p>
    <p class="notice">
      <img
        src="https://raw.githubusercontent.com/ericrasch/html-kitchen-sink/master/web/assets/img/icons/information.png"
        alt=""
      />
      This is a paragraph with class="notice" and
      <a href="http://www.something.com">a link</a>.
    </p>
      </main>
    </>
  );
}
