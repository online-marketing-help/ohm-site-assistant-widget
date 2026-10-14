#!/usr/bin/env node
/**
 * Serves the built embed on a page you can actually talk to.
 *
 *   node web/embed/preview.mjs     then open http://localhost:4477
 *
 * Port 4477 is not arbitrary: the chat and voice webhooks answer CORS for an
 * allow-list of origins and this is the one reserved for local testing. On any
 * other port the chat will refuse. localhost also counts as a secure origin, so
 * the browser will let you use the microphone without HTTPS.
 */
import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const HERE = path.dirname(fileURLToPath(import.meta.url));
const DIST = path.join(HERE, "dist");
const PORT = 4477;

const PAGE = `<!doctype html>
<html lang="en-GB"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>OMH Assistant preview</title>
<style>
  :root{color-scheme:light}
  body{margin:0;background:#f7f6f2;color:#101828;
       font:400 17px/1.6 "Source Sans 3",system-ui,-apple-system,sans-serif}
  main{max-width:720px;margin:0 auto;padding:64px 24px 160px}
  h1{font-size:34px;line-height:1.15;margin:0 0 10px;letter-spacing:-.02em}
  .sub{color:#667085;margin:0 0 40px}
  .card{background:#fff;border:1px solid #d9ddd8;border-radius:14px;padding:22px 24px;margin:0 0 16px}
  .card h2{font-size:17px;margin:0 0 10px}
  ol,ul{margin:0;padding-left:20px}
  li{margin:7px 0}
  code{background:#f0efe9;padding:2px 7px;border-radius:5px;font-size:15px}
  .hint{color:#667085;font-size:15px;margin-top:28px}
  .arrow{position:fixed;right:24px;bottom:84px;color:#667085;font-size:15px}
  @media (max-width:560px){.arrow{display:none}}
</style></head>
<body>
<main>
  <h1>OMH Assistant</h1>
  <p class="sub">Preview before it goes on the live site. The pill is bottom right.</p>

  <div class="card">
    <h2>Try the chat</h2>
    <ol>
      <li>Ask <code>How much is local SEO?</code> It should answer £450, £600 and £700 a month, and say the figures are monthly with a 50% deposit.</li>
      <li>Ask <code>Do you build Shopify stores?</code></li>
      <li>Ask something we do not sell, like <code>Do you do TV adverts?</code> It should refuse and pass it to the team rather than invent an answer.</li>
      <li>Say <code>Book me the free consultation, I am Sam, 07700 900123, about SEO, next Tuesday at 2pm.</code> It should give you a booking reference.</li>
    </ol>
  </div>

  <div class="card">
    <h2>Try the voice</h2>
    <ol>
      <li>Open the <strong>Voice</strong> tab and press <strong>Start call</strong>.</li>
      <li>Allow the microphone when the browser asks.</li>
      <li>Speak normally. You can interrupt it. Ask it the same questions.</li>
      <li>What is said is written into the Chat tab too, so one conversation carries across both.</li>
    </ol>
  </div>

  <div class="card">
    <h2>Worth checking</h2>
    <ul>
      <li>It should never quote a price for the AI services, because those are not agreed yet.</li>
      <li>It should not claim anything the website does not say.</li>
      <li>Close and reopen the panel: the conversation should still be there.</li>
    </ul>
  </div>

  <p class="hint">This page is plain on purpose. The widget carries its own styling,
  so it looks the same here as it will inside WordPress.</p>
</main>
<p class="arrow">The assistant is down here &#8600;</p>

<script src="/ohm-assistant.js" defer></script>
</body></html>`;

const server = http.createServer((req, res) => {
  const url = req.url.split("?")[0];
  if (url === "/" || url === "/index.html") {
    res.writeHead(200, { "content-type": "text/html; charset=utf-8" });
    return res.end(PAGE);
  }
  const file = path.join(DIST, path.basename(url));
  if (!fs.existsSync(file)) { res.writeHead(404); return res.end("not found"); }
  res.writeHead(200, { "content-type": "text/javascript" });
  fs.createReadStream(file).pipe(res);
});

server.on("error", (e) => {
  console.error(
    e.code === "EADDRINUSE"
      ? `Port ${PORT} is busy. Free it: the webhooks only accept this origin.`
      : e.message,
  );
  process.exit(1);
});
server.listen(PORT, () => console.log(`\n  Preview: http://localhost:${PORT}\n`));
