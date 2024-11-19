/**
 * The built renderer module is used by the renderMedia() function
 * https://www.remotion.dev/docs/renderer/render-media
 */

const path = require("path");
const fs = require("fs");
const { bundle } = require("@remotion/bundler");
const { webpackOverride } = require("../src/webpack-override");

(async () => {
  let progress = 0;
  await bundle({
    entryPoint: path.join(
      __dirname,
      "../src/components/SongComposition/index.tsx"
    ),
    onProgress: (p) => {
      if (p > progress) {
        progress = p;
        console.log(`progress: ${progress}%`);
      }
    },
    outDir: path.join(__dirname, "../build/renderer"),
    enableCaching: true,
    webpackOverride
  });
  const indexHtmlFile = path.join(__dirname, "../build/renderer/index.html");
  const indexHtml = fs.readFileSync(indexHtmlFile, "utf8");
  fs.writeFileSync(
    indexHtmlFile,
    indexHtml.replace(
      'src="/bundle.js"',
      `src="${process.env.PUBLIC_URL || ""}/bundle.js"`
    ),
    "utf8"
  );
})();
