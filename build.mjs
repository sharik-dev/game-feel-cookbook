// node build.mjs → index.html + README.md (contenu dans content.mjs)
import { writeFileSync } from "node:fs";
import { CHANNEL, CHAPTERS, CHECKLIST } from "./content.mjs";

const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const md = (s) => esc(s).replace(/\*(.+?)\*/g, "<em>$1</em>");
const shortUrl = (c) => (c.yt ? `https://www.youtube.com/shorts/${c.yt}` : `${CHANNEL}/shorts`);
const CURSOR = `<svg class="cur" viewBox="0 0 24 24" aria-hidden="true"><path d="M3 2l7.5 19 2.6-7.6L21 10.8z"/></svg>`;

const nav = CHAPTERS.map((c, i) => `<a href="#${c.slug}"><b>0${i + 1}</b>${c.word}</a>`).join("") + `<a href="#checklist"><b>✓</b>CHECKLIST</a>`;

const chapter = (c, i) => `
<section class="chapter" id="${c.slug}">
  <header class="ch-head">
    <div class="ch-num">0${i + 1}</div>
    <div>
      <p class="kicker">Chapter ${i + 1} · comment <span>${c.word}</span> on the Short</p>
      <h2>${esc(c.title)}</h2>
      <p class="lede">${md(c.intro)}</p>
      <a class="btn" href="${shortUrl(c)}" target="_blank" rel="noopener">▶ Watch the ${c.word} Short</a>
    </div>
  </header>
  ${c.steps.map((s, j) => `
  <article class="step" id="${c.slug}-${j + 1}">
    <figure>
      <video src="media/${c.slug}-${j + 1}.mp4" poster="media/${c.slug}-${j + 1}.jpg" autoplay muted loop playsinline preload="none"></video>
          </figure>
    <div class="body">
      <p class="step-n">STEP ${j + 1}</p>
      <h3>${esc(s.name)}</h3>
      <p class="what">${md(s.what)}</p>
      <p class="why"><b>Why it works —</b> ${md(s.why)}</p>
      <ul class="values">${s.values.map((v) => `<li>${esc(v)}</li>`).join("")}</ul>
      <details${j === 0 ? " open" : ""}><summary>GDScript · Godot 4</summary><pre><code>${esc(s.code)}</code></pre></details>
    </div>
  </article>`).join("")}
</section>`;

const checklist = CHECKLIST.map(([w, items]) => `
  <div class="ck"><h3>${w}</h3><ul>${items.map((t) => `<li><span class="box"></span>${esc(t)}</li>`).join("")}</ul></div>`).join("");

