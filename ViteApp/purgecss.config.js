const purgeHtml = require("purgecss-from-html");

/** @type {import("purgecss").UserDefinedOptions} */
const purgeCSSConfig = {
  css: ["build/static/css/*.css"],
  content: [
    "build/index.html",
    "build/static/js/*.js",
    "dist/snapshots/*.html"
  ],
  output: "build/static/css",
  extractors: [
    {
      extensions: ["html"],
      extractor: purgeHtml
    }
  ],
  safelist: {
    standard: [],
    deep: [],
    greedy: []
  }
};

module.exports = purgeCSSConfig;
