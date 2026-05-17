import { createReadStream, existsSync, statSync } from "node:fs";
import { createServer } from "node:http";
import { extname, join, normalize } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(fileURLToPath(new URL(".", import.meta.url)), "..", "dist");
const port = Number(process.env.PORT ?? 4173);

if (!existsSync(root)) {
  console.error("Missing dist/. Run `npm run build` first.");
  process.exit(1);
}

const mimeTypes = new Map([
  [".html", "text/html; charset=utf-8"],
  [".css", "text/css; charset=utf-8"],
  [".js", "application/javascript; charset=utf-8"],
  [".json", "application/json; charset=utf-8"],
  [".svg", "image/svg+xml"],
  [".ico", "image/x-icon"],
  [".png", "image/png"],
  [".jpg", "image/jpeg"],
  [".jpeg", "image/jpeg"],
  [".webp", "image/webp"],
]);

createServer((request, response) => {
  const requestUrl = new URL(request.url ?? "/", `http://${request.headers.host ?? "localhost"}`);
  const safePath = normalize(decodeURIComponent(requestUrl.pathname)).replace(/^(\.\.(\/|\\|$))+/, "");
  const relativePath = safePath === "/" ? "index.html" : safePath.slice(1);
  const resolvedPath = join(root, relativePath);
  const filePath = existsSync(resolvedPath) && statSync(resolvedPath).isFile()
    ? resolvedPath
    : join(root, "index.html");

  const contentType = mimeTypes.get(extname(filePath)) ?? "application/octet-stream";

  response.writeHead(200, { "Content-Type": contentType });
  createReadStream(filePath).pipe(response);
}).listen(port, () => {
  console.log(`Serving dist/ at http://127.0.0.1:${port}`);
});
