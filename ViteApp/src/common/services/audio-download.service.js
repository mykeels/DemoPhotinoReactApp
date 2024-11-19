const apiRootUrl = process.env.REACT_APP_API_ROOT;

/**
 * @typedef {object} AudioDownload
 * @property {string} youtubeUrl
 * @property {string} title
 * @property {string} author
 * @property {string} url
 */

/** @param {string} youtubeUrl */
export async function getAudioUrl(youtubeUrl) {
  return fetch(`${apiRootUrl}/download?url=${encodeURIComponent(youtubeUrl)}`)
    .then((res) => res.json())
    .then(
      /** @param {AudioDownload} data */
      (data) => data
    );
}
