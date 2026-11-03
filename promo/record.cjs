/**
 * Records the 60-second marketing video of the live menu.
 *
 *   npm run build                      # creates out/
 *   npx playwright install chromium    # once
 *   node promo/record.cjs              # writes promo/florya-promo.mp4
 *
 * Needs ffmpeg and (for real dish photos) an internet connection.
 * Without internet it uses the real photos saved in promo/assets (cropped from the live site).
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
  console.log(hasNet ? "Internet found: using the live photos." : "No internet: using the saved real photos in promo/assets.");

  const tmp = fs.mkdtempSync(path.join(require("os").tmpdir(), "promo-"));
  const browser = await chromium.launch();
  const ctxStart = Date.now();
  const ctx = await browser.newContext({ viewport: { width: 1920, height: 1080 }, recordVideo: { dir: tmp, size: { width: 1920, height: 1080 } } });
  // Offline: serve the real photos kept in promo/assets (cropped from the live site) where we have them.
  const baked = { "1512621776951": "s1.png", "1565680018434": "s2.png", "1600891964092": "m1.png", "1544025162": "m2.png", "1598103442097": "c1.png", "1519708227418": "c2.png", "1517248135467": "cover.jpg" };
  if (!hasNet) {
    await ctx.route(/images\.unsplash\.com/, (route) => {
      const url = route.request().url();
      const key = Object.keys(baked).find((k) => url.includes(k));
      if (key) {
        const f = path.join(__dirname, "assets", baked[key]);
        return route.fulfill({ contentType: f.endsWith(".jpg") ? "image/jpeg" : "image/png", body: fs.readFileSync(f) });
      }
      const h = [...url].reduce((a, c) => (a * 31 + c.charCodeAt(0)) % 360, 7) % 40 + 10;
      route.fulfill({ contentType: "image/svg+xml", body: `<svg xmlns="http://www.w3.org/2000/svg" width="400" height="400"><rect width="400" height="400" fill="hsl(${h},45%,40%)"/></svg>` });
    });
  }
  const page = await ctx.newPage();
  const started = Date.now();
  await page.goto(`http://localhost:${port}/promo.html${hasNet ? "" : "?baked=1"}`);
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
  execFileSync("ffmpeg", ["-y", "-loglevel", "error", "-ss", offset.toFixed(2), "-i", webm, "-t", "60", "-r", "30", "-c:v", "libx264", "-pix_fmt", "yuv420p", "-crf", "18", "-preset", "slow", "-movflags", "+faststart", "-an", dest]);
  console.log("Wrote", dest, `(${((Date.now() - started) / 1000).toFixed(0)}s)`);
})();
