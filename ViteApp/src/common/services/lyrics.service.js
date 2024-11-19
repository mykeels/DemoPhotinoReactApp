import { uniqBy } from "lodash";
import * as cheerio from "cheerio";

const apiRootUrl = process.env.REACT_APP_API_ROOT;

/** @param {string} title */
export async function getLyricsOptions(title) {
  if (!title) {
    return [];
  }
  return fetch(
    `${apiRootUrl}/lyrics/options?per_page=5&q=${encodeURIComponent(title)}`
  )
    .then((res) => res.json())
    .then(
      /** @param {LyricOptions.Data} data */
      (data) =>
        uniqBy(
          data?.response?.sections
            ?.map((s) => s?.hits?.filter(hit => hit?.type === "song"))
            ?.reduce((arr, hit) => arr.concat(hit), [])
            ?.map((hit) => hit?.result)
            ?.filter(Boolean)
            ?.map((song) => ({
              id: String(song.id),
              title: song.full_title,
              url: song.url
            }))
            ?.filter((song) => song.title),
          (item) => item.title
        )
    );
}

/** @param {string} url */
export async function getLyrics(url) {
  return fetch(url.replace("https://genius.com", `${apiRootUrl}/lyrics`))
    .then((res) => res.text())
    .then((html) => {
      const $ = cheerio.load(html);
      const lyrics = $('[data-lyrics-container="true"]')
        .html()
        ?.replace(/<br>/g, "\n");
      return cheerio
        .load(lyrics || "")
        .root()
        .text();
    });
}
