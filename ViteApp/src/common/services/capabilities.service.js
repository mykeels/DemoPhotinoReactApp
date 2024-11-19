const apiRootUrl = process.env.REACT_APP_API_ROOT;

/**
 * @typedef {object} SystemCapabilities
 * @property {string} nodeJS
 * @property {string} ffmpeg
 */

export async function getSystemCapabilities() {
  return fetch(`${apiRootUrl}/info`)
    .then((res) => res.json())
    .then(
      /** @param {SystemCapabilities} data */
      (data) => data
    );
}
