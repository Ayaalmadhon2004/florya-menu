/**
 * Records the 60-second marketing video of the live menu.
 *
 *   npm run build                      # creates out/
 *   npx playwright install chromium    # once
 *   node promo/record.cjs              # writes promo/florya-promo.mp4
 *
 * Needs ffmpeg and (for real dish photos) an internet connection.
 * Without internet it falls back to simple stand-in tiles for the photos.
 */
const http = require("http");
const fs = require("fs");
const path = require("path");
const { execFileSync } = require("child_process");
const { chromium } = require("playwright");

const root = path.resolve(__dirname, "..");
const out = path.join(root, "out");
const types = { ".html": "text/html", ".js": "text/javascript", ".css": "text/css", ".svg": "image/svg+xml", ".json": "application/json", ".txt": "text/plain", ".ico": "image/x-icon", ".webmanifest": "application/manifest+json" };

function serve() {
  const server = http.createServer((req, res) => {
    let p = decodeURIComponent(req.url.split("?")[0]);
    let file = p === "/promo.html" ? path.join(__dirname, "promo.html") : path.join(out, p);
    if (fs.existsSync(file) && fs.statSync(file).isDirectory()) {
      const idx = path.join(file, "index.html");
      file = fs.existsSync(idx) ? idx : file + ".html";
    } else if (!fs.existsSync(file) && fs.existsSync(file + ".html")) file += ".html";
    if (!fs.existsSync(file)) { res.writeHead(404); return res.end("not found"); }
    res.writeHead(200, { "content-type": types[path.extname(file)] || "application/octet-stream" });
    fs.createReadStream(file).pipe(res);
  });
  return new Promise((r) => server.listen(0, () => r(server)));
}

async function online() {
  try { const r = await fetch("https://images.unsplash.com/", { signal: AbortSignal.timeout(5000) }); return r.status < 500; } catch { return false; }
}

(async () => {
  if (!fs.existsSync(path.join(out, "index.html"))) throw new Error("Run `npm run build` first.");
  const server = await serve();
  const port = server.address().port;
  const hasNet = await online();
  console.log(hasNet ? "Internet found: using real photos." : "No internet: using stand-in tiles for photos.");

  const tmp = fs.mkdtempSync(path.join(require("os").tmpdir(), "promo-"));
  const browser = await chromium.launch();
  const ctxStart = Date.now();
  const ctx = await browser.newContext({ viewport: { width: 1280, height: 720 }, recordVideo: { dir: tmp, size: { width: 1280, height: 720 } } });
  if (!hasNet) {
    await ctx.route(/images\.unsplash\.com/, (route) => {
      const h = [...route.request().url()].reduce((a, c) => (a * 31 + c.charCodeAt(0)) % 360, 7) % 40 + 10;
      route.fulfill({ contentType: "image/svg+xml", body: `<svg xmlns="http://www.w3.org/2000/svg" width="400" height="400"><defs><radialGradient id="g" cx=".35" cy=".3" r=".9"><stop offset="0" stop-color="hsl(${h},70%,72%)"/><stop offset=".6" stop-color="hsl(${h},60%,42%)"/><stop offset="1" stop-color="hsl(${h},55%,18%)"/></radialGradient></defs><rect width="400" height="400" fill="url(#g)"/><circle cx="200" cy="200" r="120" fill="none" stroke="rgba(255,255,255,.35)" stroke-width="3"/><circle cx="200" cy="200" r="80" fill="rgba(255,255,255,.12)"/></svg>` });
    });
  }
  const page = await ctx.newPage();
  const started = Date.now();
  await page.goto(`http://localhost:${port}/promo.html`);
  await page.waitForFunction(() => document.title === "GO", null, { timeout: 60000, polling: 50 });
  const offset = (Date.now() - ctxStart) / 1000;
  await page.waitForFunction(() => document.title === "DONE", null, { timeout: 120000 });
  await page.waitForTimeout(500);
  const video = page.video();
  await ctx.close();
  await browser.close();
  server.close();

  const webm = await video.path();
  const dest = path.join(__dirname, "florya-promo.mp4");
  execFileSync("ffmpeg", ["-y", "-loglevel", "error", "-ss", offset.toFixed(2), "-i", webm, "-t", "60", "-r", "30", "-c:v", "libx264", "-pix_fmt", "yuv420p", "-crf", "17", "-preset", "slow", "-movflags", "+faststart", "-an", dest]);
  console.log("Wrote", dest, `(${((Date.now() - started) / 1000).toFixed(0)}s)`);
})();