const html = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>The Game Feel Cookbook — 20 tricks that make any game feel amazing</title>
<meta name="description" content="20 game feel techniques with real starting values and Godot 4 GDScript: punchy hits, juicy jumps, satisfying coins, explosive dashes. Printable checklist.">
<meta property="og:title" content="The Game Feel Cookbook">
<meta property="og:description" content="20 tiny tricks that make any game feel amazing — values + Godot 4 code.">
<meta property="og:image" content="media/punchy-5.jpg">
<link rel="icon" href="assets/avatar.jpg">
<style>
@font-face{font-family:Anton;src:url(assets/Anton-Regular.ttf) format("truetype");font-display:swap}
@font-face{font-family:JBM;src:url(assets/JetBrainsMono-VF.ttf) format("truetype");font-weight:100 900;font-display:swap}
:root{--ink:#0B0A0D;--paper:#F3EEE6;--orange:#EE6C34;--orange2:#F59A6B;--line:#0B0A0D22}
*{box-sizing:border-box}
html{scroll-behavior:smooth}
body{margin:0;background:var(--paper);color:var(--ink);font:16px/1.6 JBM,ui-monospace,monospace}
a{color:inherit}
.cur{width:1em;height:1em;fill:var(--ink);stroke:var(--paper);stroke-width:1.6;stroke-linejoin:round;vertical-align:-.1em}
.wrap{max-width:1100px;margin:0 auto;padding:0 24px}
/* hero */
.hero{background:var(--ink);color:var(--paper);position:relative;overflow:hidden;padding:56px 0 64px}
.hero::before{content:"";position:absolute;inset:0;opacity:.07;background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='64' height='64' viewBox='0 0 24 24'%3E%3Cpath d='M3 2l7.5 19 2.6-7.6L21 10.8z' fill='%23F3EEE6' transform='scale(.45) translate(4 4)'/%3E%3C/svg%3E")}
.brand{display:flex;align-items:center;gap:12px;font-size:13px;letter-spacing:.08em;text-transform:uppercase;text-decoration:none;position:relative}
.brand img{width:40px;height:40px;border-radius:50%}
.hero h1{font:400 clamp(56px,10vw,128px)/.92 Anton,Impact,sans-serif;margin:40px 0 12px;text-transform:uppercase;position:relative}
.hero h1 span{color:var(--orange)}
.hero p{max-width:640px;font-size:18px;color:#F3EEE6cc;position:relative}
.hero .cur{position:absolute;right:8%;bottom:18%;width:120px;height:120px;fill:var(--orange);stroke:var(--ink);stroke-width:1.2;transform:rotate(-8deg)}
nav{position:sticky;top:0;z-index:5;background:var(--orange);border-bottom:2px solid var(--ink)}
nav .wrap{display:flex;gap:4px;overflow-x:auto}
nav a{font:400 20px Anton,sans-serif;text-decoration:none;padding:10px 14px;white-space:nowrap}
nav a b{font:700 11px JBM,monospace;margin-right:6px;opacity:.6}
nav a:hover{background:var(--ink);color:var(--paper)}
/* chapters */
.chapter{padding:72px 0 24px;border-bottom:2px solid var(--ink)}
.chapter:nth-child(even){background:#EDE6DB}
.ch-head{display:grid;grid-template-columns:auto 1fr;gap:32px;align-items:start;margin-bottom:40px}
.ch-num{font:400 140px/.8 Anton,sans-serif;color:var(--orange);-webkit-text-stroke:2px var(--ink)}
.kicker{margin:0;font-size:13px;text-transform:uppercase;letter-spacing:.08em}
.kicker span{background:var(--ink);color:var(--orange);padding:1px 6px}
h2{font:400 clamp(40px,6vw,72px)/1 Anton,sans-serif;text-transform:uppercase;margin:6px 0 12px}
.lede{max-width:680px;margin:0 0 18px}
.btn{display:inline-block;background:var(--ink);color:var(--paper);text-decoration:none;padding:10px 18px;font-weight:700;border:2px solid var(--ink);box-shadow:4px 4px 0 var(--orange)}
.btn:hover{background:var(--orange);color:var(--ink);box-shadow:4px 4px 0 var(--ink)}
.step{display:grid;grid-template-columns:220px 1fr;gap:32px;padding:28px 0;border-top:1px dashed var(--line)}
figure{margin:0}
.step>*,.ch-head>*{min-width:0}
.values li{overflow-wrap:anywhere}
figure video,figure img{width:220px;aspect-ratio:9/16;object-fit:cover;border:2px solid var(--ink);border-radius:14px;background:var(--paper);box-shadow:6px 6px 0 var(--ink)}
.step-n{margin:0;font-size:12px;font-weight:800;color:var(--orange);letter-spacing:.12em}
h3{font:400 40px/1.05 Anton,sans-serif;text-transform:uppercase;margin:2px 0 10px}
.what{font-size:18px;font-weight:600;margin:0 0 10px}
.why{margin:0 0 14px}
.why b{color:var(--orange)}
.values{list-style:none;padding:0;margin:0 0 16px;display:flex;flex-wrap:wrap;gap:8px}
.values li{background:var(--paper);border:2px solid var(--ink);padding:4px 10px;font-size:13px;font-weight:600}
details{border:2px solid var(--ink);background:var(--ink);color:var(--paper)}
summary{cursor:pointer;padding:8px 12px;font-weight:700;font-size:13px;color:var(--orange)}
pre{margin:0;padding:14px 16px;overflow-x:auto;font-size:13px;line-height:1.5;tab-size:4;border-top:1px solid #F3EEE633}
/* checklist */
#checklist{padding:72px 0;background:var(--ink);color:var(--paper)}
#checklist h2 span{color:var(--orange)}
.cks{display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:24px;margin-top:24px}
.ck h3{color:var(--orange);margin:0 0 8px}
.ck ul{list-style:none;padding:0;margin:0}
.ck li{display:flex;gap:10px;padding:6px 0;border-bottom:1px solid #F3EEE622;font-size:14px}
.box{flex:none;width:16px;height:16px;border:2px solid var(--orange);margin-top:3px}
.print{margin-top:28px;background:var(--orange);color:var(--ink);border:2px solid var(--paper);font:700 14px JBM,monospace;padding:10px 18px;cursor:pointer}
footer{padding:40px 0;font-size:13px}
footer a{font-weight:700}
@media (max-width:700px){.ch-head{grid-template-columns:1fr}.ch-num{font-size:90px}.step{grid-template-columns:1fr}.hero .cur{display:none}}
@media print{
  nav,.hero .cur,.hero p,.chapter,.print,footer{display:none!important}
  body,.hero,#checklist{background:#fff;color:#000}
  .hero{padding:0}.hero h1{font-size:48px;margin:8px 0}
  #checklist{padding:8px 0}
  .ck{break-inside:avoid}.ck h3{color:#000}.ck li{border-color:#ccc}.box{border-color:#000}
}
</style>
</head>
<body>
<header class="hero">
  <div class="wrap">
    <a class="brand" href="${CHANNEL}" target="_blank" rel="noopener"><img src="assets/avatar.jpg" alt="">Make Money With AI · YouTube</a>
    <h1>The Game Feel<br><span>Cookbook</span></h1>
    <p>20 tiny tricks that make any game feel amazing — what each one does, why players feel it, the exact starting values, and short Godot 4 code you can paste today.</p>
    ${CURSOR}
  </div>
</header>
<nav><div class="wrap">${nav}</div></nav>
<main>
${CHAPTERS.map(chapter).join("")}
<section id="checklist">
  <div class="wrap">
    <h2>The <span>checklist</span></h2>
    <p>Print it, stick it next to your screen, tick every box before you ship.</p>
    <div class="cks">${checklist}</div>
    <button class="print" onclick="window.print()">Print the checklist</button>
  </div>
</section>
</main>
<footer><div class="wrap">
  Made by <a href="${CHANNEL}" target="_blank" rel="noopener">Make Money With AI</a> — the game scenes in these clips were coded by Claude. Code snippets: MIT, use them in anything. No cookies, no tracking.
</div></footer>
</body>
</html>
`;

// Le contenu des chapitres est enveloppé dans .wrap
writeFileSync("index.html", html.replace(/<section class="chapter" id="(\w+)">([\s\S]*?)<\/section>/g, '<section class="chapter" id="$1"><div class="wrap">$2</div></section>'));

const readme = `# The Game Feel Cookbook

20 tiny tricks that make any game feel amazing — with starting values and Godot 4 GDScript.

**Read it here: https://sharik-dev.github.io/game-feel-cookbook/**

From the YouTube channel [Make Money With AI](${CHANNEL}).

## Checklist
${CHECKLIST.map(([w, items]) => `\n### ${w}\n${items.map((t) => `- [ ] ${t}`).join("\n")}`).join("\n")}

## Shorts
${CHAPTERS.map((c) => `- **${c.word}** — [${c.title}](${shortUrl(c)})`).join("\n")}

Code snippets are MIT licensed. No cookies, no tracking.
`;
writeFileSync("README.md", readme);
console.log("ok: index.html + README.md");
