/**
 *
 * @param {number} seconds
 * @param {number} framesPerSecond
 * @returns {number}
 */
export const frames = (
  seconds,
  framesPerSecond = Number(
    process.env.REACT_APP_FRAMES_PER_SECOND ||
      process.env.REMOTION_FRAMES_PER_SECOND ||
      60
  )
) => Math.ceil(seconds * framesPerSecond);

/**
 * converts frames to seconds
 * @param {number} frames
 * @param {number} framesPerSecond
 * @returns {number}
 */
export const f2s = (
  frames,
  framesPerSecond = Number(
    process.env.REACT_APP_FRAMES_PER_SECOND ||
      process.env.REMOTION_FRAMES_PER_SECOND ||
      60
  )
) => Math.ceil(frames / framesPerSecond);

/**
 *
 * @param {number[]} durations
 * @returns {number[]}
 */
export const starts = (durations) => {
  let sum = 0;
  const arr = [];
  for (let i = 0; i < durations.length; i++) {
    sum += durations[i - 1] || 0;
    arr.push(sum);
  }
  return arr;
};
